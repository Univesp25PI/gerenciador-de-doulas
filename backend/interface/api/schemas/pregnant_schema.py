from datetime import datetime, date
from typing import List

from pydantic import BaseModel

from infrastructure.logging.logmask import LogMask
from infrastructure.logging.logging_helper import log_field
from interface.api.schemas.doula_schema import DoulaSummary
from domain.enums.comorbidities_enum import ComorbiditiesEnum


class PregnantRequest(BaseModel):
    id_doula: int
    name: str
    age: int
    email: str
    phone: str
    first_pregnancy: bool
    lmp_date: datetime
    comorbidities: List[ComorbiditiesEnum]

class PregnantResponse(BaseModel):
    id: int = log_field(log=True)
    doula: DoulaSummary = log_field(log=True)
    name: str = log_field(log=True, mask=LogMask.NAME)
    age: int = log_field(log=True)
    phone: str | None = log_field(default=None, log=True, mask=LogMask.PHONE)
    email: str | None = log_field(default=None, log=True, mask=LogMask.EMAIL)
    first_pregnancy: bool = log_field(log=True)
    lmp_date: date = log_field(log=True)
    comorbidities: List[ComorbiditiesEnum] = log_field(log=False)
    pregnancy_week: int = log_field(log=True)
    birth_forecast: date = log_field(log=False)
    create_date: datetime = log_field(log=True)
    update_date: datetime = log_field(log=True)

    model_config = {
        "from_attributes": True
    }

class PregnantSummary(BaseModel):
    id: int = log_field(log=True)
    doula_id: int = log_field(log=True)
    name: str = log_field(log=True, mask=LogMask.NAME)
    email: str = log_field(default=None, log=True, mask=LogMask.EMAIL)
    phone: str = log_field(default=None, log=True, mask=LogMask.PHONE)
    first_pregnancy: bool = log_field(log=True)
    lmp_date: date = log_field(log=True)
    comorbidities: List[ComorbiditiesEnum]
    pregnancy_week: int = log_field(log=True)
    birth_forecast: date = log_field(log=True)


    model_config = {"from_attributes": True}