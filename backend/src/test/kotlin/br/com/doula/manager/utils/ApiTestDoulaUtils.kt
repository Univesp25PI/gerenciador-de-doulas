package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.DoulaRequest

object ApiTestDoulaUtils {
    val DOULA_NAME = "Fuuko Izumo"
    val DOULA_EMAIL = "fuuko@gmail.com"
    val DOULA_PHONE = "11999999999"
    val GENERIC_DATE = "2025-03-30T14:25:36.123456"

    val DOULA_MODEL = ResponseDataModel(
        data =
            DoulaDataModel(
                id = 1L,
                name = DOULA_NAME,
                email = DOULA_EMAIL,
                phone = DOULA_PHONE,
                createDate = GENERIC_DATE,
                updateDate = GENERIC_DATE
            )
    )

    val DOULA_REQUEST = DoulaRequest(
        name = DOULA_NAME,
        email = DOULA_EMAIL,
        phone = DOULA_PHONE,
    )
}