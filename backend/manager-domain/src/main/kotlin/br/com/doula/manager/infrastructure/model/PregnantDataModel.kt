package br.com.doula.manager.infrastructure.model

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import java.time.LocalDate
import java.time.LocalDateTime

data class PregnantDataModel(
    val id: Long? = null,
    val idDoula: Long,
    val name: String,
    val age: Int,
    val phone: String,
    val email: String,
    val firstPregnancy: Boolean,
    val lmpDate: LocalDate,
    val comorbidities: List<ComorbiditiesEnum>,
    val pregnancyWeek: Int? = null,
    val birthForecast: LocalDate? = null,
    val createDate: LocalDateTime? = null,
    val updateDate: LocalDateTime? = null
)
