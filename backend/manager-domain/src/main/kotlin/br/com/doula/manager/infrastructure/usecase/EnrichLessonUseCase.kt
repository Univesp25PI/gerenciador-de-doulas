package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.LessonDataModel

interface EnrichLessonUseCase {
    fun enrich(model: LessonDataModel): LessonDataModel
}