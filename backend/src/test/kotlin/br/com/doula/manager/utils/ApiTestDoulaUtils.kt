package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.DoulaRequest
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_DATE
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_EMAIL
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_NAME
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_PHONE

object ApiTestDoulaUtils {
    val DOULA_MODEL = ResponseDataModel(
        data =
            DoulaDataModel(
                id = 1L,
                name = GENERIC_NAME,
                email = GENERIC_EMAIL,
                phone = GENERIC_PHONE,
                createDate = GENERIC_DATE,
                updateDate = GENERIC_DATE
            )
    )

    val DOULA_REQUEST = DoulaRequest(
        name = GENERIC_NAME,
        email = GENERIC_EMAIL,
        phone = GENERIC_PHONE,
    )
}