import logging


from application.mappers.doula_mapper import DoulaMapper
from domain.utils.log_sanitizer import LogSanitizer
from interface.api.schemas.doula_schema import DoulaRequest, DoulaResponse
from domain.ports.doula_repository_port import DoulaRepositoryPort

logger = logging.getLogger(__name__)

class DoulaService:

    def __init__(self, repository: DoulaRepositoryPort):
        self.repository = repository

    async def create_doula(self, payload: DoulaRequest):
        entity = await self.repository.create(DoulaMapper.request_to_model(payload))
        response = DoulaMapper.model_to_response(entity)

        logger.info(
            "Doula created %s",
            LogSanitizer.sanitize(response),
        )

        return  response

    async def get_all_doula(self):
        models = await self.repository.find_all()
        responses: list[DoulaResponse] = []
        for model in models:
            response = DoulaMapper.model_to_response(model)
            responses.append(response)

        logger.info(
            "Doulas recovered %s",
            LogSanitizer.sanitize(responses),
        )

        return responses

    async def get_doula_by_id(self, id: int):
        doula = await self.repository.find_by_id(id)
        response = DoulaMapper.model_to_response(doula)

        print("TESTE")
        logger.info(
            "Doula recovered %s",
            LogSanitizer.sanitize(response),
        )

        return response