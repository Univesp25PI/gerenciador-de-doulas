package br.com.doula.manager.infrastructure.gateway

import br.com.doula.manager.infrastructure.model.DoulaModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface DoulaGateway {
    fun createDoula(model: ResponseDataModel<DoulaModel>): ResponseDataModel<DoulaModel>
}