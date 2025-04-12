package br.com.doula.manager.infrastructure.usecase

import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface CreateLessonUseCase {
    fun createLesson(model: ResponseDataModel<LessonDataModel>) : ResponseDataModel<LessonDataModel>
}