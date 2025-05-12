package br.com.doula.manager.infrastructure.adapters

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.LessonRequest
import br.com.doula.manager.infrastructure.response.LessonResponse
import br.com.doula.manager.infrastructure.response.ResponseData

object LessonApiAdapter {
    fun toResponse(model: ResponseDataModel<LessonDataModel>): ResponseData<LessonResponse> =
        ResponseData(
            data = dataToResponse(model.data)
        )

    private fun dataToResponse(data: LessonDataModel): LessonResponse =
        LessonResponse(
            id = data.id!!,
            idPregnant = data.idPregnant,
            classDate = data.classDate,
            classType = data.classType,
            classNumber = data.classNumber,
            pregnantWeek = data.pregnantWeek!!,
            createDate = data.createDate!!,
            updateDate = data.updateDate!!
        )

    fun toModel(request: LessonRequest): ResponseDataModel<LessonDataModel> =
        ResponseDataModel(
            data = requestToModel(request)
        )

    private fun requestToModel(request: LessonRequest): LessonDataModel =
        LessonDataModel(
            idPregnant = request.idPregnant,
            classNumber = request.classNumber,
            classDate = request.classDate,
            classType = LessonTypeEnum.BIRTH_PHYSIOLOGY,
            lmpDate = request.lmpDate,
        )

    fun toResponseList(models: List<LessonDataModel>): ResponseData<List<LessonResponse>> =
        ResponseData(
            data = models.map{dataToResponse(it)}
        )
}