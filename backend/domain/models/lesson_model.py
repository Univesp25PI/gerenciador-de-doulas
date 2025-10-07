# domain/models/lesson_model.py
from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime, date
from typing import Optional, TYPE_CHECKING

from domain.enums.lesson_type_enum import LessonTypeEnum
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum

if TYPE_CHECKING:
    from domain.models.pregnant_model import PregnantModel


@dataclass(slots=True)
class LessonModel:
    id: Optional[int]
    pregnant_id: int

    class_number: int
    class_type: LessonTypeEnum
    class_date: datetime

    pregnant: Optional["PregnantModel"] = None
    doula_id: Optional[int] = None

    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    @staticmethod
    def create(
        pregnant_id: int,
        class_number: int,
        class_type: LessonTypeEnum,
        class_date: datetime,
    ) -> "LessonModel":
        _validate_positive_id(pregnant_id, "pregnant_id")
        _validate_class_number(class_number)
        return LessonModel(
            id=None,
            pregnant_id=pregnant_id,
            class_number=class_number,
            class_type=class_type,
            class_date=class_date,
        )

    @staticmethod
    def from_persistence(
        id: int,
        pregnant: PregnantModel,
        pregnant_id: int,
        doula_id: int,
        class_number: int,
        class_type: LessonTypeEnum,
        class_date: datetime,
        create_date: datetime,
        update_date: datetime,
    ) -> "LessonModel":
        return LessonModel(
            id=id,
            pregnant=pregnant,
            pregnant_id=pregnant_id,
            doula_id=doula_id,
            class_number=class_number,
            class_type=class_type,
            class_date=class_date,
            create_date=create_date,
            update_date=update_date,
        )
def _validate_positive_id(v: int, name: str) -> None:
    if v is None or v <= 0:
        raise AppException(ExceptionEnum.INVALID_ATTRIBUTE, f"{name} must be positive")

def _validate_class_number(n: int) -> None:
    if n <= 0:
        raise AppException(ExceptionEnum.INVALID_ATTRIBUTE, "class_number must be positive")
