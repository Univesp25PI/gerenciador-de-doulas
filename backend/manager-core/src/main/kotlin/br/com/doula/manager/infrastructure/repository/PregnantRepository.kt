package br.com.doula.manager.infrastructure.repository

import br.com.doula.manager.infrastructure.entity.PregnantEntity
import org.springframework.data.jpa.repository.JpaRepository

interface PregnantRepository: JpaRepository<PregnantEntity, Long> {
}