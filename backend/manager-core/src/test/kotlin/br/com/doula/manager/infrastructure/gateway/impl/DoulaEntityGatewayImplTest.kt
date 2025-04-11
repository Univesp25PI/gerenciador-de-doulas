package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.DoulaCoreAdapter
import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.repository.DoulaRepository
import br.com.doula.manager.utils.CoreTestDoulaUtils.DOULA_MODEL
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.dao.DataIntegrityViolationException
import kotlin.test.assertFailsWith

class DoulaEntityGatewayImplTest {
    private lateinit var doulaGateway: DoulaGatewayImpl
    private lateinit var doulaRepository: DoulaRepository

    @BeforeEach
    fun setUp() {
        doulaRepository = mockk()
        doulaGateway = DoulaGatewayImpl(doulaRepository)
    }

    @Test
    fun `should save doula and return the model when successful`() {
        val inputModel = DOULA_MODEL
        val entity = DoulaCoreAdapter.toEntity(inputModel)
        val savedEntity = entity.copy(id = 1L)

        every { doulaRepository.save(entity) } returns savedEntity

        val result = doulaGateway.createDoula(inputModel)

        assertEquals(savedEntity.id, result.data.id)
        assertEquals(savedEntity.name, result.data.name)
        assertEquals(savedEntity.phone, result.data.phone)
        assertEquals(savedEntity.email, result.data.email)

        verify { doulaRepository.save(entity) }
    }

    @Test
    fun `should throw DefaultManagerException when a doula already exists`() {
        val inputModel = DOULA_MODEL
        val entity = DoulaCoreAdapter.toEntity(inputModel)

        every { doulaRepository.save(entity) } throws DataIntegrityViolationException("Duplicate entry")

        val exception = assertFailsWith<DefaultManagerException> {
            doulaGateway.createDoula(inputModel)
        }

        assertEquals(ErrorCodeManagerEnum.DUPLICATED_DOULA, exception.errorEnum)
        verify { doulaRepository.save(entity) }
    }
}