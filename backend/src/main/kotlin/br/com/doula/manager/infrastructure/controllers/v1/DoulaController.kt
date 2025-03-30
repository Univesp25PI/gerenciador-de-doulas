package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.DoulaApiAdapter
import br.com.doula.manager.infrastructure.request.DoulaRequest
import br.com.doula.manager.infrastructure.response.DoulaResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreateDoulaUseCase
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/doula")
class DoulaController(
    private val createDoulaUseCase: CreateDoulaUseCase
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
}