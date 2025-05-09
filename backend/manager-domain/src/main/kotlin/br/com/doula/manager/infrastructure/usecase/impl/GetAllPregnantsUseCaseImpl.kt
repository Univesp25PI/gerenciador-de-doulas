package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.PregnantGateway
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichPregnantUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllPregnantsUseCase

@UseCase(beanType = BeanTypeEnum.API)
class GetAllPregnantsUseCaseImpl(
    private val pregnantGateway: PregnantGateway,
    private val enrichPregnantUseCase: EnrichPregnantUseCase): GetAllPregnantsUseCase {
    override fun getAllPregnants(): ResponseDataModel<List<PregnantDataModel>> {
        val response: ResponseDataModel<List<PregnantDataModel>> = pregnantGateway.getAllPregnants()
        val enrichedPregnantList = response.data
                .map{enrichPregnantUseCase.enrich(it)}

        return ResponseDataModel(data = enrichedPregnantList)
    }

}