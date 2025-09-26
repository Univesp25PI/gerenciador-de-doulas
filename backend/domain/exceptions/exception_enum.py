from enum import Enum
from starlette import status

class ExceptionEnum(Enum):
    INTERNAL_ERROR = {
        "code": "DM0000",
        "title": "INTERNAL_ERROR",
        "message": "An unexpected error occurred",
        "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
    }
    EMAIL_ALREADY_EXISTS = {
        "code": "DM0001",
        "title": "EMAIL_ALREADY_EXISTS",
        "message": "This email is already registered",
        "status_code": status.HTTP_400_BAD_REQUEST,
    }
    DOULA_NOT_FOUND = {
        "code": "DM0002",
        "title": "DOULA_NOT_FOUND",
        "message": "Doula not found",
        "status_code": status.HTTP_404_NOT_FOUND,
    }
    PREGNANT_NOT_FOUND = {
        "code": "DM0003",
        "title": "PREGNANT_NOT_FOUND",
        "message": "Pregnant not found",
        "status_code": status.HTTP_404_NOT_FOUND,
    }
    LESSON_NOT_FOUND = {
        "code": "DM0004",
        "title": "LESSON_NOT_FOUND",
        "message": "Lesson not found",
        "status_code": status.HTTP_404_NOT_FOUND,
    }
    NAME_IS_REQUIRED = {
        "code": "DM0005",
        "title": "NAME_IS_REQUIRED",
        "message": "The name is required",
        "status_code": status.HTTP_400_BAD_REQUEST,
    }
    EMAIL_IS_REQUIRED = {
        "code": "DM0006",
        "title": "EMAIL_IS_REQUIRED",
        "message": "The email is required",
        "status_code": status.HTTP_400_BAD_REQUEST,
    }
    PHONE_IS_REQUIRED = {
        "code": "DM0007",
        "title": "PHONE_IS_REQUIRED",
        "message": "The phone is required",
        "status_code": status.HTTP_400_BAD_REQUEST,
    }
    INVALID_EMAIL = {
        "code": "DM0008",
        "title": "INVALID_EMAIL",
        "message": "The email format is incorrect",
        "status_code": status.HTTP_400_BAD_REQUEST,
    }
    INVALID_ATTRIBUTE = {
        "code": "DM0009",
        "title": "INVALID_ATTRIBUTE",
        "message": "The attribute is invalid",
        "status_code": status.HTTP_400_BAD_REQUEST,
    }
    UNAUTHORIZED = {
        "code": "DM0010",
        "title": "UNAUTHORIZED",
        "message": "Invalid credentials",
        "status_code": status.HTTP_401_UNAUTHORIZED,
    }
    INVALID_TOKEN = {
        "code": "DM0012",
        "title": "INVALID_TOKEN",
        "message": "Invalid token",
        "status_code": status.HTTP_401_UNAUTHORIZED,
    }