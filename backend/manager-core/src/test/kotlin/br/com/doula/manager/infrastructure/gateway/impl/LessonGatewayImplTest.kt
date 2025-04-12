package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.LessonCoreAdapter
import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.repository.LessonRepository
import br.com.doula.manager.utils.CoreTestLessonUtils.LESSON_MODEL
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.dao.DataIntegrityViolationException
import kotlin.test.assertFailsWith

class LessonGatewayImplTest {
    private lateinit var lessonGateway: LessonGatewayImpl
    private lateinit var lessonRepository: LessonRepository

    @BeforeEach
    fun setUp() {
        lessonRepository = mockk()
        lessonGateway = LessonGatewayImpl(lessonRepository)
    }

    @Test
    fun `should save pregnant and return the model when successful`() {
        val inputModel = LESSON_MODEL
        val entity = LessonCoreAdapter.toEntity(inputModel)
        val savedEntity = entity.copy(id = 1L)

        every { lessonRepository.save(entity) } returns savedEntity

        val result = lessonGateway.createLesson(inputModel)

        assertEquals(savedEntity.id, result.data.id)
        assertEquals(savedEntity.classDate, result.data.classDate)
        assertEquals(savedEntity.classType, result.data.classType.name)
        assertEquals(savedEntity.classNumber, result.data.classNumber)


        verify { lessonRepository.save(entity) }
    }

    @Test
    fun `should throw DefaultManagerException when a pregnant does not exists`() {
        val inputModel = LESSON_MODEL
        val entity = LessonCoreAdapter.toEntity(inputModel)

        val rootCause = RuntimeException("class_pregnant_id_fkey")
        val dataException = DataIntegrityViolationException("invalid_pregnant", rootCause)

        every { lessonRepository.save(entity) } throws dataException

        val exception = assertFailsWith<DefaultManagerException> {
            lessonGateway.createLesson(inputModel)
        }

        assertEquals(ErrorCodeManagerEnum.INVALID_PREGNANT_REFERENCE, exception.errorEnum)
        verify { lessonRepository.save(entity) }
    }

}