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
        model = await self.repository.create(PregnantMapper.request_to_model(payload))
        doula_summary = DoulaMapper.model_to_summary(model.doula)

        return  PregnantMapper.model_to_response(model, doula_summary)

    async def get_all_pregnant(self):
        models = await self.repository.find_all()
        responses: list[PregnantResponse] = []
        for model in models:
            doula_summary = DoulaMapper.model_to_summary(model.doula)
            response = PregnantMapper.model_to_response(model, doula_summary)
            responses.append(response)

        return responses

    async def get_pregnant_by_id(self, id: int):
        model = await self.repository.find_by_id(id)

        doula_summary = DoulaMapper.model_to_summary(model.doula)

        return PregnantMapper.model_to_response(model, doula_summary)