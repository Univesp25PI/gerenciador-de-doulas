package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.DoulaGateway
import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.GetAllDoulasUseCase

@UseCase(beanType = BeanTypeEnum.API)
class GetAllDoulasUseCaseImpl(
    private val doulaGateway: DoulaGateway,
): GetAllDoulasUseCase {
    override fun getAllDoulas(): ResponseDataModel<List<DoulaDataModel>>{
        return doulaGateway.getAllDoulas()
    }
}