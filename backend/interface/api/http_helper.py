from typing import Sequence, TypeVar
from interface.api.schemas.common import SingleEnvelope, ListEnvelope, SingleMetadata, ListMetadata, Error, ErrorMetadata, \
    ErrorEnvelope

T = TypeVar("T")

def ok_item(item: T) -> SingleEnvelope[T]:
    return SingleEnvelope(
        data=item,
        metadata=SingleMetadata(),
    )

def ok_list(items: Sequence[T], page: int, size: int, total_records: int) -> ListEnvelope[T]:
    total_pages = (total_records + size - 1) // size if size > 0 else 1
    return ListEnvelope(
        data=items,
        metadata=ListMetadata(page=page, total_pages=total_pages, total_records=total_records),
    )

def fail(code: str, message: str, http_status: int, title=None, path: str | None = None):
    env = ErrorEnvelope[dict](
        error=Error(code=code, title=title, message=message),
        metadata=ErrorMetadata(path=path),
    )
    return env, http_status