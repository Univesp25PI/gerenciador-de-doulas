package br.com.doula.manager.infrastructure.response

import br.com.doula.manager.infrastructure.enums.HelloTypeEnum

data class HelloResponse(
    val id: Long,
    val helloString: String,
    val helloList: List<String>,
    val type: HelloTypeEnum,
    val createDate: String,
    val updateDate: String
)
