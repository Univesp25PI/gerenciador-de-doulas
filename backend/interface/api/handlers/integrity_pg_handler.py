import re
from starlette import status
from sqlalchemy.exc import IntegrityError
from fastapi import Request

from interface.api.handlers.shared import error_response

_PG_SQLSTATE = {
    "23505": (status.HTTP_409_CONFLICT,            "UNIQUE_VIOLATION",      "Unique constraint violated"),
    "23503": (status.HTTP_422_UNPROCESSABLE_ENTITY,"FOREIGN_KEY_VIOLATION", "Foreign key violation"),
    "23502": (status.HTTP_422_UNPROCESSABLE_ENTITY,"NOT_NULL_VIOLATION",    "Not-null violation"),
    "23514": (status.HTTP_422_UNPROCESSABLE_ENTITY,"CHECK_VIOLATION",       "Check constraint violated"),
}

_CONSTRAINT_MESSAGES = {
    "uq_pregnants_email": ("EMAIL_ALREADY_EXISTS", "E-mail já cadastrado."),
    "fk_pregnants_doula": ("INVALID_DOULA_ID", "doula_id inexistente."),
}

_KEY_PATTERNS = [
    re.compile(r"Key \((?P<col>\w+)\)=\((?P<val>.+?)\)", re.IGNORECASE),
    re.compile(r"Chave \((?P<col>\w+)\)=\((?P<val>.+?)\)", re.IGNORECASE),
]

def _extract_key_info(detail: str) -> tuple[str | None, str | None]:
    if not detail:
        return None, None
    for pat in _KEY_PATTERNS:
        m = pat.search(detail)
        if m:
            return m.group("col"), m.group("val")
    m = re.search(r"\((?P<col>\w+)\)=\(", detail)
    return (m.group("col"), None) if m else (None, None)

def _map_integrity_error(exc: IntegrityError) -> tuple[int, str, str, str]:
    orig = getattr(exc, "orig", None)
    sqlstate = getattr(orig, "sqlstate", None) or getattr(orig, "pgcode", None)
    detail = getattr(orig, "detail", None) or str(orig or exc)
    constraint = getattr(orig, "constraint_name", None)
    column = getattr(orig, "column_name", None)

    http_status = status.HTTP_400_BAD_REQUEST
    code = "INTEGRITY_ERROR"
    title = "Database constraint violated"
    message = "Restrição de integridade violada."

    if constraint and constraint in _CONSTRAINT_MESSAGES:
        c_code, c_msg = _CONSTRAINT_MESSAGES[constraint]
        if sqlstate and sqlstate in _PG_SQLSTATE:
            http_status, _, default_title = _PG_SQLSTATE[sqlstate]
            title = default_title
        return http_status, c_code, title, c_msg

    if sqlstate and sqlstate in _PG_SQLSTATE:
        http_status, code, title = _PG_SQLSTATE[sqlstate]
        if sqlstate == "23505":
            col, _ = _extract_key_info(detail)
            col = col or column
            message = f'Valor já cadastrado para "{col}".' if col else "Violação de unicidade."
        elif sqlstate == "23503":
            col = column or _extract_key_info(detail)[0]
            message = (f'Referência inválida em "{col}". Registro relacionado não existe.'
                       if col else "Referência estrangeira inválida. Registro relacionado não existe.")
        elif sqlstate == "23502":
            message = f'Campo obrigatório ausente: "{column}".' if column else "Campo obrigatório ausente."
        elif sqlstate == "23514":
            message = "Restrição de validação violada."

    return http_status, code, title, message

async def handler(request: Request, exc: IntegrityError):
    http_status, code, title, message = _map_integrity_error(exc)
    return error_response(http_status, code, title, message, path=str(request.url.path))