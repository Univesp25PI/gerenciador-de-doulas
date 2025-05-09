package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.PregnantApiAdapter
import br.com.doula.manager.infrastructure.request.PregnantRequest
import br.com.doula.manager.infrastructure.response.PregnantResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreatePregnantUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllPregnantsUseCase
import br.com.doula.manager.infrastructure.usecase.GetPregnantByIdUseCase
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/pregnant")
class PregnantController(
    private val createPregnantUseCase: CreatePregnantUseCase,
    private val getPregnantByIdUseCase: GetPregnantByIdUseCase,
    private val getAllPregnantsUseCase: GetAllPregnantsUseCase
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

    @GetMapping()
    fun getAllPregnants(): ResponseEntity<ResponseData<List<PregnantResponse>>>{
        val pregnants = getAllPregnantsUseCase.getAllPregnants()
        return ResponseEntity.ok(PregnantApiAdapter.toResponseList(pregnants.data))
    }

    @GetMapping("/{id}")
    fun getPregnantById(@PathVariable id:Long): ResponseEntity<ResponseData<PregnantResponse>>{
        val pregnant = getPregnantByIdUseCase.getPregnantById(id)
        return ResponseEntity.ok(PregnantApiAdapter.toResponseData(pregnant))
    }

}