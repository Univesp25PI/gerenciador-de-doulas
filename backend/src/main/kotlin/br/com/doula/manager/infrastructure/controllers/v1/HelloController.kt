package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.HelloApiAdapter
import br.com.doula.manager.infrastructure.request.HelloRequest
import br.com.doula.manager.infrastructure.response.HelloResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreateHelloUseCase
import br.com.doula.manager.infrastructure.usecase.FindHelloUseCase
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1")
class HelloController(
    private val findHelloUseCase: FindHelloUseCase,
    private val createHelloUseCase: CreateHelloUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @GetMapping("/hello-world")
    fun getHelloWorld(
        @RequestHeader("Hello-Id") id: String
    ): ResponseEntity<ResponseData<HelloResponse>> {
        log.info("Initiate Get Hello World flow!")
        val model = findHelloUseCase.findHelloWorld(id.toLong())
        val response = HelloApiAdapter.toResponse(model)

        return ResponseEntity.ok(response)
    }

    @PostMapping("/hello-world")
    fun createHelloWorld(
        @RequestBody request: HelloRequest
    ): ResponseEntity<ResponseData<HelloResponse>> {
        log.info("Initiate Create Hello World flow!")

        val model = HelloApiAdapter.toModel(request)
        val persistedModel = createHelloUseCase.createHelloWorld(model)
        val response = HelloApiAdapter.toResponse(persistedModel)

        return ResponseEntity.ok(response)
    }
}