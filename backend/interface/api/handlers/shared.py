from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from interface.api.schemas.common import ErrorEnvelope, Error, ErrorMetadata

def error_response(status_code: int, code: str, title: str, message: str, path: str) -> JSONResponse:
    body = ErrorEnvelope(
        error=Error(code=code, title=title, message=message),
        metadata=ErrorMetadata(path=path),
    )
    return JSONResponse(status_code=status_code, content=jsonable_encoder(body))