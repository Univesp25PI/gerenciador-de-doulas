from domain.models.doula_model import DoulaModel
from infrastructure.db.entities import Doula


class DoulaInfraMapper:

    @staticmethod
    def model_to_entity(model: DoulaModel):
        return Doula(name=model.name, email=model.email, phone=model.phone, password_hash=model.password_hash)

    @staticmethod
    def entity_to_model(entity: Doula):
        return DoulaModel.from_persistence(
            id=entity.id,
            name=entity.name,
            email=entity.email,
            phone=entity.phone,
            password_hash=entity.password_hash,
            create_date=entity.create_date,
            update_date=entity.update_date,
        )