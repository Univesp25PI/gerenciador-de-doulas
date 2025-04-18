package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.model.DoulaDataModel

interface GetDoulaByIdUseCase{
    fun getDoulaById(id: Long): ResponseDataModel<DoulaDataModel>
}