package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_AGE
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_DATE
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_EMAIL
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_NAME
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_PHONE
import java.time.LocalDateTime

object CoreTestPregnantUtils {

    val PREGNANT_MODEL = ResponseDataModel(
        data =
            PregnantDataModel(
                id = 1L,
                idDoula = 1L,
                name = GENERIC_NAME,
                email = GENERIC_EMAIL,
                phone = GENERIC_PHONE,
                age = GENERIC_AGE,
                comorbidities = emptyList(),
                lmpDate = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
                birthForecast = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
                firstPregnancy = true,
                pregnancyWeek = 2,
                createDate = LocalDateTime.parse(GENERIC_DATE),
                updateDate = LocalDateTime.parse(GENERIC_DATE)
            )
    )
}