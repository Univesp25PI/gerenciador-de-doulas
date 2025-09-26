from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.models.pregnant_model import PregnantModel
from infrastructure.db.entities.pregnant import Pregnant
from domain.ports.pregnant_repository_port import PregnantRepositoryPort
from infrastructure.mappers.doula_infra_mapper import DoulaInfraMapper
from infrastructure.mappers.pregnant_infra_mapper import PregnantInfraMapper


class SqlAlchemyPregnantRepository(PregnantRepositoryPort):

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, pregnant: PregnantModel) -> PregnantModel:
        entity = PregnantInfraMapper.model_to_entity(pregnant)

        self.db.add(entity)
        await self.db.commit()
        await self.db.refresh(entity)

        doula = DoulaInfraMapper.entity_to_model(entity.doula)

        return PregnantInfraMapper.entity_to_model(entity, doula)

    async def find_all_by_doula_id(self, doula_id: int) -> Sequence[PregnantModel]:
        result = await self.db.execute(
            select(Pregnant).where(Pregnant.doula_id == doula_id)
        )
        entities = result.scalars().all()

        models: list[PregnantModel] = []
        for entity in entities:
            doula = DoulaInfraMapper.entity_to_model(entity.doula)
            model = PregnantInfraMapper.entity_to_model(entity, doula)
            models.append(model)

        return models

    async def find_by_id(self, pregnant_id: int) -> PregnantModel | None:
        result = await self.db.execute(select(Pregnant).where(Pregnant.id == pregnant_id))
        entity = result.scalar_one_or_none()
        if not entity:
            raise AppException(ExceptionEnum.PREGNANT_NOT_FOUND, message=f"Pregnant with id={pregnant_id} not found")

        doula = DoulaInfraMapper.entity_to_model(entity.doula)

        return PregnantInfraMapper.entity_to_model(entity, doula)