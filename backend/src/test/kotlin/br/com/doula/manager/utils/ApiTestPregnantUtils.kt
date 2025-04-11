package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.enums.ComorbiditiesEnum
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.PregnantRequest
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_AGE
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_BIRH_DATE
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_DATE
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_EMAIL
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_NAME
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_PHONE
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_WEEK
import java.time.LocalDate
import java.time.LocalDateTime

object ApiTestPregnantUtils {
    val GENERIC_COMORBIDITIES = listOf(ComorbiditiesEnum.CARDIOPATHY, ComorbiditiesEnum.ANEMIA)

    val PREGNANT_MODEL = ResponseDataModel(
        data =
            PregnantDataModel(
                id = 1L,
                idDoula = 1L,
                name = GENERIC_NAME,
                email = GENERIC_EMAIL,
                phone = GENERIC_PHONE,
                age = GENERIC_AGE,
                comorbidities = GENERIC_COMORBIDITIES,
                lmpDate = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
                pregnancyWeek = GENERIC_WEEK,
                birthForecast = LocalDate.parse(GENERIC_BIRH_DATE),
                firstPregnancy = true,
                createDate = LocalDateTime.parse(GENERIC_DATE),
                updateDate = LocalDateTime.parse(GENERIC_DATE)
            )
    )

    val PREGNANT_REQUEST = PregnantRequest(
        idDoula = 1L,
        name = GENERIC_NAME,
        age = GENERIC_AGE,
        email = GENERIC_EMAIL,
        phone = GENERIC_PHONE,
        firstPregnancy = true,
        lmpDate = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
        comorbidities = GENERIC_COMORBIDITIES
    )
}