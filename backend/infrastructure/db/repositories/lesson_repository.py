from typing import Sequence

from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.models.lesson_model import LessonModel
from infrastructure.db.entities import Lesson, Pregnant
from domain.ports.lesson_repository_port import LessonRepositoryPort
from infrastructure.mappers.doula_infra_mapper import DoulaInfraMapper
from infrastructure.mappers.lesson_infra_mapper import LessonInfraMapper
from infrastructure.mappers.pregnant_infra_mapper import PregnantInfraMapper


class SqlAlchemyLessonRepository(LessonRepositoryPort):

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, lesson: LessonModel) -> LessonModel:
        entity = LessonInfraMapper.model_to_entity(lesson)

        self.db.add(entity)
        await self.db.commit()
        await self.db.refresh(entity)

        pregnant = PregnantInfraMapper.entity_to_base_model(entity.pregnant)

        return LessonInfraMapper.entity_to_model(entity, pregnant)

    async def find_all(self, doula_id: int) -> Sequence[LessonModel]:
        stmt = (
            select(Lesson)
            .join(Lesson.pregnant)
            .options(joinedload(Lesson.pregnant))
            .where(Pregnant.doula_id == doula_id)
        )

        result = await self.db.execute(stmt)

        entities = result.scalars().all()

        models: list[LessonModel] = []
        for entity in entities:
            pregnant = PregnantInfraMapper.entity_to_base_model(entity.pregnant)
            model = LessonInfraMapper.entity_to_model(entity, pregnant)
            models.append(model)

        return models

    async def find_by_id(self, id: int) -> LessonModel | None:
        result = await self.db.execute(select(Lesson).where(Lesson.id == id))
        entity = result.scalar_one_or_none()

        if not entity:
            raise AppException(ExceptionEnum.LESSON_NOT_FOUND, message=f"Lesson with id={id} not found")

        pregnant = PregnantInfraMapper.entity_to_base_model(entity.pregnant)

        return LessonInfraMapper.entity_to_model(entity, pregnant)