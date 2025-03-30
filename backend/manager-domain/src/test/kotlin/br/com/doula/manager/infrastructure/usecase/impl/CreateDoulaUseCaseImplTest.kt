package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.gateway.DoulaGateway
import br.com.doula.manager.infrastructure.model.DoulaModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import io.mockk.mockk
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class CreateDoulaUseCaseImplTest {
    private lateinit var createDoulaUseCase: CreateDoulaUseCaseImpl
    private lateinit var doulaGateway: DoulaGateway

    @BeforeEach
    fun setUp() {
        doulaGateway = mockk()
        createDoulaUseCase = CreateDoulaUseCaseImpl(doulaGateway)
    }

    @Test
    fun `should create doula successfully`() {
        val doulaModel = mockk<ResponseDataModel<DoulaModel>>()

        every { doulaGateway.createDoula(doulaModel) } returns doulaModel

        val result = createDoulaUseCase.createDoula(doulaModel)

        assertEquals(doulaModel, result)

        verify { doulaGateway.createDoula(doulaModel) }
    }
}