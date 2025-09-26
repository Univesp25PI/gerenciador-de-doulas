from typing import Protocol, Sequence, Optional

from domain.models.pregnant_model import PregnantModel
from infrastructure.db.entities import Pregnant


class PregnantRepositoryPort(Protocol):
    async def create(self, pregnant: PregnantModel) -> PregnantModel: ...
    async def find_all_by_doula_id(self, doula_id: int) -> Sequence[PregnantModel]: ...
    async def find_by_id(self, pregnant_id: int) -> Optional[PregnantModel]: ...