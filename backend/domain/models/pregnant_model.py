# domain/models/pregnant_model.py
from __future__ import annotations
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from typing import Optional, List

from domain.enums.comorbidities_enum import ComorbiditiesEnum
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.models.doula_model import DoulaModel


@dataclass(slots=True)
class PregnantModel:
    id: Optional[int]
    doula_id: int
    name: str
    age: int
    email: str
    phone: str
    first_pregnancy: bool
    lmp_date: date
    comorbidities: List[ComorbiditiesEnum] = field(default_factory=list)

    doula: Optional[DoulaModel] = None

    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    @staticmethod
    def create(
        doula_id: int,
        name: str,
        age: int,
        email: str,
        phone: str,
        first_pregnancy: bool,
        lmp_date_input: date | datetime,
        comorbidities: list[ComorbiditiesEnum] | None = None,
    ) -> "PregnantModel":
        _validate_positive_id(doula_id, "doula_id")
        _validate_name(name)
        _validate_age(age)
        _validate_email(email)
        _validate_phone(phone)

        lmp_date = lmp_date_input.date() if isinstance(lmp_date_input, datetime) else lmp_date_input
        _validate_lmp_date(lmp_date)

        return PregnantModel(
            id=None,
            doula_id=doula_id,
            name=name.strip(),
            age=age,
            email=email.strip().lower(),
            phone=phone.strip(),
            first_pregnancy=first_pregnancy,
            lmp_date=lmp_date,
            comorbidities=list(comorbidities or []),
        )

    @staticmethod
    def from_persistence(
            id: int,
            name: str,
            age: int,
            email: str,
            phone: str,
            first_pregnancy: bool,
            lmp_date: date,
            doula_id: Optional[int] = None,
            create_date: Optional[datetime] = None,
            update_date: Optional[datetime] = None,
            doula: Optional[DoulaModel] = None,
            comorbidities: list[ComorbiditiesEnum] | None = None,
    ) -> "PregnantModel":

        return PregnantModel(
            id=id,
            doula_id=doula.id if doula is not None else doula_id,
            doula=doula,
            name=name.strip(),
            age=age,
            email=email.strip().lower(),
            phone=phone.strip(),
            first_pregnancy=first_pregnancy,
            lmp_date=lmp_date,
            comorbidities=comorbidities,
            create_date=create_date,
            update_date=update_date,
        )

    @property
    def pregnancy_week(self) -> int:
        days = (date.today() - self.lmp_date).days
        return max(0, days // 7)

    @property
    def birth_forecast(self) -> date:
        return self.lmp_date + timedelta(days=280)

    def update_contacts(self, email: str, phone: str) -> None:
        _validate_email(email)
        _validate_phone(phone)
        self.email = email.strip().lower()
        self.phone = phone.strip()

def _validate_positive_id(v: int, name: str) -> None:
    if v is None or v <= 0:
        raise AppException(ExceptionEnum.INVALID_ATTRIBUTE, f"{name} must be positive")
def _validate_name(name: str) -> None:
    if not name or not name.strip():
        raise AppException(ExceptionEnum.NAME_IS_REQUIRED)
def _validate_age(age: int) -> None:
    if age <= 0:
        raise AppException(ExceptionEnum.INVALID_ATTRIBUTE, "age must be positive")
def _validate_email(email: str) -> None:
    if "@" not in email or "." not in email.split("@")[-1]:
        raise AppException(ExceptionEnum.INVALID_EMAIL)
def _validate_phone(phone: str) -> None:
    if not phone or not phone.strip():
        raise AppException(ExceptionEnum.PHONE_IS_REQUIRED)
def _validate_lmp_date(lmp: date) -> None:
    if lmp > date.today():
        raise AppException(ExceptionEnum.INVALID_ATTRIBUTE, "lmp_date cannot be in the future")
