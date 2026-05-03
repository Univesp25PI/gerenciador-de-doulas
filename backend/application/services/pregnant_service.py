import logging

from application.mappers.doula_mapper import DoulaMapper
from application.mappers.pregnant_mapper import PregnantMapper
from infrastructure.logging.log_sanitizer import LogSanitizer
from interface.api.schemas.pregnant_schema import PregnantRequest, PregnantResponse
from domain.ports.pregnant_repository_port import PregnantRepositoryPort

logger = logging.getLogger(__name__)

class PregnantService:
    def __init__(self, repository: PregnantRepositoryPort):
        self.repository = repository

    async def create_pregnant(self, payload: PregnantRequest):
        model = await self.repository.create(PregnantMapper.request_to_model(payload))
        doula_summary = DoulaMapper.model_to_summary(model.doula)

        response = PregnantMapper.model_to_response(model, doula_summary)

        logger.info(
            "Pregnant created %s",
            LogSanitizer.sanitize(response),
        )

        return response

    async def get_all_pregnant(self, doula_id: int):
        models = await self.repository.find_all_by_doula_id(doula_id)
        responses: list[PregnantResponse] = []
        for model in models:
            doula_summary = DoulaMapper.model_to_summary(model.doula)
            response = PregnantMapper.model_to_response(model, doula_summary)
            responses.append(response)

        logger.info(
            "Pregnants recovered doula_id=%s total=%s",
            doula_id,
            len(responses),
        )

        return responses

    async def get_pregnant_by_id(self, pregnant_id: int):
        model = await self.repository.find_by_id(pregnant_id)

        doula_summary = DoulaMapper.model_to_summary(model.doula)
        response = PregnantMapper.model_to_response(model, doula_summary)

        logger.info(
            "Pregnant recovered %s",
            LogSanitizer.sanitize(response),
        )

        return response