package br.com.doula.manager.infrastructure.gateway.impl

import br.com.doula.manager.infrastructure.adapters.HelloCoreAdapter
import br.com.doula.manager.infrastructure.gateway.HelloGateway
import br.com.doula.manager.infrastructure.model.HelloModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.repository.HelloRepository
import org.springframework.stereotype.Service

@Service
class HelloGatewayImpl(
    private val helloRepository: HelloRepository
): HelloGateway {
    override fun findHelloWorld(id: Long): ResponseDataModel<HelloModel> {
        val entity = helloRepository.findById(id)
        val model = HelloCoreAdapter.toModel(entity.get())
        return model
    }

    override fun createHelloWorld(model: ResponseDataModel<HelloModel>): ResponseDataModel<HelloModel> {
        val entity = HelloCoreAdapter.toEntity(model)
        return HelloCoreAdapter.toModel(helloRepository.save(entity))
    }
}