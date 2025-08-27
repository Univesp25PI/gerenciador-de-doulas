from fastapi import FastAPI, Request, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette import status
from sqlalchemy.exc import IntegrityError

from interface.api.schemas.common import ErrorEnvelope, Error, ErrorMetadata
from domain.exceptions.domain_exception import AppException


def register_exception_handlers(app: FastAPI) -> None:
    """Registra handlers globais padronizando erros no formato ErrorEnvelope."""

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        body = ErrorEnvelope(
            error=Error(
                code=exc.code,
                title=exc.title,
                message=exc.message,
            ),
            metadata=ErrorMetadata(path=str(request.url.path)),
        )
        return JSONResponse(
            status_code=exc.status_code,
            content=jsonable_encoder(body),
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        body = ErrorEnvelope(
            error=Error(
                code="Validation failed",
                message=str(exc.errors()),
                title="VALIDATION_ERROR",
            ),
            metadata=ErrorMetadata(path=str(request.url.path)),
        )
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder(body),
        )

    @app.exception_handler(StarletteHTTPException)
    async def starlette_http_exception_handler(request: Request, exc: StarletteHTTPException):
        body = ErrorEnvelope(
            error=Error(
                code="HTTP_ERROR",
                message=str(exc.detail),
                title={"status_code": exc.status_code},
            ),
            metadata=ErrorMetadata(path=str(request.url.path)),
        )
        return JSONResponse(status_code=exc.status_code, content=jsonable_encoder(body))

    # HTTPException lançadas manualmente nos controllers/services
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        body = ErrorEnvelope(
            error=Error(
                code="HTTP_ERROR",
                message=str(exc.detail),
                title={"status_code": exc.status_code},
            ),
            metadata=ErrorMetadata(path=str(request.url.path)),
        )
        return JSONResponse(status_code=exc.status_code, content=jsonable_encoder(body))

    @app.exception_handler(IntegrityError)
    async def db_integrity_handler(request: Request, exc: IntegrityError):
        body = ErrorEnvelope(
            error=Error(
                code="INTEGRITY_ERROR",
                message=str(getattr(exc, "orig", exc)),
                title="Database constraint violated",
            ),
            metadata=ErrorMetadata(path=str(request.url.path)),
        )
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder(body),
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        body = ErrorEnvelope(
            error=Error(
                code="INTERNAL_ERROR",
                message=str(exc),
                title="Unexpected error",
            ),
            metadata=ErrorMetadata(path=str(request.url.path)),
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=jsonable_encoder(body),
        )