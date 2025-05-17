package br.com.doula.manager.infrastructure.request

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.constraints.*

@Schema(description = "Requisição para criação de uma nova doula")
data class DoulaRequest(
    @field:NotBlank(message = "Name is required")
    @field:Size(max = 100, message = "Name must be at most 100 characters long")
    @Schema(description = "Nome completo da doula", example = "Maria Silva")
    val name: String,

    @field:NotNull(message = "Phone number is required")
    @field:Pattern(
        regexp = "^\\d{10,11}$",
        message = "Phone number must contain 10 or 11 digits"
    )
    @Schema(description = "Número de telefone com DDD", example = "11988887777")
    val phone: String,

    @field:NotNull(message = "Email is required")
    @field:Email(message = "Invalid email format")
    @Schema(description = "Endereço de e-mail válido", example = "maria.silva@gmail.com")
    val email: String
)
