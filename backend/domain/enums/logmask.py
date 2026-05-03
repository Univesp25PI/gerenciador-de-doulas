from enum import Enum


class LogMask(str, Enum):
    NONE = "none"
    NAME = "name"
    EMAIL = "email"
    PHONE = "phone"
    CPF = "cpf"