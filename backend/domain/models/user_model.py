from pydantic import BaseModel


class UserModel(BaseModel):
    sub: str
    id: int
    name: str
    exp: int
    role: str