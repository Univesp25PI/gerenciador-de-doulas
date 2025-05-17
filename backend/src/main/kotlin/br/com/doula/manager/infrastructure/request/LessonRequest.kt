package br.com.doula.manager.infrastructure.request

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.constraints.FutureOrPresent
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.PastOrPresent
import java.time.LocalDate
import java.time.LocalDateTime

@Schema(description = "Requisição para criação de uma nova aula")
data class LessonRequest(

    @field:NotNull(message = "Pregnant ID is required")
    @JsonProperty("id_pregnant")
    @Schema(description = "ID da gestante associada à aula", example = "10")
    val idPregnant: Long,

    @field:NotNull(message = "Class number is required")
    @field:Min(value = 1, message = "Class number must be at least 1")
    @JsonProperty("class_number")
    @Schema(description = "Número da aula", example = "1")
    val classNumber: Int,

    @field:NotNull(message = "Class type is required")
    @JsonProperty("class_type")
    @Schema(description = "Tipo de aula", example = "INDIVIDUAL")
    val classType: LessonTypeEnum,

    @field:NotNull(message = "Class date is required")
    @field:FutureOrPresent(message = "Class date must be in the present or future")
    @JsonProperty("class_date")
    @Schema(description = "Data e hora agendada para a aula", type = "string", format = "date-time", example = "2025-06-01T14:00:00")
    val classDate: LocalDateTime,

    @field:NotNull(message = "Last menstrual period date is required")
    @field:PastOrPresent(message = "Last menstrual period date must be in the present or future")
    @JsonProperty("lmp_date")
    @Schema(description = "Data da última menstruação da gestante", type = "string", format = "date", example = "2025-02-15")
    val lmpDate: LocalDate,
)
