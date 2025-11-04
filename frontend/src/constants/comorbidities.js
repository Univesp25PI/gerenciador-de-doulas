// constants/comorbidities.js

export const COMORBIDITY_LABELS = {
  HYPERTENSION: "Hipertensão",
  DIABETES: "Diabetes",
  OBESITY: "Obesidade",
  THYROID_DISORDER: "Distúrbio da Tireoide",
  ASTHMA: "Asma",
  ANEMIA: "Anemia",
  HIV: "HIV",
  LUPUS: "Lúpus",
  RENAL_DISEASE: "Doença Renal",
  CARDIOPATHY: "Cardiopatia",
  EPILEPSY: "Epilepsia",
  DEPRESSION: "Depressão",
  TUBERCULOSIS: "Tuberculose",
  HEPATITIS: "Hepatite"
};

export function getComorbidityLabel(code) {
  return COMORBIDITY_LABELS[code] || code;
}

export const COMORBIDITY_OPTIONS = Object.entries(COMORBIDITY_LABELS).map(
  ([value, label]) => ({ value, label })
);
