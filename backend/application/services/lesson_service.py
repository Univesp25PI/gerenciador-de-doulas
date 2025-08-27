from application.mappers.lesson_mapper import LessonMapper
from application.mappers.pregnant_mapper import PregnantMapper
from interface.api.schemas.lesson_schema import LessonRequest, LessonResponse
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.ports.lesson_repository_port import LessonRepositoryPort


class LessonService:
    def __init__(self, repository: LessonRepositoryPort):
        self.repository = repository

    async def create_lesson(self, payload: LessonRequest):
        model = await self.repository.create(LessonMapper.request_to_model(payload))
        pregnant_summary = PregnantMapper.model_to_summary(model.pregnant)

        return  LessonMapper.model_to_response(model, pregnant_summary)

    async def get_all_lesson(self):
        entities = await self.repository.find_all()
        responses: list[LessonResponse] = []
        for entity in entities:
            pregnant_summary = PregnantMapper.model_to_summary(entity.pregnant)
            response = LessonMapper.model_to_response(entity, pregnant_summary)
            responses.append(response)

        return responses

    async def get_lesson_by_id(self, id: int):
        entity = await self.repository.find_by_id(id)

        pregnant_summary = PregnantMapper.model_to_summary(entity.pregnant)
        return LessonMapper.model_to_response(entity, pregnant_summary)