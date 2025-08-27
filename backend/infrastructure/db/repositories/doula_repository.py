from typing import Sequence

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from domain.models.doula_model import DoulaModel
from infrastructure.db.entities.doula import Doula
from domain.ports.doula_repository_port import DoulaRepositoryPort
from infrastructure.mappers.doula_infra_mapper import DoulaInfraMapper


class SqlAlchemyDoulaRepository(DoulaRepositoryPort):

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, doula: DoulaModel) -> DoulaModel:
        entity = DoulaInfraMapper.model_to_entity(doula)
        self.db.add(entity)
        await self.db.commit()
        await self.db.refresh(entity)
        return DoulaInfraMapper.entity_to_model(entity)

    async def find_all(self) -> Sequence[DoulaModel]:
        result = await self.db.execute(select(Doula))
        entities = result.scalars().all()
        models: list[DoulaModel] = []
        for entity in entities:
            model = DoulaInfraMapper.entity_to_model(entity)
            models.append(model)

        return models

    async def find_by_id(self, id: int) -> DoulaModel | None:
        result = await self.db.execute(select(Doula).where(Doula.id == id))
        entity = result.scalar_one_or_none()
        return DoulaInfraMapper.entity_to_model(entity)