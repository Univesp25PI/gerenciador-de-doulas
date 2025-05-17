package br.com.doula.manager.infrastructure.response

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Dados retornados de uma doula")
data class DoulaResponse(
    @Schema(description = "Identificador único da doula", example = "1")
    val id: Long,

    @Schema(description = "Nome completo da doula", example = "Maria Silva")
    val name: String,

    @Schema(description = "Telefone da doula com DDD", example = "11988887777")
    val phone: String,

    @Schema(description = "E-mail da doula", example = "maria.silva@gmail.com")
    val email: String,

    @Schema(description = "Data de criação do registro", example = "2024-05-17T10:30:00Z")
    val createDate: String,

    @Schema(description = "Data da última atualização do registro", example = "2024-05-18T15:42:00Z")
    val updateDate: String
)
