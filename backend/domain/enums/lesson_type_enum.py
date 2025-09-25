from enum import Enum

class LessonTypeEnum(Enum):
    OBSTETRIC_INTERVENTIONS = ("OBSTETRIC_INTERVENTIONS", "Intercorrências, violência obstétrica, parto instrumental")
    BIRTH_PHYSIOLOGY = ("BIRTH_PHYSIOLOGY", "Fisiologia do parto, como ele acontece, o que eu vou sentir, qual é o momento certo de ir para a maternidade, dilatação")
    NEWBORN_RECEPTION = ("NEWBORN_RECEPTION", "A recepção do recém nascido")
    PREGNANCY_OVERVIEW = ("PREGNANCY_OVERVIEW", "Gestação, intercorrências, fisiologia do corpo, pré natal adequado, como escolher um bom hospital ou equipe")
    CESAREAN_OVERVIEW = ("CESAREAN_OVERVIEW", "Cesariana, o que é normal e o que é sinal de alerta?, laceração, como funciona uma indução de parto")
    BREASTFEEDING_AND_PUERPERIUM = ("BREASTFEEDING_AND_PUERPERIUM", "Amamentação e se preparando para o puerpério")
    NEST_PREPARATION = ("NEST_PREPARATION", "Preparando o ninho")

    def __new__(cls, value: str, description: str):
        obj = object.__new__(cls)
        obj._value_ = value          # agora value == name
        obj.description = description
        return obj

    @classmethod
    def from_name(cls, name: str) -> "LessonTypeEnum":
        try:
            return cls[name]  # permite buscar pelo NAME
        except KeyError:
            raise ValueError(f"No enum constant with name: {name}")