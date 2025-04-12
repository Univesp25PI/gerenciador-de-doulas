package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.PregnantApiAdapter
import br.com.doula.manager.infrastructure.request.PregnantRequest
import br.com.doula.manager.infrastructure.response.PregnantResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreatePregnantUseCase
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/pregnant")
class PregnantController(
    private val createPregnantUseCase: CreatePregnantUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping()
    fun createPregnant(
        @Valid @RequestBody request: PregnantRequest
    ): ResponseEntity<ResponseData<PregnantResponse>>  {
        log.info("Initiate Create Pregnant flow!")

        val model = PregnantApiAdapter.toModel(request)
        val persistedModel = createPregnantUseCase.createPregnant(model)
        val response = PregnantApiAdapter.toResponseData(persistedModel)

        return ResponseEntity.ok(response)
    }

}