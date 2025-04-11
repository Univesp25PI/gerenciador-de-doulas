package br.com.doula.manager.infrastructure.request

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.*
import java.time.LocalDate

data class PregnantRequest(
    @field:NotNull(message = "O ID da doula é obrigatório")
    @JsonProperty("id_doula")
    val idDoula: Long,

    @field:NotBlank(message = "O nome é obrigatório")
    @field:Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    val name: String,

    @field:NotNull(message = "A idade é obrigatória")
    @field:Min(value = 10, message = "Idade mínima permitida é 10 anos")
    @field:Max(value = 60, message = "Idade máxima permitida é 60 anos")
    val age: Int,

    @field:NotBlank
    @field:Pattern(
        regexp = "^\\d{10,11}$",
        message = "Phone number must be in the format (XX)XXXX-XXXX or (XX)XXXX-XXXX."
    )
    val phone: String,

    @field:NotNull
    @field:Email(message = "Invalid email.")
    val email: String,

    @field:NotNull(message = "O campo primeira gravidez é obrigatório")
    @JsonProperty("first_pregnancy")
    val firstPregnancy: Boolean,

    @field:NotNull(message = "A data da última menstruação é obrigatória")
    @field:PastOrPresent(message = "A data da última menstruação não pode ser no futuro")
    @JsonProperty("lmp_date")
    val lmpDate: LocalDate,

    val comorbidities: List<ComorbiditiesEnum> = emptyList()
)
