// constants/classTypes.js

export const CLASS_TYPE_LABELS = {
  OBSTETRIC_INTERVENTIONS: "Intervenções Obstétricas",
  BIRTH_PHYSIOLOGY: "Fisiologia do Parto",
  NEWBORN_RECEPTION: "Recepção ao RN",
  PREGNANCY_OVERVIEW: "Visão Geral da Gestação",
  CESAREAN_OVERVIEW: "Visão Geral da Cesárea",
  BREASTFEEDING_AND_PUERPERIUM: "Amamentação e Puerpério",
  NEST_PREPARATION: "Preparação do Ninho",
};

export function getClassTypeLabel(type) {
  return CLASS_TYPE_LABELS[type] || type;
}

export const CLASS_TYPE_OPTIONS = Object.entries(CLASS_TYPE_LABELS).map(
  ([value, label]) => ({ value, label })
);
