package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.PregnantUtils
import br.com.doula.manager.infrastructure.model.LessonDataModel
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class EnrichLessonUseCaseTest {
    private lateinit var useCase: EnrichLessonUseCaseImpl


    @BeforeEach
    fun setUp() {
        useCase = EnrichLessonUseCaseImpl()
        mockkObject(PregnantUtils)
    }

    @Test
    fun `should enrich lesson successfully`() {
        val lessonDataModel = mockk<LessonDataModel>(relaxed = true)

        every { PregnantUtils.calculatePregnancyWeek(any(), any()) } returns 1

        useCase.enrich(lessonDataModel)

        verify { PregnantUtils.calculatePregnancyWeek(any(), any()) }
    }
}