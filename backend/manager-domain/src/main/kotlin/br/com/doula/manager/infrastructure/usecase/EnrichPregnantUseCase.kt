package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.PregnantDataModel

interface EnrichPregnantUseCase {
    fun enrich(model: PregnantDataModel): PregnantDataModel
}