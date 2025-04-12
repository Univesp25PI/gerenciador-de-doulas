package br.com.doula.manager.infrastructure.request

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.*
import java.time.LocalDate

data class PregnantRequest(
    @field:NotNull(message = "Doula ID is required")
    @JsonProperty("id_doula")
    val idDoula: Long,

    @field:NotBlank(message = "Name is required")
    @field:Size(max = 100, message = "Name must be at most 100 characters long")
    val name: String,

    @field:NotNull(message = "Age is required")
    @field:Min(value = 10, message = "Minimum allowed age is 10")
    @field:Max(value = 60, message = "Maximum allowed age is 60")
    val age: Int,

    @field:NotBlank(message = "Phone number is required")
    @field:Pattern(
        regexp = "^\\d{10,11}$",
        message = "Phone number must contain 10 or 11 digits"
    )
    val phone: String,

    @field:NotNull(message = "Email is required")
    @field:Email(message = "Invalid email format")
    val email: String,

    @field:NotNull(message = "First pregnancy field is required")
    @JsonProperty("first_pregnancy")
    val firstPregnancy: Boolean,

    @field:NotNull(message = "Last menstrual period date is required")
    @field:PastOrPresent(message = "Last menstrual period date cannot be in the future")
    @JsonProperty("lmp_date")
    val lmpDate: LocalDate,

    val comorbidities: List<ComorbiditiesEnum> = emptyList()
)
