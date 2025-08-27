from datetime import date, timedelta

class PregnantUtils:

    @staticmethod
    def calculate_pregnancy_week(lmp_date: date | None, target_date: date) -> int:
        if lmp_date is None:
            return 0
        gestational_days = (target_date - lmp_date).days
        return gestational_days // 7

    @staticmethod
    def calculate_birth_forecast(lmp_date: date) -> date:
        return lmp_date + timedelta(days=280)