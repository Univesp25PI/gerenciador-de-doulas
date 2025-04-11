package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.gateway.LessonGateway
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichLessonUseCase
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class CreateLessonUseCaseImplTest {
    private lateinit var useCase: CreateLessonUseCaseImpl
    private lateinit var enrichUseCase: EnrichLessonUseCase
    private lateinit var gateway: LessonGateway

    @BeforeEach
    fun setUp() {
        enrichUseCase = mockk()
        gateway = mockk()
        useCase = CreateLessonUseCaseImpl(gateway, enrichUseCase)
    }

    @Test
    fun `should create lesson successfully`() {
        val lessonDataModel = mockk<ResponseDataModel<LessonDataModel>>(relaxed = true)

        every { gateway.createLesson(lessonDataModel) } returns lessonDataModel
        every { enrichUseCase.enrich(lessonDataModel.data) } returns lessonDataModel.data

        val result = useCase.createLesson(lessonDataModel)

        assertEquals(lessonDataModel.data, result.data)

        verify { gateway.createLesson(lessonDataModel) }
        verify { enrichUseCase.enrich(lessonDataModel.data) }
    }
}