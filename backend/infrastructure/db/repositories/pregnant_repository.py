from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.db.entities.pregnant import Pregnant
from domain.ports.pregnant_repository_port import PregnantRepositoryPort


class SqlAlchemyPregnantRepository(PregnantRepositoryPort):

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, pregnant: Pregnant) -> Pregnant:
        self.db.add(pregnant)
        await self.db.commit()
        await self.db.refresh(pregnant)
        return pregnant

    async def find_all(self) -> Sequence[Pregnant]:
        result = await self.db.execute(select(Pregnant))
        return result.scalars().all()

    async def find_by_id(self, id: int) -> Pregnant | None:
        result = await self.db.execute(select(Pregnant).where(Pregnant.id == id))
        return result.scalar_one_or_none()