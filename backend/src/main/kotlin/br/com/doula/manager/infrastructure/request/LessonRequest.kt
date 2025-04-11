package br.com.doula.manager.infrastructure.request

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.FutureOrPresent
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.PastOrPresent
import java.time.LocalDate
import java.time.LocalDateTime

data class LessonRequest(
    @field:NotNull(message = "Pregnant ID is required")
    @JsonProperty("id_pregnant")
    val idPregnant: Long,

    @field:NotNull(message = "Class number is required")
    @field:Min(value = 1, message = "Class number must be at least 1")
    @JsonProperty("class_number")
    val classNumber: Int,

    @field:NotNull(message = "Class type is required")
    @JsonProperty("class_type")
    val classType: LessonTypeEnum,

    @field:NotNull(message = "Class date is required")
    @field:FutureOrPresent(message = "Class date must be in the present or future")
    @JsonProperty("class_date")
    val classDate: LocalDateTime,

    @field:NotNull(message = "Last menstrual period date is required")
    @field:PastOrPresent(message = "Last menstrual period date must be in the present or future")
    @JsonProperty("lmp_date")
    val lmpDate: LocalDate,
)
