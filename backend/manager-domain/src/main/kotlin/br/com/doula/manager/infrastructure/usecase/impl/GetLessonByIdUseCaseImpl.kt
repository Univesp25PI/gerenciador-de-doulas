package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.LessonGateway
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichLessonUseCase
import br.com.doula.manager.infrastructure.usecase.GetLessonByIdUseCase

@UseCase(beanType = BeanTypeEnum.API)
class GetLessonByIdUseCaseImpl(private val lessonGateway: LessonGateway,
                               private val enrichLessonUseCase: EnrichLessonUseCase): GetLessonByIdUseCase
{
    override fun getLessonById(id: Long): ResponseDataModel<LessonDataModel> {
        val lesson = lessonGateway.getLessonById(id)
        val enrichedLesson = enrichLessonUseCase.enrich(lesson.data)
        return ResponseDataModel(enrichedLesson)
    }
}
