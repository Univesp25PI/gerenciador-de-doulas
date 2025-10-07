from domain.enums.lesson_type_enum import LessonTypeEnum
from domain.models.doula_model import DoulaModel
from domain.models.lesson_model import LessonModel
from domain.models.pregnant_model import PregnantModel
from infrastructure.db.entities import Doula, Lesson


class LessonInfraMapper:

    @staticmethod
    def model_to_entity(model: LessonModel):
        return Lesson(
            pregnant_id=model.pregnant_id,
            class_number=model.class_number,
            class_type=model.class_type.name,
            class_date=model.class_date
        )

    @staticmethod
    def entity_to_model(entity: Lesson, pregnant: PregnantModel):
        return LessonModel.from_persistence(
            id=entity.id,
            pregnant=pregnant,
            pregnant_id=entity.pregnant_id,
            doula_id=pregnant.doula_id,
            class_number=entity.class_number,
            class_type=LessonTypeEnum.from_name(entity.class_type),
            class_date=entity.class_date,
            create_date=entity.create_date,
            update_date=entity.update_date,
        )