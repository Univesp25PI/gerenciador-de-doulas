package br.com.doula.manager.infrastructure.repository

import br.com.doula.manager.infrastructure.entity.LessonEntity
import org.springframework.data.jpa.repository.JpaRepository

interface LessonRepository: JpaRepository<LessonEntity, Long> {
}