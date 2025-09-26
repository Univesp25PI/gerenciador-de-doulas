from datetime import datetime, date
from typing import List

from pydantic import BaseModel

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
    id: int
    doula: DoulaSummary
    name: str
    age: int
    email: str
    phone: str
    first_pregnancy: bool
    lmp_date: date
    comorbidities: List[ComorbiditiesEnum]
    pregnancy_week: int
    birth_forecast: date
    create_date: datetime
    update_date: datetime

    model_config = {
        "from_attributes": True
    }

class PregnantSummary(BaseModel):
    id: int
    doula_id: int
    name: str
    email: str
    phone: str
    first_pregnancy: bool
    lmp_date: date
    comorbidities: List[ComorbiditiesEnum]
    pregnancy_week: int
    birth_forecast: date


    model_config = {"from_attributes": True}