package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.PregnantCoreAdapter
import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.gateway.PregnantGateway
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.repository.PregnantRepository
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service

@Service
class PregnantGatewayImpl(
    private val pregnantRepository: PregnantRepository
): PregnantGateway {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    override fun createPregnant(model: ResponseDataModel<PregnantDataModel>): ResponseDataModel<PregnantDataModel> {
        val entity = PregnantCoreAdapter.toEntity(model)

        try {
            val persistedEntity = pregnantRepository.save(entity)
            return PregnantCoreAdapter.toModel(persistedEntity)
        } catch (ex: DataIntegrityViolationException) {
            val rootMessage = ex.rootCause?.message.orEmpty()

            when {
                "pregnant_email_key" in rootMessage -> {
                    log.error(
                        "Failed to save Pregnant. Email ${entity.email} already exists.", ex
                    )
                    throw DefaultManagerException(ErrorCodeManagerEnum.DUPLICATED_PREGNANT)
                }

                "pregnant_doula_id_fkey" in rootMessage -> {
                    log.error(
                        "Failed to save Pregnant. Doula with ID ${entity.doula?.id} does not exist.", ex
                    )
                    throw DefaultManagerException(ErrorCodeManagerEnum.INVALID_DOULA_REFERENCE)
                }

                else -> {
                    log.error("Unknown database integrity error while saving Pregnant.", ex)
                    throw DefaultManagerException(ErrorCodeManagerEnum.UNKNOWN_DATABASE_ERROR)
                }
            }
        } catch (ex: Exception) {
            log.error("Unknown database integrity error while saving Pregnant.", ex)
            throw DefaultManagerException(ErrorCodeManagerEnum.UNKNOWN_DATABASE_ERROR)
        }
    }

    override fun getPregnantById(id: Long): ResponseDataModel<PregnantDataModel> {
        val entity = pregnantRepository.findById(id)
            .orElseThrow {
                DefaultManagerException(ErrorCodeManagerEnum.INVALID_PREGNANT_REFERENCE)
            }
        return PregnantCoreAdapter.toModel(entity)
    }

    override fun getAllPregnants(): ResponseDataModel<List<PregnantDataModel>> {
        val pregnants = pregnantRepository.findAll()
            .map{PregnantCoreAdapter.entityToModel(it)}
        return ResponseDataModel(pregnants)
    }
}