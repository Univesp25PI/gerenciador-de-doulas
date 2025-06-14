package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface GetAllPregnantsUseCase {
    fun getAllPregnants(): ResponseDataModel<List<PregnantDataModel>>
}