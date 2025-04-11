package br.com.doula.manager.infrastructure.response

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import java.time.LocalDate
import java.time.LocalDateTime

data class PregnantResponse(
    val id: Long,
    val idDoula: Long,
    val name: String,
    val age: Int,
    val firstPregnancy: Boolean,
    val lmpDate: LocalDate,
    val comorbidities: List<ComorbiditiesEnum>,
    val pregnancyWeek: Int,
    val birthForecast: LocalDate,
    val createDate: LocalDateTime,
    val updateDate: LocalDateTime
)
