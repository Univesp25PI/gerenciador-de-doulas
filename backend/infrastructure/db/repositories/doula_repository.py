from typing import Sequence

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from infrastructure.db.entities.doula import Doula
from domain.ports.doula_repository_port import DoulaRepositoryPort


class SqlAlchemyDoulaRepository(DoulaRepositoryPort):

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, doula: Doula) -> Doula:
        self.db.add(doula)
        await self.db.commit()
        await self.db.refresh(doula)
        return doula

    async def find_all(self) -> Sequence[Doula]:
        result = await self.db.execute(select(Doula))
        return result.scalars().all()

    async def find_by_id(self, id: int) -> Doula | None:
        result = await self.db.execute(select(Doula).where(Doula.id == id))
        return result.scalar_one_or_none()