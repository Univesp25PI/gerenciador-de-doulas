package br.com.doula.manager.infrastructure.annotation

import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum

@Retention(AnnotationRetention.RUNTIME)
annotation class UseCase(
    val beanType: BeanTypeEnum = BeanTypeEnum.CORE
)
