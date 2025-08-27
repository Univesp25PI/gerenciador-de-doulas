from typing import Sequence

from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.db.entities import Lesson
from domain.ports.lesson_repository_port import LessonRepositoryPort


class SqlAlchemyLessonRepository(LessonRepositoryPort):

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, lesson: Lesson) -> Lesson:
        self.db.add(lesson)
        await self.db.commit()
        await self.db.refresh(lesson)
        return lesson

    async def find_all(self) -> Sequence[Lesson]:
        result = await self.db.execute(select(Lesson))
        return result.scalars().all()

    async def find_by_id(self, id: int) -> Lesson | None:
        result = await self.db.execute(select(Lesson).where(Lesson.id == id))
        return result.scalar_one_or_none()