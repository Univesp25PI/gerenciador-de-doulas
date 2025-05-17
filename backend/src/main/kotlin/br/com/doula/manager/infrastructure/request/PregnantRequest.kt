package br.com.doula.manager.infrastructure.request

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.constraints.*
import java.time.LocalDate


@Schema(description = "Requisição para cadastro de uma gestante")
data class PregnantRequest(

    @field:NotNull(message = "Doula ID is required")
    @JsonProperty("id_doula")
    @Schema(description = "ID da doula associada à gestante", example = "1")
    val idDoula: Long,

    @field:NotBlank(message = "Name is required")
    @field:Size(max = 100, message = "Name must be at most 100 characters long")
    @Schema(description = "Nome completo da gestante", example = "Ana Souza")
    val name: String,

    @field:NotNull(message = "Age is required")
    @field:Min(value = 10, message = "Minimum allowed age is 10")
    @field:Max(value = 60, message = "Maximum allowed age is 60")
    @Schema(description = "Idade da gestante", example = "28")
    val age: Int,

    @field:NotBlank(message = "Phone number is required")
    @field:Pattern(
        regexp = "^\\d{10,11}$",
        message = "Phone number must contain 10 or 11 digits"
    )
    @Schema(description = "Número de telefone com DDD", example = "11988887777")
    val phone: String,

    @field:NotNull(message = "Email is required")
    @field:Email(message = "Invalid email format")
    @Schema(description = "Endereço de e-mail da gestante", example = "ana.souza@gmail.com")
    val email: String,

    @field:NotNull(message = "First pregnancy field is required")
    @JsonProperty("first_pregnancy")
    @Schema(description = "Indica se é a primeira gestação", example = "true")
    val firstPregnancy: Boolean,

    @field:NotNull(message = "Last menstrual period date is required")
    @field:PastOrPresent(message = "Last menstrual period date cannot be in the future")
    @JsonProperty("lmp_date")
    @Schema(description = "Data da última menstruação", type = "string", format = "date", example = "2025-02-01")
    val lmpDate: LocalDate,

    @Schema(description = "Lista de comorbidades da gestante", example = "[\"DIABETES\", \"HIPERTENSAO\"]")
    val comorbidities: List<ComorbiditiesEnum> = emptyList()
)
