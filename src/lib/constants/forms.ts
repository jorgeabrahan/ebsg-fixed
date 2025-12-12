import type { SelectField, TextField } from "../types/forms";
import { UtilFieldFormatter } from "../utils/UtilFieldFormatter";
import { UtilFieldValidator } from "../utils/UtilFieldValidator";

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
    options: [
      { label: "Masculino", value: "male" },
      { label: "Femenino", value: "female" },
    ],
    required: true,
  },
];

export const STUDENT_EDIT_FIELDS: (TextField | SelectField)[] =
  STUDENT_BASE_FIELDS;
export const STUDENT_CREATE_FIELDS: (TextField | SelectField)[] =
  STUDENT_BASE_FIELDS;

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

export const CONTACT_EDIT_FIELDS: (TextField | SelectField)[] =
  CONTACT_BASE_FIELDS;
export const CONTACT_CREATE_FIELDS: (TextField | SelectField)[] =
  CONTACT_BASE_FIELDS;
