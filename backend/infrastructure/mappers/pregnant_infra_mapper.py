from domain.enums.comorbidities_enum import ComorbiditiesEnum
from domain.models.doula_model import DoulaModel
from domain.models.pregnant_model import PregnantModel
from infrastructure.db.entities import Pregnant


class PregnantInfraMapper:

    @staticmethod
    def model_to_entity(model: PregnantModel):
        return Pregnant(
            doula_id=model.doula_id,
            name=model.name,
            age=model.age,
            email=model.email,
            phone=model.phone,
            first_pregnancy=model.first_pregnancy,
            lmp_date=model.lmp_date,
            comorbidities=ComorbiditiesEnum.list_to_string(model.comorbidities)
        )

    @staticmethod
    def entity_to_model(entity: Pregnant, doula: DoulaModel):
        return PregnantModel.from_persistence(
            id=entity.id,
            doula=doula,
            name=entity.name,
            age=entity.age,
            email=entity.email,
            phone=entity.phone,
            first_pregnancy=entity.first_pregnancy,
            lmp_date=entity.lmp_date,
            comorbidities=ComorbiditiesEnum.string_to_list(entity.comorbidities),
            create_date=entity.create_date,
            update_date=entity.update_date,
        )

    @staticmethod
    def entity_to_base_model(entity: Pregnant):
        pregnant = PregnantModel.from_persistence(
            id=entity.id,
            doula_id=entity.doula_id,
            name=entity.name,
            age=entity.age,
            email=entity.email,
            phone=entity.phone,
            first_pregnancy=entity.first_pregnancy,
            lmp_date=entity.lmp_date,
            comorbidities=ComorbiditiesEnum.string_to_list(entity.comorbidities),
        )

        return pregnant
