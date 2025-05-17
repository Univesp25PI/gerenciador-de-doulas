package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.PregnantApiAdapter
import br.com.doula.manager.infrastructure.request.PregnantRequest
import br.com.doula.manager.infrastructure.response.PregnantResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreatePregnantUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllPregnantsUseCase
import br.com.doula.manager.infrastructure.usecase.GetPregnantByIdUseCase
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/pregnant")
@Tag(name = "Pregnant", description = "Operações relacionadas às gestantes")
class PregnantController(
    private val createPregnantUseCase: CreatePregnantUseCase,
    private val getPregnantByIdUseCase: GetPregnantByIdUseCase,
    private val getAllPregnantsUseCase: GetAllPregnantsUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping()
    @Operation(summary = "Cadastrar nova gestante", description = "Cria uma nova gestante com os dados fornecidos.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Gestante criada com sucesso"),
            ApiResponse(responseCode = "400", description = "Dados inválidos na requisição")
        ]
    )
    fun createPregnant(
        @Valid @RequestBody request: PregnantRequest
    ): ResponseEntity<ResponseData<PregnantResponse>>  {
        log.info("Initiate Create Pregnant flow!")

        val model = PregnantApiAdapter.toModel(request)
        val persistedModel = createPregnantUseCase.createPregnant(model)
        val response = PregnantApiAdapter.toResponseData(persistedModel)

        return ResponseEntity.ok(response)
    }

    @GetMapping()
    @Operation(summary = "Listar todas as gestantes", description = "Retorna todas as gestantes cadastradas.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Lista de gestantes retornada com sucesso")
        ]
    )
    fun getAllPregnants(): ResponseEntity<ResponseData<List<PregnantResponse>>>{
        val pregnants = getAllPregnantsUseCase.getAllPregnants()
        return ResponseEntity.ok(PregnantApiAdapter.toResponseList(pregnants.data))
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar gestante por ID", description = "Retorna os dados da gestante pelo ID informado.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Gestante encontrada com sucesso"),
            ApiResponse(responseCode = "404", description = "Gestante não encontrada para o ID informado")
        ]
    )
    fun getPregnantById(
        @Parameter(description = "ID da gestante", required = true)
        @PathVariable id: Long
    ): ResponseEntity<ResponseData<PregnantResponse>>{
        val pregnant = getPregnantByIdUseCase.getPregnantById(id)
        return ResponseEntity.ok(PregnantApiAdapter.toResponseData(pregnant))
    }

}