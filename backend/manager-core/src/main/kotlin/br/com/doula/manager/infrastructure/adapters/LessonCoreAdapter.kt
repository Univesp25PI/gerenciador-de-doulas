package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.entity.LessonEntity
import br.com.doula.manager.infrastructure.entity.PregnantEntity
import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import java.time.LocalDate

object LessonCoreAdapter {
    fun toEntity(model: ResponseDataModel<LessonDataModel>): LessonEntity =
        LessonEntity(
            pregnant = PregnantEntity(id = model.data.idPregnant),
            classNumber = model.data.classNumber,
            classType = model.data.classType.toString(),
            classDate = model.data.classDate,
        )

    fun toModel(entity: LessonEntity, lmpDate: LocalDate?): ResponseDataModel<LessonDataModel> =
        ResponseDataModel(
            data = entityToModel(entity, lmpDate)
        )

    fun entityToModel(entity: LessonEntity, lmpDate: LocalDate?): LessonDataModel =
        LessonDataModel(
            id = entity.id,
            idPregnant = entity.id,
            classNumber = entity.classNumber,
            classType = LessonTypeEnum.valueOf(entity.classType),
            classDate = entity.classDate,
            lmpDate = lmpDate,
            updateDate = entity.updateDate,
            createDate = entity.createDate
        )
    
}