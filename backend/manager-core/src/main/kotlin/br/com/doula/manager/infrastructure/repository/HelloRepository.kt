package br.com.doula.manager.infrastructure.repository

import br.com.doula.manager.infrastructure.entity.HelloEntity
import org.springframework.data.jpa.repository.JpaRepository

interface HelloRepository: JpaRepository<HelloEntity, Long> {
}