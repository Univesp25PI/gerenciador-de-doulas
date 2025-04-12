package br.com.doula.manager.utils

import br.com.doula.manager.infrastructure.enums.LessonTypeEnum
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.model.ResponseDataModel
import br.com.doula.manager.infrastructure.request.LessonRequest
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_DATE
import br.com.doula.manager.utils.ApiTestUtils.GENERIC_WEEK

import java.time.LocalDateTime

object ApiTestLessonUtils {

    val LESSON_MODEL = ResponseDataModel(
        data =
            LessonDataModel(
                id = 1L,
                idPregnant = 1L,
                classNumber = 1,
                pregnantWeek = GENERIC_WEEK,
                classType = LessonTypeEnum.BIRTH_PHYSIOLOGY,
                classDate = LocalDateTime.parse(GENERIC_DATE),
                lmpDate = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
                createDate = LocalDateTime.parse(GENERIC_DATE),
                updateDate = LocalDateTime.parse(GENERIC_DATE)
            )
    )

    val LESSON_REQUEST = LessonRequest(
        idPregnant = 1L,
        classNumber = 1,
        classType = LessonTypeEnum.BIRTH_PHYSIOLOGY,
        classDate = LocalDateTime.now().plusDays(1),
        lmpDate = LocalDateTime.parse(GENERIC_DATE).toLocalDate(),
    )
}