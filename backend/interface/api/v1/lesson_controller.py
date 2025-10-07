from fastapi import APIRouter

from infrastructure.security.security_helper import validate_doula
from interface.api.dependencies import LessonRepository, TokenData
from interface.api.schemas.lesson_schema import LessonResponse, LessonRequest
from application.services.lesson_service import LessonService
from interface.api.schemas.common import ListEnvelope, SingleEnvelope
from interface.api.http_helper import ok_item, ok_list

router = APIRouter()

@router.post("/", response_model=SingleEnvelope[LessonResponse], status_code=201)
async def create_lesson(payload: LessonRequest, repository: LessonRepository, token_data: TokenData):
    service = LessonService(repository)
    lesson = await service.create_lesson(payload)
    validate_doula(lesson.pregnant.doula.id, token_data.id)

    return ok_item(lesson)

@router.get("/", response_model=ListEnvelope[LessonResponse], status_code=200)
async def get_all_lesson(repository: LessonRepository, token_data: TokenData):
    service = LessonService(repository)

    lesson_list = await service.get_all_lesson(token_data.id)

    return ok_list(lesson_list, page=1, size=1, total_records=1)

@router.get("/{pregnant_id}", response_model=SingleEnvelope[LessonResponse], status_code=200)
async def get_lesson_by_id(pregnant_id: int, repository: LessonRepository, token_data: TokenData):
    service = LessonService(repository)
    lesson = await service.get_lesson_by_id(pregnant_id)
    validate_doula(lesson.pregnant.doula_id, token_data.id)
    return ok_item(lesson)