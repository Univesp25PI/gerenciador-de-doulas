import logging

from fastapi import Request
from fastapi.exceptions import RequestValidationError
from starlette import status

from interface.api.handlers.shared import error_response

logger = logging.getLogger(__name__)

async def handler(request: Request, exc: RequestValidationError):
    logger.warning(
        "Validation failed path=%s error_count=%s",
        request.url.path,
        len(exc.errors()),
    )

    return error_response(
        status.HTTP_422_UNPROCESSABLE_ENTITY,
        code="VALIDATION_ERROR",
        title="Validation failed",
        message="Request validation failed",
        path=str(request.url.path),
    )