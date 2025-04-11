package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.PregnantUtils.calculatePregnancyWeek
import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.model.LessonDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichLessonUseCase
import java.time.LocalDate

@UseCase(beanType = BeanTypeEnum.API)
class EnrichLessonUseCaseImpl : EnrichLessonUseCase {
    override fun enrich(model: LessonDataModel): LessonDataModel =
        model.copy(
            pregnantWeek = calculatePregnancyWeek(model.lmpDate, LocalDate.now())
        )
}