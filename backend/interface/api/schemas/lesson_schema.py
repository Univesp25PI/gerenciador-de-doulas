from datetime import datetime, date

from pydantic import BaseModel

from interface.api.schemas.pregnant_schema import PregnantSummary
from domain.enums.lesson_type_enum import LessonTypeEnum


class LessonRequest(BaseModel):
    id_pregnant: int
    class_number: int
    class_type: LessonTypeEnum
    class_date: datetime
    lmp_date: date


class LessonResponse(BaseModel):
    id: int
    pregnant: PregnantSummary
    class_number: int
    class_type: LessonTypeEnum
    class_date: datetime
    create_date: datetime
    update_date: datetime

    model_config = {
        "from_attributes": True
    }
