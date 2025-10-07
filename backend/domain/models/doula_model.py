# domain/models/doula_model.py
from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum


@dataclass(slots=True)
class DoulaModel:
    id: Optional[int]
    name: str
    email: str
    phone: str
    password_hash: str
    create_date: Optional[datetime] = None
    update_date: Optional[datetime] = None

    @staticmethod
    def create(name: str, email: str, phone: str, password_hash:str) -> "DoulaModel":
        _validate_name(name)
        _validate_email(email)
        _validate_phone(phone)
        return DoulaModel(id=None, name=name.strip(), email=email.strip().lower(), phone=phone.strip(), password_hash=password_hash)

    @staticmethod
    def from_persistence(
            id: int,
            name: str,
            email: str,
            phone: str,
            password_hash: str,
            create_date: datetime,
            update_date: datetime,
    ) -> "DoulaModel":
        return DoulaModel(
            id=id,
            name=name.strip(),
            email=email.strip().lower(),
            phone=phone.strip(),
            password_hash=password_hash,
            create_date=create_date,
            update_date=update_date,
        )

    def update_contacts(self, email: str, phone: str) -> None:
        _validate_email(email)
        _validate_phone(phone)
        self.email = email.strip().lower()
        self.phone = phone.strip()


def _validate_name(name: str) -> None:
    if not name or not name.strip():
        raise AppException(ExceptionEnum.NAME_IS_REQUIRED)

def _validate_email(email: str) -> None:
    if not email or not email.strip():
        raise AppException(ExceptionEnum.EMAIL_IS_REQUIRED)
    if "@" not in email or "." not in email.split("@")[-1]:
        raise AppException(ExceptionEnum.INVALID_EMAIL)

def _validate_phone(phone: str) -> None:
    if not phone or not phone.strip():
        raise AppException(ExceptionEnum.PHONE_IS_REQUIRED)
