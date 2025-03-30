package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.DoulaModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface CreateDoulaUseCase {

    fun createDoula(model: ResponseDataModel<DoulaModel>): ResponseDataModel<DoulaModel>
}