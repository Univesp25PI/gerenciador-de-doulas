package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.PregnantCoreAdapter
import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.repository.PregnantRepository
import br.com.doula.manager.utils.CoreTestPregnantUtils.PREGNANT_MODEL
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.dao.DataIntegrityViolationException
import kotlin.test.assertFailsWith

class PregnantGatewayImplTest {
    private lateinit var pregnantGateway: PregnantGatewayImpl
    private lateinit var pregnantRepository: PregnantRepository

    @BeforeEach
    fun setUp() {
        pregnantRepository = mockk()
        pregnantGateway = PregnantGatewayImpl(pregnantRepository)
    }

    @Test
    fun `should save pregnant and return the model when successful`() {
        val inputModel = PREGNANT_MODEL
        val entity = PregnantCoreAdapter.toEntity(inputModel)
        val savedEntity = entity.copy(id = 1L)

        every { pregnantRepository.save(entity) } returns savedEntity

        val result = pregnantGateway.createPregnant(inputModel)

        assertEquals(savedEntity.id, result.data.id)
        assertEquals(savedEntity.name, result.data.name)
        assertEquals(savedEntity.phone, result.data.phone)
        assertEquals(savedEntity.email, result.data.email)

        verify { pregnantRepository.save(entity) }
    }

    @Test
    fun `should throw DefaultManagerException when a pregnant already exists`() {
        val inputModel = PREGNANT_MODEL
        val entity = PregnantCoreAdapter.toEntity(inputModel)

        val rootCause = RuntimeException("duplicate_key")
        val dataException = DataIntegrityViolationException("pregnant_email_key", rootCause)

        every { pregnantRepository.save(entity) } throws dataException

        val exception = assertFailsWith<DefaultManagerException> {
            pregnantGateway.createPregnant(inputModel)
        }

        assertEquals(ErrorCodeManagerEnum.DUPLICATED_PREGNANT, exception.errorEnum)
        verify { pregnantRepository.save(entity) }
    }

    @Test
    fun `should throw DefaultManagerException when a doula does not exists`() {
        val inputModel = PREGNANT_MODEL
        val entity = PregnantCoreAdapter.toEntity(inputModel)

        val rootCause = RuntimeException("pregnant_doula_id_fkey")
        val dataException = DataIntegrityViolationException("doula_not_found", rootCause)

        every { pregnantRepository.save(entity) } throws dataException

        val exception = assertFailsWith<DefaultManagerException> {
            pregnantGateway.createPregnant(inputModel)
        }

        assertEquals(ErrorCodeManagerEnum.INVALID_DOULA_REFERENCE, exception.errorEnum)
        verify { pregnantRepository.save(entity) }
    }
}