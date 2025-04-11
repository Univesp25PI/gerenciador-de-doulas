package br.com.doula.manager.infrastructure.controllers.v1

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.utils.ApiTestDoulaUtils.DOULA_MODEL
import br.com.doula.manager.utils.ApiTestDoulaUtils.DOULA_REQUEST
import io.mockk.every
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import br.com.doula.manager.infrastructure.usecase.CreateDoulaUseCase
import com.fasterxml.jackson.databind.ObjectMapper
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders

class DoulaEntityControllerTest {

    private lateinit var mockMvc: MockMvc
    private lateinit var createUseCase: CreateDoulaUseCase
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        createUseCase = mockk()
        objectMapper = ObjectMapper()

        mockMvc = MockMvcBuilders
            .standaloneSetup(DoulaController(createUseCase))
            .build()
    }

    @Test
    fun `should return 200 when create doula`() {
        val requestJson = objectMapper.writeValueAsString(DOULA_REQUEST)

        every { createUseCase.createDoula(any<ResponseDataModel<DoulaDataModel>>()) } returns DOULA_MODEL

        mockMvc.perform(
            post("/v1/doula")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.data.name").value(DOULA_MODEL.data.name))
            .andExpect(jsonPath("$.data.id").exists())
    }

    @Test
    fun `should return 400 when create doula with invalid request`() {
        val requestJson = objectMapper.writeValueAsString(
            DOULA_REQUEST.copy(phone = "invalid", email = "invalid")
        )

        every { createUseCase.createDoula(any<ResponseDataModel<DoulaDataModel>>()) } returns DOULA_MODEL

        mockMvc.perform(
            post("/v1/doula")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
        )
            .andExpect(status().isBadRequest)
    }
}