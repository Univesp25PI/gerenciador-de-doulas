from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str

    @property
    def sqlalchemy_sync_url(self) -> str:
        return self.DATABASE_URL.replace("+asyncpg", "+psycopg2")

    class Config:
        env_file = ".env"

settings = Settings()
