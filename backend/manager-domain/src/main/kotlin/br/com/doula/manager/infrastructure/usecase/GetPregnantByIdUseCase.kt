package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface GetPregnantByIdUseCase{
    fun getPregnantById(id: Long): ResponseDataModel<PregnantDataModel>
}