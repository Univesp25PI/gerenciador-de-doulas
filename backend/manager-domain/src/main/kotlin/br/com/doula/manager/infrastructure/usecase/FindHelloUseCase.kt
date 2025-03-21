package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface FindHelloUseCase {
    fun findHelloWorld(id: Long): ResponseDataModel<HelloModel>
}