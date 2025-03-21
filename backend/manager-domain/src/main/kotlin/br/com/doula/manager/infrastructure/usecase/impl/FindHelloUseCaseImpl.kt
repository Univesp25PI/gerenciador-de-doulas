package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.HelloGateway
import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.FindHelloUseCase

@UseCase(beanType = BeanTypeEnum.API)
class FindHelloUseCaseImpl(
    private val helloGateway: HelloGateway
): FindHelloUseCase {
    override fun findHelloWorld(id: Long): ResponseDataModel<HelloModel> {
        return helloGateway.findHelloWorld(id)
    }
}