package br.com.doula.manager.infrastructure.enums

enum class ErrorCodeManagerEnum(
    val code: String,
    val description: String,
    val httpCode: Int
) {
    INVALID_REQUEST("DTA0002", "Some fields in the request are invalid: ", 400),
    DUPLICATED_DOULA("DTA0002", "Doula email already registred.", 409)
}