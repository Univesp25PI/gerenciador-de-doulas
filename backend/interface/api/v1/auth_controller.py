from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from application.services.doula_service import DoulaService
from application.services.auth_service import AuthService
from interface.api.dependencies import DoulaRepository, LoginForm, TokenData
from interface.api.http_helper import ok_item
from interface.api.schemas.auth_schema import TokenResponse
from interface.api.schemas.doula_schema import DoulaResponse
from interface.api.schemas.common import SingleEnvelope


router = APIRouter()

# Configuração do OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/auth/login")

@router.post("/login", response_model=SingleEnvelope[TokenResponse], status_code=200)
async def login(
    form_data: LoginForm,
    repository: DoulaRepository
):
    service = AuthService(repository)
    token = await service.authenticate_and_generate_token(
        email=form_data.username,
        password=form_data.password
    )
    return ok_item(token)

@router.post("/login", response_model=SingleEnvelope[TokenResponse], status_code=200)
async def login(
    form_data: LoginForm,
    repository: DoulaRepository
):
    service = AuthService(repository)
    token = await service.authenticate_and_generate_token(
        email=form_data.username,
        password=form_data.password
    )
    return ok_item(token)

@router.get("/me", response_model=SingleEnvelope[DoulaResponse], status_code=200)
async def get_doula_by_id(repository: DoulaRepository, token_data: TokenData):
    service = DoulaService(repository)
    doula = await service.get_doula_by_id(token_data.id)
    return ok_item(doula)