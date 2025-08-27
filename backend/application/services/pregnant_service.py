from application.mappers.doula_mapper import DoulaMapper
from application.mappers.pregnant_mapper import PregnantMapper
from interface.api.schemas.pregnant_schema import PregnantRequest, PregnantResponse
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.ports.pregnant_repository_port import PregnantRepositoryPort


class PregnantService:
    def __init__(self, repository: PregnantRepositoryPort):
        self.repository = repository

    async def create_pregnant(self, payload: PregnantRequest):
        entity = await self.repository.create(PregnantMapper.request_to_entity(payload))
        doula_summary = DoulaMapper.entity_to_summary(entity.doula)

        return  PregnantMapper.entity_to_response(entity, doula_summary)

    async def get_all_pregnant(self):
        entities = await self.repository.find_all()
        responses: list[PregnantResponse] = []
        for entity in entities:
            doula_summary = DoulaMapper.entity_to_summary(entity.doula)
            response = PregnantMapper.entity_to_response(entity, doula_summary)
            responses.append(response)

        return responses

    async def get_pregnant_by_id(self, id: int):
        entity = await self.repository.find_by_id(id)
        if not entity:
            raise AppException(ExceptionEnum.PREGNANT_NOT_FOUND, message=f"Pregnant with id={id} not found")

        doula_summary = DoulaMapper.entity_to_summary(entity.doula)

        return PregnantMapper.entity_to_response(entity, doula_summary)