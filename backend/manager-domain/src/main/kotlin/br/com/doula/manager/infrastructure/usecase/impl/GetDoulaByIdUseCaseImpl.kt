package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.DoulaGateway
import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.usecase.GetDoulaByIdUseCase

@UseCase(beanType = BeanTypeEnum.API)
class GetDoulaByIdUseCaseImpl(private val doulaGateway: DoulaGateway): GetDoulaByIdUseCase{
    override fun getDoulaById(id: Long): DoulaDataModel {
        return doulaGateway.getDoulaById(id)
    }
}