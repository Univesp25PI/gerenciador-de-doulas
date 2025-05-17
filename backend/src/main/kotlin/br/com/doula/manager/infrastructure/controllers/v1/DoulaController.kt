package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.DoulaApiAdapter
import br.com.doula.manager.infrastructure.request.DoulaRequest
import br.com.doula.manager.infrastructure.response.DoulaResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreateDoulaUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllDoulasUseCase
import br.com.doula.manager.infrastructure.usecase.GetDoulaByIdUseCase
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
@RequestMapping("/v1/doula")
@Tag(name = "Doula", description = "Operações relacionadas às doulas")
class DoulaController(
    private val createDoulaUseCase: CreateDoulaUseCase,
    private val getAllDoulasUseCase: GetAllDoulasUseCase,
    private val getDoulaByIdUseCase: GetDoulaByIdUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping()
    @Operation(summary = "Criar nova doula", description = "Cria uma nova doula a partir dos dados fornecidos.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Doula criada com sucesso"),
            ApiResponse(responseCode = "400", description = "Dados inválidos enviados")
        ]
    )
    fun createDoula(
        @Valid @RequestBody request: DoulaRequest
    ): ResponseEntity<ResponseData<DoulaResponse>> {
        log.info("Initiate Create Doula flow!")

        val model = DoulaApiAdapter.toModel(request)
        val persistedModel = createDoulaUseCase.createDoula(model)
        val response = DoulaApiAdapter.toResponse(persistedModel)

        return ResponseEntity.ok(response)
    }

    @GetMapping()
    @Operation(summary = "Listar todas as doulas", description = "Retorna uma lista com todas as doulas cadastradas.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
        ]
    )
    fun getAllDoulas(): ResponseEntity<ResponseData<List<DoulaResponse>>>{
        val doulas = getAllDoulasUseCase.getAllDoulas()
        return ResponseEntity.ok(DoulaApiAdapter.toResponseList(doulas.data))
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar doula por ID", description = "Retorna os dados da doula correspondente ao ID fornecido.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Doula encontrada com sucesso"),
            ApiResponse(responseCode = "404", description = "Doula não encontrada para o ID informado")
        ]
    )
    fun getDoulaById(
        @Parameter(description = "ID da doula", required = true)
        @PathVariable id: Long
    ): ResponseEntity<ResponseData<DoulaResponse>>{
        val doula = getDoulaByIdUseCase.getDoulaById(id)
        return ResponseEntity.ok(DoulaApiAdapter.toResponse(doula))

    }
}