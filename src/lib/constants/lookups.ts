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

export const PERIODICITY_LOOKUP = [
  { label: "Mensual", value: "monthly" },
  { label: "Una vez al año", value: "once-per-year" },
  { label: "Una vez por grado", value: "once-per-grade" },
  { label: "Ad hoc", value: "adhoc" },
] as const;

export const SCHOOL_ENROLLMENT_STATUS_LOOKUP = [
  { label: "Matriculado", value: "enrolled" },
  { label: "Retirado", value: "withdrawn" },
  { label: "Graduado", value: "graduated" },
  { label: "Abandono", value: "dropped_out" },
] as const;

export const FINANCE_CHARGE_STATUS_LOOKUP = [
  { label: "Pendiente", value: "open" },
  { label: "Parcialmente pagado", value: "partially_paid" },
  { label: "Pagado", value: "paid" },
  { label: "Anulado", value: "void" },
] as const;

export const PAYMENT_METHOD_LOOKUP = [
  { label: "Efectivo", value: "cash" },
  { label: "Transferencia", value: "transfer" },
];