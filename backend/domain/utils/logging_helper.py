from typing import Any
from pydantic import Field

from domain.enums.logmask import LogMask

LOG_META_KEY = "log_policy"


def log_field(
    default: Any = ...,
    *,
    log: bool = False,
    mask: LogMask = LogMask.NONE,
    **kwargs
):
    json_schema_extra = kwargs.pop("json_schema_extra", {}) or {}

    json_schema_extra[LOG_META_KEY] = {
        "log": log,
        "mask": mask.value,
    }

    return Field(
        default,
        json_schema_extra=json_schema_extra,
        **kwargs,
    )