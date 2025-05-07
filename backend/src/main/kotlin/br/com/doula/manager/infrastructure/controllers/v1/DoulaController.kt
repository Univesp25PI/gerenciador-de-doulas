package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.DoulaApiAdapter
import br.com.doula.manager.infrastructure.request.DoulaRequest
import br.com.doula.manager.infrastructure.response.DoulaResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreateDoulaUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllDoulasUseCase
import br.com.doula.manager.infrastructure.usecase.GetDoulaByIdUseCase
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/v1/doula")
class DoulaController(
    private val createDoulaUseCase: CreateDoulaUseCase,
    private val getAllDoulasUseCase: GetAllDoulasUseCase,
    private val getDoulaByIdUseCase: GetDoulaByIdUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping()
    fun createDoula(
        @Valid @RequestBody request: DoulaRequest
    ): ResponseEntity<ResponseData<DoulaResponse>> {
        log.info("Initiate Create Doula flow!")

        val model = DoulaApiAdapter.toModel(request)
        val persistedModel = createDoulaUseCase.createDoula(model)
        val response = DoulaApiAdapter.toResponse(persistedModel)

        return ResponseEntity.ok(response)
    }

    @GetMapping("/all")
    fun getAllDoulas(): ResponseEntity<ResponseData<List<DoulaResponse>>>{
        val doulas = getAllDoulasUseCase.getAllDoulas()
        return ResponseEntity.ok(DoulaApiAdapter.toResponseList(doulas.data))
    }

    @GetMapping("/{id}")
    fun getDoulaById(@PathVariable id: Long): ResponseEntity<ResponseData<DoulaResponse>>{
        val doula = getDoulaByIdUseCase.getDoulaById(id)
        return ResponseEntity.ok(DoulaApiAdapter.toResponse(doula))

    }
}