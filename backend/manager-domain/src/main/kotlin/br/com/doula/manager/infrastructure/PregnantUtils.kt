package br.com.doula.manager.infrastructure

import java.time.LocalDate
import java.time.temporal.ChronoUnit

object PregnantUtils {
    fun calculatePregnancyWeek(lmpDate: LocalDate?, targetDate: LocalDate): Int {
        val gestationalDays = ChronoUnit.DAYS.between(lmpDate, targetDate).toInt()

        return gestationalDays / 7
    }

    fun calculateBirthForecast(lmpDate: LocalDate): LocalDate = lmpDate.plusDays(280)
}