package br.com.doula.manager.infrastructure.handler

import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.response.ResponseErrorData
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(
        ex: MethodArgumentNotValidException
    ): ResponseEntity<ResponseErrorData<Map<String, Any>>> {

        val additionalInfo = ex.bindingResult.allErrors
            .mapNotNull { it.defaultMessage }
            .joinToString(" ")

        val defaultException = ErrorCodeManagerEnum.INVALID_REQUEST
        val errorDescription = defaultException.description + additionalInfo
        val httpStatus = HttpStatus.resolve(defaultException.httpCode) ?: HttpStatus.INTERNAL_SERVER_ERROR

        val errorData = mapOf(
            "Code" to defaultException.code,
            "Name" to defaultException.name,
            "Description" to errorDescription
        )

        return ResponseEntity(ResponseErrorData(errorData), httpStatus)
    }

    @ExceptionHandler(DefaultManagerException::class)
    fun handleDefaultManagerException(
        ex: DefaultManagerException
    ): ResponseEntity<ResponseErrorData<Map<String, Any>>> {

        val errorData = mapOf(
            "Code" to ex.code,
            "Name" to ex.errorEnum.name,
            "Description" to ex.description
        )

        val httpStatus = HttpStatus.resolve(ex.httpCode) ?: HttpStatus.INTERNAL_SERVER_ERROR

        return ResponseEntity(ResponseErrorData(errorData), httpStatus)
    }
}