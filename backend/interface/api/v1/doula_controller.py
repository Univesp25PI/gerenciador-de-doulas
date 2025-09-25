from fastapi import APIRouter

from interface.api.dependencies import DoulaRepository
from interface.api.schemas.common import ListEnvelope, SingleEnvelope
from interface.api.schemas.doula_schema import DoulaRequest, DoulaResponse
from application.services.doula_service import DoulaService
from interface.api.http_helper import ok_item, ok_list

router = APIRouter()

@router.post("/", response_model=SingleEnvelope[DoulaResponse], status_code=201)
async def create_doula(payload: DoulaRequest, repository: DoulaRepository):
    service = DoulaService(repository)
    doula = await service.create_doula(payload)

    return ok_item(doula)

@router.get("/", response_model=ListEnvelope[DoulaResponse], status_code=200)
async def get_all_doula(repository: DoulaRepository):
    service = DoulaService(repository)
    doula_list = await service.get_all_doula()

    return ok_list(doula_list, page=1, total_records=1, size=1)

@router.get("/{id}", response_model=SingleEnvelope[DoulaResponse], status_code=200)
async def get_doula_by_id(id: int, repository: DoulaRepository):
    service = DoulaService(repository)
    doula = await service.get_doula_by_id( id)
    return ok_item(doula)