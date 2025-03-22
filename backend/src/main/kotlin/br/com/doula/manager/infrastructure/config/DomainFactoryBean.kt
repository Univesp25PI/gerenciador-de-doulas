package br.com.doula.manager.infrastructure.config

import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import org.springframework.beans.BeansException
import org.springframework.beans.factory.support.BeanDefinitionRegistry
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor
import org.springframework.stereotype.Component
import kotlin.jvm.Throws

@Component
class DomainFactoryBean: BeanDefinitionRegistryPostProcessor {

    @Throws(BeansException::class)
    override fun postProcessBeanDefinitionRegistry(registry: BeanDefinitionRegistry) {
        DomainFactoryBeanCreator.postProcessBeanDefinitionRegistry(registry, BeanTypeEnum.API)
    }
}