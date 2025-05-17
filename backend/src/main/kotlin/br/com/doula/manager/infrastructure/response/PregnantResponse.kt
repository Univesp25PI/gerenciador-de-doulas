package br.com.doula.manager.infrastructure.response

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDate
import java.time.LocalDateTime

@Schema(description = "Resposta com os dados de uma gestante")
data class PregnantResponse(

    @Schema(description = "ID da gestante", example = "1")
    val id: Long,

    @Schema(description = "ID da doula associada", example = "1")
    val idDoula: Long,

    @Schema(description = "Nome da gestante", example = "Ana Souza")
    val name: String,

    @Schema(description = "Idade da gestante", example = "28")
    val age: Int,

    @Schema(description = "Indica se é a primeira gestação", example = "true")
    val firstPregnancy: Boolean,

    @Schema(description = "Data da última menstruação", type = "string", format = "date", example = "2025-02-01")
    val lmpDate: LocalDate,

    @Schema(description = "Comorbidades da gestante", example = "[\"DIABETES\"]")
    val comorbidities: List<ComorbiditiesEnum>,

    @Schema(description = "Semana gestacional atual", example = "32")
    val pregnancyWeek: Int,

    @Schema(description = "Data prevista para o parto", type = "string", format = "date", example = "2025-11-10")
    val birthForecast: LocalDate,

    @Schema(description = "Data de criação do registro", type = "string", format = "date-time", example = "2025-03-01T10:15:00")
    val createDate: LocalDateTime,

    @Schema(description = "Data da última atualização", type = "string", format = "date-time", example = "2025-04-01T15:00:00")
    val updateDate: LocalDateTime
)
