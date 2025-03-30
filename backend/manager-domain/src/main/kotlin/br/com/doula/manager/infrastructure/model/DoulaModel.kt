package br.com.doula.manager.infrastructure.model

data class DoulaModel(
    val id: Long? = null,
    val name: String,
    val phone: String,
    val email: String,
    val createDate: String? = null,
    val updateDate: String? = null
)
