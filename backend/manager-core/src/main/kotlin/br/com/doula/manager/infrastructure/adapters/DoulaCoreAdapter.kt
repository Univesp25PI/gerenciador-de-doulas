package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.entity.DoulaEntity
import br.com.doula.manager.infrastructure.model.DoulaModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import java.time.LocalDateTime

object DoulaCoreAdapter {
    fun toModel(entity: DoulaEntity): ResponseDataModel<DoulaModel> =
        ResponseDataModel(
            data = entityToModel(entity)
        )

    fun toEntity(model: ResponseDataModel<DoulaModel>): DoulaEntity =
        DoulaEntity(
            id = model.data.id,
            name = model.data.name,
            phone = model.data.phone,
            email = model.data.email,
            createDate = model.data.createDate?.let { LocalDateTime.parse(it) } ?: LocalDateTime.now(),
            updateDate = model.data.updateDate?.let { LocalDateTime.parse(it) } ?: LocalDateTime.now()
        )

    private fun entityToModel(entity: DoulaEntity): DoulaModel =
        DoulaModel(
            id = entity.id,
            name = entity.name!!,
            phone = entity.phone!!,
            email = entity.email!!,
            createDate = entity.createDate.toString(),
            updateDate = entity.updateDate.toString()
        )


}