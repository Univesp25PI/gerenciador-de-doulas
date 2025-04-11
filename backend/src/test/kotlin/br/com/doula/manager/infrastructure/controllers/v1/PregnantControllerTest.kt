package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import io.mockk.every
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import br.com.doula.manager.infrastructure.usecase.CreatePregnantUseCase
import br.com.doula.manager.utils.ApiTestPregnantUtils.PREGNANT_MODEL
import br.com.doula.manager.utils.ApiTestPregnantUtils.PREGNANT_REQUEST
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders

class PregnantControllerTest {

    private lateinit var mockMvc: MockMvc
    private lateinit var createUseCase: CreatePregnantUseCase
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        createUseCase = mockk()
        objectMapper = ObjectMapper()
            .registerModule(JavaTimeModule())
            .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)


        mockMvc = MockMvcBuilders
            .standaloneSetup(PregnantController(createUseCase))
            .build()
    }

    @Test
    fun `should return 200 when create pregnant`() {
        val requestJson = objectMapper.writeValueAsString(PREGNANT_REQUEST)

        every { createUseCase.createPregnant(any<ResponseDataModel<PregnantDataModel>>()) } returns PREGNANT_MODEL

        mockMvc.perform(
            post("/v1/pregnant")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.data.name").value(PREGNANT_MODEL.data.name))
            .andExpect(jsonPath("$.data.id").exists())
    }

    @Test
    fun `should return 400 when create doula with invalid request`() {
        val requestJson = objectMapper.writeValueAsString(
            PREGNANT_REQUEST.copy(phone = "invalid", email = "invalid")
        )

        every { createUseCase.createPregnant(any<ResponseDataModel<PregnantDataModel>>()) } returns PREGNANT_MODEL

        mockMvc.perform(
            post("/v1/pregnant")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
        )
            .andExpect(status().isBadRequest)
    }
}