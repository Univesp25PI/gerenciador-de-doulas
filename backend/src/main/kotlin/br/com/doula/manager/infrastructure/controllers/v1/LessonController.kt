package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.adapters.LessonApiAdapter
import br.com.doula.manager.infrastructure.request.LessonRequest
import br.com.doula.manager.infrastructure.response.LessonResponse
import br.com.doula.manager.infrastructure.response.ResponseData
import br.com.doula.manager.infrastructure.usecase.CreateLessonUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllLessonsUseCase
import br.com.doula.manager.infrastructure.usecase.GetLessonByIdUseCase
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/lesson")
class LessonController(
    private val createLessonUseCase: CreateLessonUseCase,
    private val getLessonByIdUseCase: GetLessonByIdUseCase,
    private val getAllLessonsUseCase: GetAllLessonsUseCase
) {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping()
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
    fun getAllLessons(): ResponseEntity<ResponseData<List<LessonResponse>>>{
        val lessons = getAllLessonsUseCase.getAllLessons()
        return ResponseEntity.ok(LessonApiAdapter.toResponseList(lessons.data))
    }

    @GetMapping("/{id}")
    fun getLessonById(@PathVariable id:Long): ResponseEntity<ResponseData<LessonResponse>>{
        val lesson = getLessonByIdUseCase.getLessonById(id)
        return ResponseEntity.ok(LessonApiAdapter.toResponse(lesson))
    }

}