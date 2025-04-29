package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.PregnantGateway
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichPregnantUseCase
import br.com.doula.manager.infrastructure.usecase.GetPregnantByIdUseCase

@UseCase(beanType = BeanTypeEnum.API)
class GetPregnantByIdUseCaseImpl(private val pregnantGateway: PregnantGateway,
                                 private val enrichPregnantUseCase: EnrichPregnantUseCase):
    GetPregnantByIdUseCase {
    override fun getPregnantById(id: Long): ResponseDataModel<PregnantDataModel> {
        val pregnant = pregnantGateway.getPregnantById(id)
        val enrichedPregnant = enrichPregnantUseCase.enrich(pregnant.data)
        return ResponseDataModel(enrichedPregnant)
    }
}