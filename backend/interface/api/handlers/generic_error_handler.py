import logging

from fastapi import Request
from starlette import status

from interface.api.handlers.shared import error_response

logger = logging.getLogger(__name__)


async def handler(request: Request, exc: Exception):
    logger.exception(
        "Unhandled exception path=%s",
        request.url.path,
    )

    return error_response(
        status.HTTP_500_INTERNAL_SERVER_ERROR,
        code="INTERNAL_ERROR",
        title="Unexpected error",
        message="An unexpected error occurred",
        path=str(request.url.path),
    )