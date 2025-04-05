package br.com.doula.manager.infrastructure.repository

import br.com.doula.manager.infrastructure.entity.DoulaEntity
import org.springframework.data.jpa.repository.JpaRepository

interface DoulaRepository: JpaRepository<DoulaEntity, Long> {
}