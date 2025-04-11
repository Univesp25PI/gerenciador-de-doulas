package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.gateway.PregnantGateway
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichPregnantUseCase
import io.mockk.mockk
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class CreatePregnantUseCaseImplTest {
    private lateinit var useCase: CreatePregnantUseCaseImpl
    private lateinit var enrichUseCase: EnrichPregnantUseCase
    private lateinit var gateway: PregnantGateway

    @BeforeEach
    fun setUp() {
        enrichUseCase = mockk()
        gateway = mockk()
        useCase = CreatePregnantUseCaseImpl(enrichUseCase, gateway)
    }

    @Test
    fun `should create pregnant successfully`() {
        val pregnantDataModel = mockk<ResponseDataModel<PregnantDataModel>>(relaxed = true)

        every { gateway.createPregnant(pregnantDataModel) } returns pregnantDataModel
        every { enrichUseCase.enrich(pregnantDataModel.data) } returns pregnantDataModel.data

        val result = useCase.createPregnant(pregnantDataModel)

        assertEquals(pregnantDataModel.data, result.data)

        verify { gateway.createPregnant(pregnantDataModel) }
        verify { enrichUseCase.enrich(pregnantDataModel.data) }
    }
}