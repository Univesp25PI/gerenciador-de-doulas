package br.com.doula.manager.infrastructure.enums

enum class ErrorCodeManagerEnum(
    val code: String,
    val description: String,
    val httpCode: Int
) {
    INVALID_REQUEST("DTA0001", "Some fields in the request are invalid: ", 400),
    UNKNOWN_DATABASE_ERROR("DTA0002", "A database error occurred while processing the request.", 500),
    DUPLICATED_DOULA("DTA0003", "Doula email already registred.", 409),
    DUPLICATED_PREGNANT("DTA0004", "Pregnant email already registered.", 409),
    INVALID_DOULA_REFERENCE("DTA0005", "Invalid Doula Id.", 409),
    INVALID_PREGNANT_REFERENCE("DTA0006", "Invalid Pregnant Id.", 409),
}