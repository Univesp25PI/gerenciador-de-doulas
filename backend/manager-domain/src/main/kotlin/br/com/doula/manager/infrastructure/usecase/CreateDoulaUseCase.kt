package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface CreateDoulaUseCase {

    fun createDoula(model: ResponseDataModel<DoulaDataModel>): ResponseDataModel<DoulaDataModel>
}