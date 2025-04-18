package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.DoulaCoreAdapter
import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.gateway.DoulaGateway
import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.repository.DoulaRepository
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service

@Service
class DoulaGatewayImpl(
    private val doulaRepository: DoulaRepository
): DoulaGateway {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    override fun createDoula(model: ResponseDataModel<DoulaDataModel>): ResponseDataModel<DoulaDataModel> {
        val entity = DoulaCoreAdapter.toEntity(model)
        try {
            val persistedEntity = doulaRepository.save(entity)
            return DoulaCoreAdapter.toModel(persistedEntity)
        } catch (ex: DataIntegrityViolationException) {
            log.error(
                "Failed to save Doula. ${entity.email} might already be registered.",
                ex
            )
            throw DefaultManagerException(ErrorCodeManagerEnum.DUPLICATED_DOULA)
        }
    }
    override fun getDoulaById(id: Long): ResponseDataModel<DoulaDataModel> {
        val entity = doulaRepository.findById(id)
            .orElseThrow {
                DefaultManagerException(ErrorCodeManagerEnum.INVALID_DOULA_REFERENCE)
            }
        return DoulaCoreAdapter.toModel(entity)
    }
}