package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.LessonGateway
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.CreateLessonUseCase
import br.com.doula.manager.infrastructure.usecase.EnrichLessonUseCase

@UseCase(beanType = BeanTypeEnum.API)
class CreateLessonUseCaseImpl(
    private val lessonGateway: LessonGateway,
    private val enrichLessonUseCase: EnrichLessonUseCase
): CreateLessonUseCase {
    override fun createLesson(model: ResponseDataModel<LessonDataModel>): ResponseDataModel<LessonDataModel> {
        val persistedModel = lessonGateway.createLesson(model)
        val enrichedModel = enrichLessonUseCase.enrich(persistedModel.data)
        return ResponseDataModel(
            data = enrichedModel,
        )
    }
}