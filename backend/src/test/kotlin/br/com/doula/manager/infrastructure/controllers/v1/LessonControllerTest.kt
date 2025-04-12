package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.CreateLessonUseCase
import io.mockk.every
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import br.com.doula.manager.utils.ApiTestLessonUtils.LESSON_MODEL
import br.com.doula.manager.utils.ApiTestLessonUtils.LESSON_REQUEST
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders

class LessonControllerTest {

    private lateinit var mockMvc: MockMvc
    private lateinit var createUseCase: CreateLessonUseCase
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        createUseCase = mockk()
        objectMapper = ObjectMapper()
            .registerModule(JavaTimeModule())
            .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)


        mockMvc = MockMvcBuilders
            .standaloneSetup(LessonController(createUseCase))
            .build()
    }

    @Test
    fun `should return 200 when create lesson`() {
        val requestJson = objectMapper.writeValueAsString(LESSON_REQUEST)

        every { createUseCase.createLesson(any<ResponseDataModel<LessonDataModel>>()) } returns LESSON_MODEL

        mockMvc.perform(
            post("/v1/lesson")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.data.classType").value(LESSON_MODEL.data.classType.name))
            .andExpect(jsonPath("$.data.id").exists())
    }

    @Test
    fun `should return 400 when create lesson with invalid request`() {
        val requestJson = objectMapper.writeValueAsString(
            LESSON_REQUEST.copy(classNumber = 0)
        )

        every { createUseCase.createLesson(any<ResponseDataModel<LessonDataModel>>()) } returns LESSON_MODEL

        mockMvc.perform(
            post("/v1/lesson")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
        )
            .andExpect(status().isBadRequest)
    }
}