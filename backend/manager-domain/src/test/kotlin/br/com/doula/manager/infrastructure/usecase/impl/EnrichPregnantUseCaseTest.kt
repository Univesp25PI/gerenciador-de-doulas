package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.PregnantUtils
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class EnrichPregnantUseCaseTest {
    private lateinit var useCase: EnrichPregnantUseCaseImpl


    @BeforeEach
    fun setUp() {
        useCase = EnrichPregnantUseCaseImpl()
        mockkObject(PregnantUtils)
    }

    @Test
    fun `should enrich lesson successfully`() {
        val pregnantDataModel = mockk<PregnantDataModel>(relaxed = true)

        every { PregnantUtils.calculatePregnancyWeek(any(), any()) } returns 1

        useCase.enrich(pregnantDataModel)

        verify { PregnantUtils.calculatePregnancyWeek(any(), any()) }
        verify { PregnantUtils.calculateBirthForecast(any()) }
    }
}