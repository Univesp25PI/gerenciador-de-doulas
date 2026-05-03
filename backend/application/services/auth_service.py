from application.mappers.auth_mapper import AuthMapper
from domain.exceptions.domain_exception import AppException
from domain.exceptions.exception_enum import ExceptionEnum
from domain.ports.doula_repository_port import DoulaRepositoryPort
from infrastructure.logging.log_sanitizer import LogSanitizer
from infrastructure.logging.logmask import LogMask
from infrastructure.security.hashing import verify_password
from infrastructure.security.jwt_helper import create_access_token

import logging


logger = logging.getLogger(__name__)


class AuthService:
    def __init__(self, repository: DoulaRepositoryPort):
        self.repository = repository

    async def authenticate_and_generate_token(self, email: str, password: str):
        doula = await self.repository.find_by_email(email)

        if not doula or not verify_password(password, doula.password_hash):
            logger.warning(
                "Login failed email=%s",
                LogSanitizer._apply_mask(email, LogMask.EMAIL),
            )
            raise AppException(ExceptionEnum.UNAUTHORIZED)

        logger.info(
            "Login succeeded doula_id=%s",
            doula.id,
        )

        token = create_access_token({
            "sub": doula.email,
            "id": doula.id,
            "name": doula.name,
            "role": "doula",
        })

        return AuthMapper.token_to_response(token)