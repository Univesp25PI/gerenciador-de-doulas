package br.com.doula.manager.infrastructure.gateway

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface DoulaGateway {
    fun createDoula(model: ResponseDataModel<DoulaDataModel>): ResponseDataModel<DoulaDataModel>
    fun getDoulaById(id: Long): ResponseDataModel<DoulaDataModel>
    fun getAllDoulas(): ResponseDataModel<List<DoulaDataModel>>
}