import type { SelectField, TextAreaField, TextField } from "../types/forms";
import { UtilFieldFormatter } from "../utils/UtilFieldFormatter";
import { UtilFieldValidator } from "../utils/UtilFieldValidator";
import { GENDER_LOOKUP, STUDENT_CONTANT_RELATION_TYPE_LOOKUP } from "./lookups";
import { ROUTES } from "./routes";

export const STUDENT_BASE_FIELDS: (TextField | SelectField)[] = [
  {
    label: "Código",
    id: "code",
    name: "code",
    type: "text",
    required: true,
    outputFormat: (v) => v.trim(),
    validation: UtilFieldValidator.code,
  },
  {
    label: "Nombre",
    id: "first_name",
    name: "first_name",
    type: "text",
    required: true,
    outputFormat: UtilFieldFormatter.capitalize,
    validation: UtilFieldValidator.name,
  },
  {
    label: "Apellido",
    id: "last_name",
    name: "last_name",
    type: "text",
    required: true,
    outputFormat: UtilFieldFormatter.capitalize,
    validation: UtilFieldValidator.name,
  },
  {
    label: "Fecha de Nacimiento",
    id: "birth_date",
    name: "birth_date",
    type: "date",
    required: true,
    validation: UtilFieldValidator.birthdate,
  },
  {
    label: "Sexo",
    id: "gender",
    name: "gender",
    defaultValue: "-- Selecciona un sexo --",
    options: GENDER_LOOKUP,
    required: true,
  },
];

export const CONTACT_BASE_FIELDS: (TextField | SelectField)[] = [
  {
    label: "Nombre",
    id: "first_name",
    name: "first_name",
    type: "text",
    required: true,
    outputFormat: UtilFieldFormatter.capitalize,
    validation: UtilFieldValidator.name,
  },
  {
    label: "Apellido",
    id: "last_name",
    name: "last_name",
    type: "text",
    required: true,
    outputFormat: UtilFieldFormatter.capitalize,
    validation: UtilFieldValidator.name,
  },
  {
    label: "Teléfono",
    id: "phone",
    name: "phone",
    type: "text",
    required: true,
    outputFormat: UtilFieldFormatter.sanitizePhone,
    validation: UtilFieldValidator.phone,
  },
  {
    label: "Correo",
    id: "email",
    name: "email",
    type: "email",
  },
  {
    label: "Ubicación",
    id: "address",
    name: "address",
    type: "text",
  },
];

export const STUDENT_CONTACT_BASE_FIELDS: (TextField | SelectField)[] = [
  {
    label: "Estudiante",
    id: "student_id",
    name: "student_id",
    type: "reference",
    table: "person_students",
    select: "id, first_name, last_name",
    getReferenceLabel: (item) =>
      `${item.id} - ${item.first_name} ${item.last_name}`,
    required: true,
    isDisabledByDefault: true,
  },
  {
    label: "Contacto",
    id: "contact_id",
    name: "contact_id",
    type: "reference",
    table: "person_contacts",
    select: "id, first_name, last_name",
    getReferenceLabel: (item) =>
      `${item.id} - ${item.first_name} ${item.last_name}`,
    referenceListPath: ROUTES.contacts.path,
    getReferenceEditPath: (itemId) => ROUTES.contact.build(itemId),
    required: true,
  },
  {
    label: "Relación",
    id: "relation_type",
    name: "relation_type",
    defaultValue: "-- Seleccione --",
    options: STUDENT_CONTANT_RELATION_TYPE_LOOKUP,
  },
  {
    label: "Es primario",
    id: "is_primary",
    name: "is_primary",
    type: "checkbox",
  },
];

export const SCHOOL_GRADES_BASE_FIELDS: (
  | TextField
  | SelectField
  | TextAreaField
)[] = [
  {
    label: "Nombre",
    id: "name",
    name: "name",
    type: "text",
    required: true,
  },
  {
    label: "Descripción",
    id: "description",
    name: "description",
    rows: 3,
  },
];

export const ACADEMIC_YEARS_BASE_FIELDS: (
  | TextField
  | SelectField
  | TextAreaField
)[] = [
  {
    label: "Año",
    id: "year_label",
    name: "year_label",
    type: "text",
    required: true,
  },
  {
    label: "Fecha de Inicio",
    id: "start_date",
    name: "start_date",
    type: "date",
    required: true,
    validation: UtilFieldValidator.date,
  },
  {
    label: "Fecha de Finalización",
    id: "end_date",
    name: "end_date",
    type: "date",
    required: true,
    validation: UtilFieldValidator.compose(
      UtilFieldValidator.date,
      UtilFieldValidator.endDateAfterStart,
    ),
  },
  {
    label: "Activo",
    id: "is_active",
    name: "is_active",
    type: "checkbox",
  },
];
