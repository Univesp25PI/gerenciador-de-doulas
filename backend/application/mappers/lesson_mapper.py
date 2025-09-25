from domain.models.lesson_model import LessonModel
from infrastructure.db.entities.lesson import Lesson
from interface.api.schemas.lesson_schema import LessonRequest, LessonResponse
from interface.api.schemas.pregnant_schema import PregnantSummary
from domain.enums.lesson_type_enum import LessonTypeEnum


class LessonMapper:

    @staticmethod
    def request_to_entity(request: LessonRequest):
        return Lesson(
            pregnant_id=request.id_pregnant,
            class_number=request.class_number,
            class_type=request.class_type.name,
            class_date=request.class_date
        )

    @staticmethod
    def entity_to_response(entity: Lesson, pregnant: PregnantSummary):
        return LessonResponse(
            id=entity.id,
            pregnant=pregnant,
            class_number=entity.class_number,
            class_type=LessonTypeEnum.from_name(entity.class_type),
            class_date=entity.class_date,
            create_date=entity.create_date,
            update_date=entity.update_date,
        )

    @staticmethod
    def request_to_model(request: LessonRequest):
        return LessonModel.create(
            pregnant_id=request.id_pregnant,
            class_number=request.class_number,
            class_type=request.class_type,
            class_date=request.class_date
        )

    @staticmethod
    def model_to_response(model: LessonModel, pregnant: PregnantSummary):
        return LessonResponse(
            id=model.id,
            pregnant=pregnant,
            class_number=model.class_number,
            class_type=model.class_type,
            class_date=model.class_date,
            create_date=model.create_date,
            update_date=model.update_date,
        )