# schemas/common.py
from typing import Generic, TypeVar, Sequence, Any, Union
from pydantic import BaseModel, Field
from datetime import datetime

T = TypeVar("T")

class Error(BaseModel):
    code: str
    title: Any | None = None
    message: str

class ErrorMetadata(BaseModel):
    request_time: datetime = Field(default_factory=datetime.utcnow)
    path: str | None = None

class ErrorEnvelope(BaseModel):
    error: Error
    metadata: ErrorMetadata

class SingleMetadata(BaseModel):
    request_time: datetime = Field(default_factory=datetime.utcnow)

class SingleEnvelope(BaseModel, Generic[T]):
    data: T
    metadata: SingleMetadata

class ListMetadata(BaseModel):
    page: int
    total_pages: int
    total_records: int
    request_time: datetime = Field(default_factory=datetime.utcnow)

class ListEnvelope(BaseModel, Generic[T]):
    data: Sequence[T]
    metadata: ListMetadata