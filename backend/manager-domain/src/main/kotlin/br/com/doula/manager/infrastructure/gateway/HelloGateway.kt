package br.com.doula.manager.infrastructure.gateway

import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface HelloGateway {
    fun findHelloWorld(id: Long): ResponseDataModel<HelloModel>

    fun createHelloWorld(model: ResponseDataModel<HelloModel>): ResponseDataModel<HelloModel>
}