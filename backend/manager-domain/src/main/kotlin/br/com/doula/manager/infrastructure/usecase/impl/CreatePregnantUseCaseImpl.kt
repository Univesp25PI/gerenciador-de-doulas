package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.PregnantGateway
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.CreatePregnantUseCase
import br.com.doula.manager.infrastructure.usecase.EnrichPregnantUseCase

@UseCase(beanType = BeanTypeEnum.API)
class CreatePregnantUseCaseImpl(
    private val enrichPregnantUseCase: EnrichPregnantUseCase,
    private val pregnantGateway: PregnantGateway,
): CreatePregnantUseCase {
    override fun createPregnant(
        model: ResponseDataModel<PregnantDataModel>
    ): ResponseDataModel<PregnantDataModel> {
        val persistedModel = pregnantGateway.createPregnant(model)
        val enrichedModel = enrichPregnantModel(persistedModel)

        return enrichedModel
    }

    private fun enrichPregnantModel(
        model: ResponseDataModel<PregnantDataModel>
    ): ResponseDataModel<PregnantDataModel> {
        val enrichedModel = enrichPregnantUseCase.enrich(model.data)

        return ResponseDataModel(
            data = enrichedModel
        )
    }
}