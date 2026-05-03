from datetime import datetime

from pydantic import BaseModel

from infrastructure.logging.logmask import LogMask
from infrastructure.logging.logging_helper import log_field


class DoulaRequest(BaseModel):
    name: str
    email: str
    phone: str
    password: str


class DoulaResponse(BaseModel):
    id: int = log_field(log=True)
    name: str = log_field(log=True, mask=LogMask.NAME)
    phone: str | None = log_field(default=None, log=True, mask=LogMask.PHONE)
    email: str | None = log_field(default=None, log=True, mask=LogMask.EMAIL)
    create_date: datetime = log_field(log=True)
    update_date: datetime | None = log_field(default=None, log=True)

    model_config = {
        "from_attributes": True
    }

class DoulaSummary(BaseModel):
    id: int = log_field(log=True)
    name: str = log_field(log=True, mask=LogMask.NAME)
    email: str = log_field(default=None, log=True, mask=LogMask.EMAIL)

    model_config = {"from_attributes": True}