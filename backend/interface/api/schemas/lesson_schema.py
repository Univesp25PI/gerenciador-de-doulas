from datetime import datetime, date

from pydantic import BaseModel

from infrastructure.logging.logging_helper import log_field
from interface.api.schemas.pregnant_schema import PregnantSummary
from domain.enums.lesson_type_enum import LessonTypeEnum


class LessonRequest(BaseModel):
    id_pregnant: int
    class_number: int
    class_type: LessonTypeEnum
    class_date: datetime
    lmp_date: date


class LessonResponse(BaseModel):
    id: int = log_field(log=True)
    pregnant: PregnantSummary = log_field(log=True)
    class_number: int = log_field(log=True)
    class_type: LessonTypeEnum = log_field(log=True)
    class_date: datetime = log_field(log=True)
    create_date: datetime = log_field(log=True)
    update_date: datetime = log_field(log=True)

    model_config = {
        "from_attributes": True
    }
