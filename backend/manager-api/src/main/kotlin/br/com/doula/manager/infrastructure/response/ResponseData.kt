package br.com.doula.manager.infrastructure.response

import com.fasterxml.jackson.annotation.JsonInclude
import jakarta.validation.Valid

@JsonInclude(JsonInclude.Include.NON_NULL)
data class ResponseData<T>(
    @field:Valid
    val data: T
)