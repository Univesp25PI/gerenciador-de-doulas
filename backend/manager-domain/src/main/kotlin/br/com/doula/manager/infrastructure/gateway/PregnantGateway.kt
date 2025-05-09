package br.com.doula.manager.infrastructure.gateway

import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface PregnantGateway {
    fun createPregnant(model: ResponseDataModel<PregnantDataModel>): ResponseDataModel<PregnantDataModel>
    fun getAllPregnants(): ResponseDataModel<List<PregnantDataModel>>
    fun getPregnantById(id: Long): ResponseDataModel<PregnantDataModel>
}