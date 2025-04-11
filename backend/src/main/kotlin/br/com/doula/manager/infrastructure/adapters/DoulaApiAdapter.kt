package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.DoulaRequest
import br.com.doula.manager.infrastructure.response.DoulaResponse
import br.com.doula.manager.infrastructure.response.ResponseData

object DoulaApiAdapter {
    fun toResponse(model: ResponseDataModel<DoulaDataModel>): ResponseData<DoulaResponse> =
        ResponseData(
            data = dataToResponse(model.data)
        )

    fun toModel(request: DoulaRequest): ResponseDataModel<DoulaDataModel> =
        ResponseDataModel(
            data = requestToModel(request)
        )

    private fun dataToResponse(model: DoulaDataModel): DoulaResponse =
        DoulaResponse(
            id = model.id!!,
            name = model.name,
            phone = model.phone,
            email = model.email,
            createDate = model.createDate!!,
            updateDate = model.updateDate!!
        )

    private fun requestToModel(request: DoulaRequest): DoulaDataModel =
        DoulaDataModel(
            name = request.name,
            phone = request.phone,
            email = request.email,
        )
}