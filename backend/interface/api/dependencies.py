from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from domain.models.user_model import UserModel
from infrastructure.db.config.database import get_db

from infrastructure.db.repositories.doula_repository import SqlAlchemyDoulaRepository
from infrastructure.db.repositories.lesson_repository import SqlAlchemyLessonRepository
from infrastructure.db.repositories.pregnant_repository import SqlAlchemyPregnantRepository
from domain.ports.doula_repository_port import DoulaRepositoryPort
from domain.ports.lesson_repository_port import LessonRepositoryPort
from domain.ports.pregnant_repository_port import PregnantRepositoryPort
from infrastructure.security.jwt_helper import get_current_user

DbDependency = Annotated[AsyncSession, Depends(get_db)]

def get_doula_repository(db: DbDependency) -> DoulaRepositoryPort:
    return SqlAlchemyDoulaRepository(db)

def get_pregnant_repository(db: DbDependency) -> PregnantRepositoryPort:
    return SqlAlchemyPregnantRepository(db)

def get_lesson_repository(db: DbDependency) -> LessonRepositoryPort:
    return SqlAlchemyLessonRepository(db)

DoulaRepository = Annotated[DoulaRepositoryPort, Depends(get_doula_repository)]
PregnantRepository = Annotated[PregnantRepositoryPort, Depends(get_pregnant_repository)]
LessonRepository = Annotated[LessonRepositoryPort, Depends(get_lesson_repository)]
LoginForm = Annotated[OAuth2PasswordRequestForm, Depends()]
TokenData = Annotated[UserModel, Depends(get_current_user)]
