from datetime import datetime

from pydantic import BaseModel

class DoulaRequest(BaseModel):
    name: str
    email: str
    phone: str


class DoulaResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    create_date: datetime
    update_date: datetime

    model_config = {
        "from_attributes": True
    }

class DoulaSummary(BaseModel):
    id: int
    name: str
    email: str

    model_config = {"from_attributes": True}