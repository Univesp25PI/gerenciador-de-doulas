package br.com.doula.manager.infrastructure.usecase.impl

import br.com.doula.manager.infrastructure.annotation.UseCase
import br.com.doula.manager.infrastructure.annotation.enums.BeanTypeEnum
import br.com.doula.manager.infrastructure.model.PregnantDataModel
import br.com.doula.manager.infrastructure.usecase.EnrichPregnantUseCase
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@UseCase(beanType = BeanTypeEnum.API)
class EnrichPregnantUseCaseImpl: EnrichPregnantUseCase {
    override fun enrich(model: PregnantDataModel): PregnantDataModel =
        model.copy(
            pregnancyWeek = calculatePregnancyWeek(model.lmpDate),
            birthForecast = calculateBirthForecast(model.lmpDate),
        )

    private fun calculatePregnancyWeek(lmpDate: LocalDate): Int {
        val today = LocalDate.now()
        val gestationalDays = ChronoUnit.DAYS.between(lmpDate, today).toInt()

        return gestationalDays / 7
    }

    private fun calculateBirthForecast(lmpDate: LocalDate): LocalDate = lmpDate.plusDays(280)

}