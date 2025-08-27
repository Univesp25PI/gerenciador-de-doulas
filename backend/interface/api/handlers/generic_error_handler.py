from fastapi import Request
from starlette import status

from interface.api.handlers.shared import error_response


async def handler(request: Request, exc: Exception):
    return error_response(
        status.HTTP_500_INTERNAL_SERVER_ERROR,
        code="INTERNAL_ERROR",
        title="Unexpected error",
        message=str(exc),
        path=str(request.url.path),
    )