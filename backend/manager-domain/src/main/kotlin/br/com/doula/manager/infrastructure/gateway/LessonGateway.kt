package br.com.doula.manager.infrastructure.gateway

import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel

interface LessonGateway {
    fun createLesson(model: ResponseDataModel<LessonDataModel>): ResponseDataModel<LessonDataModel>
    fun getLessonById(id: Long): ResponseDataModel<LessonDataModel>
    fun getAllLessons(): ResponseDataModel<List<LessonDataModel>>
}