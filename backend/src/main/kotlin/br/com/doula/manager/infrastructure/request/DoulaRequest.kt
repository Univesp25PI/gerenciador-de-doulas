package br.com.doula.manager.infrastructure.request

import jakarta.validation.constraints.*

data class DoulaRequest(
    @field:NotBlank(message = "O nome é obrigatório")
    @field:Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
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
