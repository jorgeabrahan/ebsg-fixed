export const STUDENT_CONTANT_RELATION_TYPE_LOOKUP = [
  { label: "Padre / Madre", value: "parent" },
  { label: "Tutor legal", value: "guardian" },
  { label: "Encargado / Responsable", value: "responsible" },
  { label: "Hermano / Hermana", value: "sibling" },
  { label: "Abuelo / Abuela", value: "grandparent" },
  { label: "Tío / Tía", value: "uncle_aunt" },
  { label: "Primo / Prima", value: "cousin" },
  { label: "Contacto de emergencia", value: "emergency_contact" },
  { label: "Amigo / Amiga de la familia", value: "family_friend" },
  { label: "Otro", value: "other" },
] as const;

export const GENDER_LOOKUP = [
  { label: "Masculino", value: "male" },
  { label: "Femenino", value: "female" },
] as const;
