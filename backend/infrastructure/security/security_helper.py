from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum


def validate_doula(user_id: int, doula_id: int):
    if user_id != doula_id:
        raise AppException(ExceptionEnum.INVALID_TOKEN)