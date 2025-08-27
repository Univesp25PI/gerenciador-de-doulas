from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import IntegrityError

from domain.exceptions.domain_exception import AppException
from interface.api.handlers import domain_error_handler, validation_handler, http_error_handler, integrity_pg_handler, \
    generic_error_handler


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppException,             domain_error_handler.handler)
    app.add_exception_handler(RequestValidationError,   validation_handler.handler)
    app.add_exception_handler(StarletteHTTPException,   http_error_handler.handler)
    app.add_exception_handler(HTTPException,            http_error_handler.handler)
    app.add_exception_handler(IntegrityError,           integrity_pg_handler.handler)
    app.add_exception_handler(Exception,                generic_error_handler.handler)