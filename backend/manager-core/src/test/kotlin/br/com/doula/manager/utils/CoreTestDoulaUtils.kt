package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.model.DoulaDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_DATE
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_EMAIL
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_NAME
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_PHONE

object CoreTestDoulaUtils {

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
}