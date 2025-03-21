package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface CreateHelloUseCase {

    fun createHelloWorld(model: ResponseDataModel<HelloModel>): ResponseDataModel<HelloModel>
}