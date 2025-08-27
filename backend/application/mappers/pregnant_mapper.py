from datetime import date

from interface.api.schemas.pregnant_schema import PregnantRequest, PregnantResponse, PregnantSummary
from interface.api.schemas.doula_schema import DoulaSummary
from infrastructure.db.entities.pregnant import Pregnant
from domain.enums.comorbidities_enum import ComorbiditiesEnum
from utils.pregnant_utils import PregnantUtils


class PregnantMapper:

    @staticmethod
    def request_to_entity(request: PregnantRequest):
        return Pregnant(
            doula_id=request.id_doula,
            name=request.name,
            age=request.age,
            email=request.email,
            phone=request.phone,
            first_pregnancy=request.first_pregnancy,
            lmp_date=request.lmp_date,
            comorbidities=ComorbiditiesEnum.list_to_string(request.comorbidities)
        )

    @staticmethod
    def entity_to_response(entity: Pregnant, doula: DoulaSummary):
        return PregnantResponse(
            id=entity.id,
            doula=doula,
            name=entity.name,
            age=entity.age,
            email=entity.email,
            phone=entity.phone,
            first_pregnancy=entity.first_pregnancy,
            lmp_date=entity.lmp_date,
            comorbidities=ComorbiditiesEnum.string_to_list(entity.comorbidities),
            pregnancy_week=PregnantUtils.calculate_pregnancy_week(entity.lmp_date, date.today()),
            birth_forecast=PregnantUtils.calculate_birth_forecast(entity.lmp_date),
            create_date=entity.create_date,
            update_date=entity.update_date,
        )

    @staticmethod
    def entity_to_summary(pregnant: Pregnant):
        return PregnantSummary(
            id=pregnant.id,
            name=pregnant.name,
            email=pregnant.email,
            phone=pregnant.phone,
            first_pregnancy=pregnant.first_pregnancy,
            lmp_date=pregnant.lmp_date,
            comorbidities=ComorbiditiesEnum.string_to_list(pregnant.comorbidities),
            pregnancy_week=PregnantUtils.calculate_pregnancy_week(pregnant.lmp_date, date.today()),
            birth_forecast=PregnantUtils.calculate_birth_forecast(pregnant.lmp_date),
        )