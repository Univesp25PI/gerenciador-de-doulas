package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.HelloGateway
import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.CreateHelloUseCase

@UseCase(beanType = BeanTypeEnum.API)
class CreateHelloUseCaseImpl(
    private val helloGateway: HelloGateway
): CreateHelloUseCase {
    override fun createHelloWorld(model: ResponseDataModel<HelloModel>): ResponseDataModel<HelloModel> {
        return helloGateway.createHelloWorld(model)
    }
}