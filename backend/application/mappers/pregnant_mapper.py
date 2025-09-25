from datetime import date

from domain.models.pregnant_model import PregnantModel
from interface.api.schemas.pregnant_schema import PregnantRequest, PregnantResponse, PregnantSummary
from interface.api.schemas.doula_schema import DoulaSummary
from infrastructure.db.entities.pregnant import Pregnant
from domain.enums.comorbidities_enum import ComorbiditiesEnum
from domain.utils.pregnant_utils import PregnantUtils


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

    @staticmethod
    def request_to_model(request: PregnantRequest):
        return PregnantModel.create(
            doula_id=request.id_doula,
            name=request.name,
            age=request.age,
            email=request.email,
            phone=request.phone,
            first_pregnancy=request.first_pregnancy,
            lmp_date_input=request.lmp_date,
            comorbidities=request.comorbidities
        )

    @staticmethod
    def model_to_response(model: PregnantModel, doula: DoulaSummary):
        return PregnantResponse(
            id=model.id,
            doula=doula,
            name=model.name,
            age=model.age,
            email=model.email,
            phone=model.phone,
            first_pregnancy=model.first_pregnancy,
            lmp_date=model.lmp_date,
            comorbidities=model.comorbidities,
            pregnancy_week=PregnantUtils.calculate_pregnancy_week(model.lmp_date, date.today()),
            birth_forecast=PregnantUtils.calculate_birth_forecast(model.lmp_date),
            create_date=model.create_date,
            update_date=model.update_date,
        )

    @staticmethod
    def model_to_summary(pregnant: PregnantModel):
        return PregnantSummary(
            id=pregnant.id,
            name=pregnant.name,
            email=pregnant.email,
            phone=pregnant.phone,
            first_pregnancy=pregnant.first_pregnancy,
            lmp_date=pregnant.lmp_date,
            comorbidities=pregnant.comorbidities,
            pregnancy_week=PregnantUtils.calculate_pregnancy_week(pregnant.lmp_date, date.today()),
            birth_forecast=PregnantUtils.calculate_birth_forecast(pregnant.lmp_date),
        )