package br.com.doula.manager.infrastructure.config

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import org.springframework.beans.BeansException
import org.springframework.beans.factory.config.BeanDefinition
import org.springframework.beans.factory.support.BeanDefinitionRegistry
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider
import org.springframework.core.type.filter.AnnotationTypeFilter
import org.springframework.stereotype.Component
import java.util.*
import kotlin.jvm.Throws

@Component
object DomainFactoryBeanCreator {
    @Throws(BeansException::class)
    fun postProcessBeanDefinitionRegistry(
        registry: BeanDefinitionRegistry,
        beanType: BeanTypeEnum
    ) {
        val scanner: ClassPathScanningCandidateComponentProvider = createComponentScanner()
        val definitions: Set<BeanDefinition> = findCandidateComponents(scanner)
        registerBeanDefinitions(registry, definitions, beanType)
    }

    private fun createComponentScanner(): ClassPathScanningCandidateComponentProvider {
        val scanner = ClassPathScanningCandidateComponentProvider(false)
        scanner.addIncludeFilter(AnnotationTypeFilter(UseCase::class.java))

        return scanner
    }

    private fun findCandidateComponents(scanner: ClassPathScanningCandidateComponentProvider): Set<BeanDefinition> {
        val candidateComponents =
            scanner.findCandidateComponents("br.com.doula.manager.infrastructure.usecase")
        candidateComponents.addAll(
            scanner.findCandidateComponents("br.com.doula.manager.infrastructure.usecase.impl")
        )

        return candidateComponents
    }


    private fun registerBeanDefinitions(
        registry: BeanDefinitionRegistry,
        definitions: Set<BeanDefinition>,
        beanType: BeanTypeEnum
    ) {
        definitions
            .stream()
            .filter { beanDefinition: BeanDefinition -> isMatchingBeanType(beanDefinition, beanType)}
            .forEach { beanDefinition: BeanDefinition -> registerBeanDefinition(registry, beanDefinition) }
    }

    private fun isMatchingBeanType(
        beanDefinition: BeanDefinition,
        beanType: BeanTypeEnum
    ): Boolean {
        try {
            val beanClass = Class.forName(beanDefinition.beanClassName)
            val annotation: UseCase = beanClass.getAnnotation(UseCase::class.java)
            return annotation.beanType == BeanTypeEnum.CORE || annotation.beanType == beanType
       } catch (e: ClassNotFoundException) {
           return false
       }
    }

    private fun registerBeanDefinition(
        registry: BeanDefinitionRegistry,
        beanDefinition: BeanDefinition
    ) {
        registry.registerBeanDefinition(
            Objects.requireNonNull<String>(beanDefinition.beanClassName),
            beanDefinition
        )
    }

}