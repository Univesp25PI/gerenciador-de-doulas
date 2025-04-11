package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_DATE
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_NUMBER
import br.com.doula.manager.utils.CoreTestUtils.GENERIC_WEEK
import java.time.LocalDateTime

object CoreTestLessonUtils {

    val LESSON_MODEL = ResponseDataModel(
        data =
            LessonDataModel(
                id = 1L,
                idPregnant = 1L,
                classDate = LocalDateTime.parse(GENERIC_DATE),
                classNumber = GENERIC_NUMBER,
                classType = LessonTypeEnum.BIRTH_PHYSIOLOGY,
                pregnantWeek = GENERIC_WEEK,
                lmpDate = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
                createDate = LocalDateTime.parse(GENERIC_DATE),
                updateDate = LocalDateTime.parse(GENERIC_DATE)
            )
    )
}