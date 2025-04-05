package br.com.doula.manager.infrastructure.exception

import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum

class DefaultManagerException : RuntimeException {
    val code: String
    val description: String
    val httpCode: Int
    val errorEnum: ErrorCodeManagerEnum

    constructor(errorEnum: ErrorCodeManagerEnum) {
        this.code = errorEnum.code
        this.description = errorEnum.description
        this.httpCode = errorEnum.httpCode
        this.errorEnum = errorEnum
    }
}