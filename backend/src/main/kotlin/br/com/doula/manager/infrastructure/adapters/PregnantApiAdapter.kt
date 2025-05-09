package br.com.doula.manager.infrastructure.adapters


import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.PregnantRequest
import br.com.doula.manager.infrastructure.response.PregnantResponse
import br.com.doula.manager.infrastructure.response.ResponseData

object PregnantApiAdapter {
    fun toModel(request: PregnantRequest): ResponseDataModel<PregnantDataModel> =
        ResponseDataModel(
            data = requestToModel(request)
        )

    private fun requestToModel(request: PregnantRequest): PregnantDataModel =
        PregnantDataModel(
            idDoula = request.idDoula,
            name = request.name,
            age = request.age,
            phone = request.phone,
            email = request.email,
            firstPregnancy = request.firstPregnancy,
            lmpDate = request.lmpDate,
            comorbidities = request.comorbidities,
        )

    fun toResponseData(model: ResponseDataModel<PregnantDataModel>): ResponseData<PregnantResponse> =
        ResponseData(
            data = dataToResponse(model.data),
        )

    private fun dataToResponse(data: PregnantDataModel): PregnantResponse =
        PregnantResponse(
            id = data.id!!,
            idDoula = data.idDoula,
            name = data.name,
            age = data.age,
            firstPregnancy = data.firstPregnancy,
            lmpDate = data.lmpDate,
            comorbidities = data.comorbidities,
            birthForecast = data.birthForecast!!,
            pregnancyWeek = data.pregnancyWeek!!,
            createDate = data.createDate!!,
            updateDate = data.updateDate!!,
        )

    fun toResponseList(models: List<PregnantDataModel>): ResponseData<List<PregnantResponse>> =
        ResponseData(
            data = models.map {dataToResponse(it)}
        )
}