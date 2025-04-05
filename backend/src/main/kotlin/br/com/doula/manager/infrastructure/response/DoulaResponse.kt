package br.com.doula.manager.infrastructure.response

data class DoulaResponse(
    val id: Long,
    val name: String,
    val phone: String,
    val email: String,
    val createDate: String,
    val updateDate: String
)
