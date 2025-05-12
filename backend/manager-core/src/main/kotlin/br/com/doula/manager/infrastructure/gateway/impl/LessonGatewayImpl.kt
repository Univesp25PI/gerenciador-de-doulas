package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.LessonCoreAdapter
import br.com.doula.manager.infrastructure.enums.ErrorCodeManagerEnum
import br.com.doula.manager.infrastructure.exception.DefaultManagerException
import br.com.doula.manager.infrastructure.gateway.LessonGateway
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.repository.LessonRepository
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service

@Service
class LessonGatewayImpl(
    private val lessonRepository: LessonRepository
): LessonGateway {
    companion object {
        val log = LoggerFactory.getLogger(this::class.java)
    }

    override fun createLesson(model: ResponseDataModel<LessonDataModel>): ResponseDataModel<LessonDataModel> {
        val entity = LessonCoreAdapter.toEntity(model)

        try {
            val persistedEntity = lessonRepository.save(entity)
            return LessonCoreAdapter.toModel(persistedEntity, model.data.lmpDate)
        } catch (ex: DataIntegrityViolationException) {
            val rootMessage = ex.rootCause?.message.orEmpty()

            when {
                "class_pregnant_id_fkey" in rootMessage -> {
                    log.error(
                        "Failed to save Class. Pregnant with ID ${entity.pregnant!!.id} does not exist.", ex
                    )
                    throw DefaultManagerException(ErrorCodeManagerEnum.INVALID_PREGNANT_REFERENCE)
                }

                else -> {
                    log.error("Unknown database integrity error while saving Class.", ex)
                    throw DefaultManagerException(ErrorCodeManagerEnum.UNKNOWN_DATABASE_ERROR)
                }
            }
        } catch (ex: Exception) {
            log.error("Unknown database integrity error while saving Class.", ex)
            throw DefaultManagerException(ErrorCodeManagerEnum.UNKNOWN_DATABASE_ERROR)
        }
    }

    override fun getLessonById(id: Long): ResponseDataModel<LessonDataModel>{
        val entity = lessonRepository.findById(id)
            .orElseThrow{
                DefaultManagerException(ErrorCodeManagerEnum.INVALID_REQUEST)
            }
        return LessonCoreAdapter.toModel(entity, entity.pregnant!!.lmpDate)
    }

    override fun getAllLessons(): ResponseDataModel<List<LessonDataModel>> {
        val lessons = lessonRepository.findAll()
            .map{entity ->
                val lmp = entity.pregnant!!.lmpDate
                LessonCoreAdapter.entityToModel(entity, lmp)}
        return ResponseDataModel(lessons)
    }
}