from typing import Protocol, Sequence, Optional

from domain.models.pregnant_model import PregnantModel
from infrastructure.db.entities import Pregnant


class PregnantRepositoryPort(Protocol):
    async def create(self, pregnant: PregnantModel) -> PregnantModel: ...
    async def find_all(self) -> Sequence[PregnantModel]: ...
    async def find_by_id(self, id_: int) -> Optional[PregnantModel]: ...