from fastapi import HTTPException

from domain.exceptions.exception_enum import ExceptionEnum


class AppException(HTTPException):
    def __init__(self, exception_enum: ExceptionEnum, message: str | None = None):
        data = exception_enum.value
        super().__init__(
            status_code=data["status_code"],
            detail=data["message"],
        )
        self.code = data["code"]
        self.message = message or data["message"]
        self.title = data["title"]
        self.status_code = data["status_code"]