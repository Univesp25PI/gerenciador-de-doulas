from fastapi import APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from application.services.auth_service import AuthService
from interface.api.dependencies import DoulaRepository, LoginForm
from interface.api.http_helper import ok_item
from interface.api.schemas.auth_schema import TokenResponse
from interface.api.schemas.common import SingleEnvelope

router = APIRouter()

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