package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.entity.DoulaEntity
import br.com.doula.manager.infrastructure.entity.PregnantEntity
import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

object PregnantCoreAdapter {
    fun toEntity(model: ResponseDataModel<PregnantDataModel>): PregnantEntity =
        PregnantEntity(
            doula = DoulaEntity(id = model.data.idDoula),
            name = model.data.name,
            age = model.data.age,
            phone = model.data.phone,
            email = model.data.email,
            firstPregnancy = model.data.firstPregnancy,
            lmpDate = model.data.lmpDate,
            comorbidities = ComorbiditiesEnum.listToString(model.data.comorbidities),
        )

    fun toModel(entity: PregnantEntity): ResponseDataModel<PregnantDataModel> =
        ResponseDataModel(
            data = entityToModel(entity)
        )

    private fun entityToModel(entity: PregnantEntity): PregnantDataModel =
        PregnantDataModel(
            id = entity.id,
            name = entity.name!!,
            age = entity.age!!,
            phone = entity.phone!!,
            email = entity.email!!,
            firstPregnancy = entity.firstPregnancy!!,
            lmpDate = entity.lmpDate!!,
            idDoula = entity.doula?.id!!,
            comorbidities = ComorbiditiesEnum.stringToList(entity.comorbidities),
            updateDate = entity.updateDate,
            createDate = entity.createDate
        )
}