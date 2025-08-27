from fastapi import Request
from domain.exceptions.domain_exception import AppException
from interface.api.handlers.shared import error_response


async def handler(request: Request, exc: AppException):
    return error_response(
        exc.status_code,
        code=exc.code,
        title=exc.title,
        message=exc.message,
        path=str(request.url.path),
    )