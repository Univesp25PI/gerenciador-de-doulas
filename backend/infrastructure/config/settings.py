from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    jwt_secret_key: str = Field(..., env="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", env="JWT_ALGORITHM")
    jwt_expires_minutes: int = Field(default=60, env="JWT_EXPIRES_MINUTES")

    class Config:
        env_file = ".env"

settings = Settings()