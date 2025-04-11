package br.com.doula.manager.infrastructure.response

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import java.time.LocalDateTime

data class LessonResponse(
    val id: Long,
    val idPregnant: Long,
    val classNumber: Int,
    val classType: LessonTypeEnum,
    val classDate: LocalDateTime,
    val pregnantWeek: Int,
    val createDate: LocalDateTime,
    val updateDate: LocalDateTime,
)
