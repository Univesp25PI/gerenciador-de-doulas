from datetime import date, datetime
from decimal import Decimal
from enum import Enum
from typing import Any

from pydantic import BaseModel

from domain.enums.logmask import LogMask
from domain.utils.logging_helper import LOG_META_KEY


class LogSanitizer:

    @staticmethod
    def sanitize(obj: Any) -> Any:
        if obj is None:
            return None

        if isinstance(obj, BaseModel):
            return LogSanitizer._sanitize_pydantic_model(obj)

        if isinstance(obj, list | tuple | set):
            return [LogSanitizer.sanitize(item) for item in obj]

        if isinstance(obj, dict):
            # Cuidado: dict não possui metadados.
            # Aqui você pode optar por não logar dicts arbitrários.
            return {
                key: LogSanitizer.sanitize(value)
                for key, value in obj.items()
            }

        if isinstance(obj, datetime | date):
            return obj.isoformat()

        if isinstance(obj, Decimal):
            return str(obj)

        if isinstance(obj, Enum):
            return obj.value

        return obj

    @staticmethod
    def _sanitize_pydantic_model(model: BaseModel) -> dict[str, Any]:
        result: dict[str, Any] = {}

        for field_name, field_info in model.__class__.model_fields.items():
            metadata = field_info.json_schema_extra or {}
            log_policy = metadata.get(LOG_META_KEY)

            if not log_policy:
                continue

            should_log = log_policy.get("log", False)

            if not should_log:
                continue

            mask = LogMask(log_policy.get("mask", LogMask.NONE.value))
            value = getattr(model, field_name, None)

            result[field_name] = LogSanitizer._apply_mask(value, mask)

        return result

    @staticmethod
    def _apply_mask(value: Any, mask: LogMask) -> Any:
        if value is None:
            return None

        if mask == LogMask.NONE:
            return LogSanitizer.sanitize(value)

        value_as_string = str(value)

        if mask == LogMask.EMAIL:
            return LogSanitizer._mask_email(value_as_string)

        if mask == LogMask.PHONE:
            return LogSanitizer._mask_phone(value_as_string)

        if mask == LogMask.CPF:
            return LogSanitizer._mask_cpf(value_as_string)

        if mask == LogMask.NAME:
            return LogSanitizer._mask_name(value_as_string)

        return "***"

    @staticmethod
    def _mask_email(value: str) -> str:
        if "@" not in value:
            return "***"

        username, domain = value.split("@", 1)

        if len(username) <= 2:
            masked_username = username[0] + "***"
        else:
            masked_username = username[:2] + "***"

        return f"{masked_username}@{domain}"

    @staticmethod
    def _mask_phone(value: str) -> str:
        digits = "".join(char for char in value if char.isdigit())

        if len(digits) <= 4:
            return "***"

        return f"***{digits[-4:]}"

    @staticmethod
    def _mask_cpf(value: str) -> str:
        digits = "".join(char for char in value if char.isdigit())

        if len(digits) != 11:
            return "***"

        return f"***.***.***-{digits[-2:]}"

    @staticmethod
    def _mask_name(value: str) -> str:
        parts = value.strip().split()

        if not parts:
            return "***"

        return " ".join(
            part[0] + "***" if part else "***"
            for part in parts
        )