package br.com.doula.manager.infrastructure.request

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern

data class DoulaRequest(
    @field:NotNull
    val name: String,
    @field:NotNull
    @field:Pattern(
        regexp = "^\\d{10,11}$",
        message = "Phone number must be in the format (XX)XXXX-XXXX or (XX)XXXX-XXXX."
    )
    val phone: String,
    @field:NotNull
    @field:Email(message = "Invalid email.")
    val email: String
)
