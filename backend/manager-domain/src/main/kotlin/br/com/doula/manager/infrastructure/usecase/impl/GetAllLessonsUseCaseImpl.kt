package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.gateway.LessonGateway
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichLessonUseCase
import br.com.doula.manager.infrastructure.usecase.GetAllLessonsUseCase

@UseCase (beanType = BeanTypeEnum.API)
class GetAllLessonsUseCaseImpl(
    private val lessonGateway: LessonGateway,
    private val enrichLessonUseCase: EnrichLessonUseCase): GetAllLessonsUseCase {
    override fun getAllLessons(): ResponseDataModel<List<LessonDataModel>>{
        val response: ResponseDataModel<List<LessonDataModel>> = lessonGateway.getAllLessons()
        val enrichedLessonsList = response.data
            .map{enrichLessonUseCase.enrich(it)}

        return ResponseDataModel(data = enrichedLessonsList)
            }
    }