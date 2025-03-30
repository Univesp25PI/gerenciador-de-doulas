package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.DoulaGateway
import br.com.doula.manager.infrastructure.model.DoulaModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.CreateDoulaUseCase

@UseCase(beanType = BeanTypeEnum.API)
class CreateDoulaUseCaseImpl(
    private val doulaGateway: DoulaGateway
): CreateDoulaUseCase {
    override fun createDoula(model: ResponseDataModel<DoulaModel>): ResponseDataModel<DoulaModel> {
        return doulaGateway.createDoula(model)
    }
}