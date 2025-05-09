package br.com.doula.manager.infrastructure.model

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import java.time.LocalDate
import java.time.LocalDateTime

data class LessonDataModel(
    val id: Long? = null,
    val idPregnant: Long,
    val classNumber: Int,
    val classType: LessonTypeEnum,
    val classDate: LocalDateTime,
    val pregnantWeek: Int? = null,
    val lmpDate: LocalDate?,
    val createDate: LocalDateTime? = null,
    val updateDate: LocalDateTime? = null,
)
