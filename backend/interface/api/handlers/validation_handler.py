from fastapi import Request
from fastapi.exceptions import RequestValidationError
from starlette import status

from interface.api.handlers.shared import error_response


async def handler(request: Request, exc: RequestValidationError):
    return error_response(
        status.HTTP_422_UNPROCESSABLE_ENTITY,
        code="VALIDATION_ERROR",
        title="Validation failed",
        message=str(exc.errors()),
        path=str(request.url.path),
    )