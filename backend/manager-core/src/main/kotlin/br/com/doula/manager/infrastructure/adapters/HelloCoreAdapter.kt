package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.entity.HelloEntity
import br.com.doula.manager.infrastructure.enums.HelloTypeEnum
import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import java.time.LocalDateTime

object HelloCoreAdapter {
    fun toModel(entity: HelloEntity): ResponseDataModel<HelloModel> =
        ResponseDataModel(
            data = entityToModel(entity)
        )

    fun toEntity(model: ResponseDataModel<HelloModel>): HelloEntity =
        HelloEntity(
            id = model.data.id,
            helloList = model.data.getHelloListFromList(),
            helloString = model.data.helloString,
            type = model.data.type.name,
            createDate = model.data.createDate?.let { LocalDateTime.parse(it) } ?: LocalDateTime.now(),
            updateDate = model.data.updateDate?.let { LocalDateTime.parse(it) } ?: LocalDateTime.now()
        )

    private fun entityToModel(entity: HelloEntity): HelloModel =
        HelloModel(
            id = entity.id,
            helloList = entity.getHelloArrayAsList(),
            helloString = entity.helloString!!,
            type = HelloTypeEnum.valueOf(entity.type!!),
            createDate = entity.createDate.toString(),
            updateDate = entity.updateDate.toString()
        )


}