package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.entity.DoulaEntity
import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import java.time.LocalDateTime

object DoulaCoreAdapter {
    fun toModel(entity: DoulaEntity): ResponseDataModel<DoulaDataModel> =
        ResponseDataModel(
            data = entityToModel(entity)
        )

    fun toEntity(model: ResponseDataModel<DoulaDataModel>): DoulaEntity =
        DoulaEntity(
            id = model.data.id,
            name = model.data.name,
            phone = model.data.phone,
            email = model.data.email,
            createDate = model.data.createDate?.let { LocalDateTime.parse(it) } ?: LocalDateTime.now(),
            updateDate = model.data.updateDate?.let { LocalDateTime.parse(it) } ?: LocalDateTime.now()
        )

    private fun entityToModel(entity: DoulaEntity): DoulaDataModel =
        DoulaDataModel(
            id = entity.id,
            name = entity.name!!,
            phone = entity.phone!!,
            email = entity.email!!,
            createDate = entity.createDate.toString(),
            updateDate = entity.updateDate.toString()
        )


}