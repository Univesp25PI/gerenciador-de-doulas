package br.com.doula.manager.infrastructure.request

import br.com.doula.manager.infrastructure.enums.HelloTypeEnum
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull

data class HelloRequest(
    @field:NotNull
    val helloString: String,
    @field:NotEmpty
    val helloList: List<String>,
    @field:NotNull
    val type: HelloTypeEnum
)
