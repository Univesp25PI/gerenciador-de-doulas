from application.mappers.doula_mapper import DoulaMapper
from interface.api.schemas.doula_schema import DoulaRequest, DoulaResponse
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.ports.doula_repository_port import DoulaRepositoryPort


class DoulaService:

    def __init__(self, repository: DoulaRepositoryPort):
        self.repository = repository

    async def create_doula(self, payload: DoulaRequest):
        entity = await self.repository.create(DoulaMapper.request_to_model(payload))
        response = DoulaMapper.model_to_response(entity)
        return  response

    async def get_all_doula(self):
        models = await self.repository.find_all()
        responses: list[DoulaResponse] = []
        for model in models:
            response = DoulaMapper.model_to_response(model)
            responses.append(response)
        return responses

    async def get_doula_by_id(self, id: int):
        doula = await self.repository.find_by_id(id)

        return DoulaMapper.model_to_response(doula)