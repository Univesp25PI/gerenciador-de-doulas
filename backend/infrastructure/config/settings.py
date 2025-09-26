from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    jwt_secret_key: str = Field(..., alias="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    jwt_expires_minutes: int = Field(default=60, alias="JWT_EXPIRES_MINUTES")

    database_url: str = Field(..., alias="DATABASE_URL")

    @property
    def sqlalchemy_sync_url(self) -> str:
        return self.database_url.replace("+asyncpg", "+psycopg2")

    model_config = {
        "env_file": ".env",
        "case_sensitive": False
    }

settings = Settings()