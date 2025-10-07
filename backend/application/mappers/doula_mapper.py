from domain.models.doula_model import DoulaModel
from infrastructure.db.entities.doula import Doula
from infrastructure.security.hashing import hash_password
from interface.api.schemas.doula_schema import DoulaRequest, DoulaSummary, DoulaResponse


class DoulaMapper:
    @staticmethod
    def entity_to_summary(doula: Doula):
        return DoulaSummary(
            id=doula.id,
            name=doula.name,
            email=doula.email
        )

    @staticmethod
    def model_to_summary(doula: DoulaModel):
        return DoulaSummary(
            id=doula.id,
            name=doula.name,
            email=doula.email
        )

    @staticmethod
    def request_to_model(request: DoulaRequest):
        return DoulaModel.create(
            name=request.name,
            email=request.email,
            phone=request.phone,
            password_hash=hash_password(request.password),
        )

    @staticmethod
    def model_to_response(model: DoulaModel):
        return DoulaResponse(
            id=model.id,
            name=model.name,
            phone=model.phone,
            email=model.email,
            create_date=model.create_date,
            update_date=model.update_date,
        )