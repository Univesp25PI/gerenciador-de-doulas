from enum import Enum
from typing import List, Optional


class ComorbiditiesEnum(str, Enum):
    HYPERTENSION = "HYPERTENSION"
    DIABETES = "DIABETES"
    OBESITY = "OBESITY"
    THYROID_DISORDER = "THYROID_DISORDER"
    ASTHMA = "ASTHMA"
    ANEMIA = "ANEMIA"
    HIV = "HIV"
    LUPUS = "LUPUS"
    RENAL_DISEASE = "RENAL_DISEASE"
    CARDIOPATHY = "CARDIOPATHY"
    EPILEPSY = "EPILEPSY"
    DEPRESSION = "DEPRESSION"
    TUBERCULOSIS = "TUBERCULOSIS"
    HEPATITIS = "HEPATITIS"

    @classmethod
    def list_to_string(cls, comorbidities: List["ComorbiditiesEnum"]) -> Optional[str]:
        """Converte lista de enums em string com vírgula (ou None se vazio)."""
        if not comorbidities:
            return None
        return ",".join([c.name for c in comorbidities])

    @classmethod
    def string_to_list(cls, value: Optional[str]) -> List["ComorbiditiesEnum"]:
        """Converte string (ex: 'HIV,ASTHMA') em lista de enums válidos."""
        if not value:
            return []
        return [
            c for v in value.split(",")
            if (c := cls.__members__.get(v.strip())) is not None
        ]