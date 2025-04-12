package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.PregnantUtils.calculateBirthForecast
import br.com.doula.manager.infrastructure.PregnantUtils.calculatePregnancyWeek
import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichPregnantUseCase
import java.time.LocalDate

@UseCase(beanType = BeanTypeEnum.API)
class EnrichPregnantUseCaseImpl: EnrichPregnantUseCase {
    override fun enrich(model: PregnantDataModel): PregnantDataModel =
        model.copy(
            pregnancyWeek = calculatePregnancyWeek(model.lmpDate, LocalDate.now()),
            birthForecast = calculateBirthForecast(model.lmpDate),
        )
}