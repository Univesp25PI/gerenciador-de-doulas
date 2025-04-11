package br.com.doula.manager.infrastructure.request

import jakarta.validation.constraints.*

data class DoulaRequest(
    @field:NotBlank(message = "Name is required")
    @field:Size(max = 100, message = "Name must be at most 100 characters long")
    val name: String,

    @field:NotNull(message = "Phone number is required")
    @field:Pattern(
        regexp = "^\\d{10,11}$",
        message = "Phone number must contain 10 or 11 digits"
    )
    val phone: String,

    @field:NotNull(message = "Email is required")
    @field:Email(message = "Invalid email format")
    val email: String
)
