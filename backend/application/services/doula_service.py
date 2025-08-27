from application.mappers.doula_mapper import DoulaMapper
from interface.api.schemas.doula_schema import DoulaRequest
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.ports.doula_repository_port import DoulaRepositoryPort


class DoulaService:

    def __init__(self, repository: DoulaRepositoryPort):
        self.repository = repository

    async def create_doula(self, payload: DoulaRequest):
        entity = await self.repository.create(DoulaMapper.request_to_entity(payload))
        response = DoulaMapper.entity_to_response(entity)
        return  response

    async def get_all_doula(self):
        return await self.repository.find_all()

    async def get_doula_by_id(self, id: int):
        doula = await self.repository.find_by_id(id)
        if not doula:
            raise AppException(ExceptionEnum.DOULA_NOT_FOUND, message=f"Doula with id={id} not found")

        return doula