from fastapi import Request, HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException

from interface.api.handlers.shared import error_response


async def handler(request: Request, exc: HTTPException | StarletteHTTPException):
    return error_response(
        exc.status_code,
        code="HTTP_ERROR",
        title="HTTP error",
        message=str(exc.detail),
        path=str(request.url.path),
    )