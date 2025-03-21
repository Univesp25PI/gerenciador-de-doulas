package br.com.doula.manager.infrastructure.model

import br.com.doula.manager.infrastructure.enums.HelloTypeEnum

data class HelloModel(
    val id: Long? = null,
    val helloString: String,
    val helloList: List<String>,
    val type: HelloTypeEnum,
    val createDate: String? = null,
    val updateDate: String? = null
) {
    fun getHelloListFromList(): String =
        helloList.joinToString(",")
}
