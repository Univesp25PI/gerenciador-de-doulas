package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.LessonApiAdapter
import br.com.doula.manager.infrastructure.request.LessonRequest
import br.com.doula.manager.infrastructure.response.LessonResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreateLessonUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllLessonsUseCase
import br.com.doula.manager.infrastructure.usecase.GetLessonByIdUseCase
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
@RequestMapping("/v1/lesson")
@Tag(name = "Lesson", description = "Operações relacionadas às aulas")
class LessonController(
    private val createLessonUseCase: CreateLessonUseCase,
    private val getLessonByIdUseCase: GetLessonByIdUseCase,
    private val getAllLessonsUseCase: GetAllLessonsUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping()
    @Operation(summary = "Criar nova aula", description = "Cria uma nova aula com base nas informações fornecidas.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Aula criada com sucesso"),
            ApiResponse(responseCode = "400", description = "Dados inválidos na requisição")
        ]
    )
    fun createLesson(
        @Valid @RequestBody request: LessonRequest
    ): ResponseEntity<ResponseData<LessonResponse>>  {
        log.info("Initiate Create Lesson flow!")

        val model = LessonApiAdapter.toModel(request)
        val persistedModel = createLessonUseCase.createLesson(model)
        val response = LessonApiAdapter.toResponse(persistedModel)

        return ResponseEntity.ok(response)
    }

    @GetMapping()
    @Operation(summary = "Listar todas as aulas", description = "Retorna todas as aulas cadastradas no sistema.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
        ]
    )
    fun getAllLessons(): ResponseEntity<ResponseData<List<LessonResponse>>>{
        val lessons = getAllLessonsUseCase.getAllLessons()
        return ResponseEntity.ok(LessonApiAdapter.toResponseList(lessons.data))
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aula por ID", description = "Retorna os dados da aula correspondente ao ID informado.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Aula encontrada com sucesso"),
            ApiResponse(responseCode = "404", description = "Aula não encontrada para o ID informado")
        ]
    )
    fun getLessonById(
        @Parameter(description = "ID da aula", required = true)
        @PathVariable id: Long
    ): ResponseEntity<ResponseData<LessonResponse>>{
        val lesson = getLessonByIdUseCase.getLessonById(id)
        return ResponseEntity.ok(LessonApiAdapter.toResponse(lesson))
    }

}