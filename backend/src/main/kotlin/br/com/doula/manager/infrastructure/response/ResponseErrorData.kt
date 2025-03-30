package br.com.doula.manager.infrastructure.response

import com.fasterxml.jackson.annotation.JsonInclude
import jakarta.validation.Valid

@JsonInclude(JsonInclude.Include.NON_NULL)
data class ResponseErrorData<T>(
    @field:Valid
    val errors: T
)