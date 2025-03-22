package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.HelloRequest
import br.com.doula.manager.infrastructure.response.HelloResponse
import br.com.doula.manager.infrastructure.response.ResponseData

object HelloApiAdapter {
    fun toResponse(model: ResponseDataModel<HelloModel>): ResponseData<HelloResponse> =
        ResponseData(
            data = dataToResponse(model.data)
        )

    fun toModel(request: HelloRequest): ResponseDataModel<HelloModel> =
        ResponseDataModel(
            data = requestToModel(request)
        )

    private fun dataToResponse(model: HelloModel): HelloResponse =
        HelloResponse(
            id = model.id!!,
            helloList = model.helloList,
            helloString = model.helloString,
            type = model.type,
            createDate = model.createDate!!,
            updateDate = model.updateDate!!
        )

    private fun requestToModel(request: HelloRequest): HelloModel =
        HelloModel(
            helloList = request.helloList,
            helloString = request.helloString,
            type = request.type,
        )
}