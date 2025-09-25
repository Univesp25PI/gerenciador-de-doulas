from fastapi import APIRouter

from interface.api.dependencies import PregnantRepository
from interface.api.schemas.pregnant_schema import PregnantRequest, PregnantResponse
from application.services.pregnant_service import PregnantService
from interface.api.schemas.common import ListEnvelope, SingleEnvelope
from interface.api.http_helper import ok_item, ok_list

router = APIRouter()

@router.post("/", response_model=SingleEnvelope[PregnantResponse], status_code=201)
async def create_pregnant(payload: PregnantRequest, repository: PregnantRepository):
    service = PregnantService(repository)
    pregnant = await service.create_pregnant(payload)

    return ok_item(pregnant)

@router.get("/", response_model=ListEnvelope[PregnantResponse], status_code=200)
async def get_all_pregnant(repository: PregnantRepository):
    service = PregnantService(repository)
    pregnant_list = await service.get_all_pregnant()

    return ok_list(pregnant_list, page=1, size=1, total_records=1)

@router.get("/{id}", response_model=SingleEnvelope[PregnantResponse], status_code=200)
async def get_pregnant_by_id(id: int, repository: PregnantRepository):
    service = PregnantService(repository)
    pregnant = await service.get_pregnant_by_id(id)
    return ok_item(pregnant)