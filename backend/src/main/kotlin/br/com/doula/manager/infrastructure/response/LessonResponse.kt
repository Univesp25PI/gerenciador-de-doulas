package br.com.doula.manager.infrastructure.response

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDateTime

@Schema(description = "Dados retornados de uma aula")
data class LessonResponse(

    @Schema(description = "ID único da aula", example = "1")
    val id: Long,

    @Schema(description = "ID da gestante associada à aula", example = "10")
    val idPregnant: Long,

    @Schema(description = "Número da aula", example = "1")
    val classNumber: Int,

    @Schema(description = "Tipo da aula", example = "INDIVIDUAL")
    val classType: LessonTypeEnum,

    @Schema(description = "Data e hora da aula", type = "string", format = "date-time", example = "2025-06-01T14:00:00")
    val classDate: LocalDateTime,

    @Schema(description = "Semana gestacional na data da aula", example = "32")
    val pregnantWeek: Int,

    @Schema(description = "Data de criação do registro", type = "string", format = "date-time", example = "2025-05-01T10:00:00")
    val createDate: LocalDateTime,

    @Schema(description = "Data da última atualização", type = "string", format = "date-time", example = "2025-05-10T18:30:00")
    val updateDate: LocalDateTime,
)