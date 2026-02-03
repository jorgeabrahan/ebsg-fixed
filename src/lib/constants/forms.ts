import type { SelectField, TextAreaField, TextField, ArrayField } from "../types/forms";
import { UtilFieldFormatter } from "../utils/UtilFieldFormatter";
import { UtilFieldValidator } from "../utils/UtilFieldValidator";
import { UtilLookup } from "../utils/UtilLookup";
import {
  GENDER_LOOKUP,
  PERIODICITY_LOOKUP,
  SCHOOL_ENROLLMENT_STATUS_LOOKUP,
  STUDENT_CONTANT_RELATION_TYPE_LOOKUP,
} from "./lookups";
import { ROUTES } from "./routes";

export const STUDENT_BASE_FIELDS: (TextField | SelectField)[] = [
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
    type: "select",
    id: "gender",
    name: "gender",
    defaultValue: "-- Selecciona un sexo --",
    options: GENDER_LOOKUP,
    required: true,
  },
];

export const STUDENT_EDIT_FIELDS: (TextField | SelectField)[] = [
  {
    label: "Código",
    id: "code",
    name: "code",
    type: "text",
    required: true,
    outputFormat: (v) => v.trim(),
    validation: UtilFieldValidator.code,
    isDisabledByDefault: true,
  },
  ...STUDENT_BASE_FIELDS,
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
    placeholder: "9999 9999",
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
    searchColumns: ["first_name", "last_name"],
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
    searchColumns: ["first_name", "last_name"],
    getReferenceLabel: (item) =>
      `${item.id} - ${item.first_name} ${item.last_name}`,
    referenceListPath: ROUTES.contacts.path,
    getReferenceEditPath: (itemId) => ROUTES.contact.build(itemId),
    required: true,
  },
  {
    label: "Relación",
    type: "select",
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

export const STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS: (
  | TextField
  | SelectField
)[] = [
  {
    label: "Estudiante",
    id: "student_id",
    name: "student_id",
    type: "reference",
    table: "person_students",
    select: "id, first_name, last_name",
    searchColumns: ["first_name", "last_name"],
    getReferenceLabel: (item) =>
      `${item.id} - ${item.first_name} ${item.last_name}`,
    required: true,
    isDisabledByDefault: true,
  },
  {
    label: "Año academico",
    id: "year_id",
    name: "year_id",
    type: "reference",
    table: "school_academic_years",
    select: "id, year_label",
    searchColumns: ["year_label"],
    getReferenceLabel: (item) => item.year_label,
    referenceListPath: ROUTES.academicYears.path,
    getReferenceEditPath: (itemId) => ROUTES.academicYear.build(itemId),
    required: true,
    orderColumn: "year_label",
    orderAscending: false,
  },
  {
    label: "Grado",
    id: "grade_id",
    name: "grade_id",
    type: "reference",
    table: "school_grades",
    select: "id, name",
    searchColumns: ["name"],
    getReferenceLabel: (item) => item.name,
    referenceListPath: ROUTES.schoolGrades.path,
    getReferenceEditPath: (itemId) => ROUTES.schoolGrade.build(itemId),
    required: true,
    orderColumn: "name",
    orderAscending: false,
  },
  {
    label: "Sección",
    id: "section",
    name: "section",
    type: "text",
  },
  {
    label: "Status",
    type: "select",
    id: "status",
    name: "status",
    defaultValue: "-- Seleccione --",
    options: SCHOOL_ENROLLMENT_STATUS_LOOKUP,
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
    type: "textArea",
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
    type: "number",
    placeholder: "2025",
    required: true,
    validation: (p) =>
      UtilFieldValidator.year(p, {
        isRequired: true,
        pastYearsAllowed: 5,
        futureYearsAllowed: 10,
      }),
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

export const ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_BASE_FIELDS: (
  | TextField
  | SelectField
  | ArrayField
)[] = [
  {
    label: "Año academico",
    id: "year_id",
    name: "year_id",
    type: "reference",
    table: "school_academic_years",
    select: "id, year_label",
    searchColumns: ["year_label"],
    getReferenceLabel: (item) => item.year_label,
    isDisabledByDefault: true,
    required: true,
  },
  {
    label: "Tipo de pago",
    id: "fee_type_id",
    name: "fee_type_id",
    type: "reference",
    table: "finance_fee_types",
    select: "id, code, periodicity",
    searchColumns: ["code"],
    /*where: [
      {
        column: "periodicity",
        operator: "neq",
        value: "adhoc",
      },
    ],*/
    getReferenceLabel: (item) =>
      `${item.code} - ${UtilLookup.getLabelFromValue(PERIODICITY_LOOKUP, item.periodicity)}`,
    referenceListPath: ROUTES.financeFeeTypes.path,
    getReferenceEditPath: (itemId) => ROUTES.financeFeeType.build(itemId),
    required: true,
  },
  {
    label: "Grado",
    id: "grade_id",
    name: "grade_id",
    type: "reference",
    table: "school_grades",
    select: "id, name",
    searchColumns: ["name"],
    getReferenceLabel: (item) => item.name,
    referenceListPath: ROUTES.schoolGrades.path,
    getReferenceEditPath: (itemId) => ROUTES.schoolGrade.build(itemId),
    orderColumn: "name",
    orderAscending: false,
    requiredWhen: (values) => {
      const periodicity = values.fee_type_id?._meta?.periodicity;
      if (!periodicity) return false;
      return periodicity !== "once-per-year" && periodicity !== "adhoc";
    },
    visibleWhen: (values) => {
      const periodicity = values.fee_type_id?._meta?.periodicity;
      // Se oculta si aun no hay fee_type seleccionado
      if (!periodicity) return false;
      return periodicity !== "once-per-year";
    }
  },
  {
    label: "Inicio del periodo mensual",
    id: "start_date",
    name: "start_date",
    type: "date",
    required: true, 
    validation: UtilFieldValidator.date,
    visibleWhen: (values) => {
      const periodicity = values.fee_type_id?._meta?.periodicity;
      return periodicity === "monthly";
    },
  },
  {
    label: "Fin del periodo mensual",
    id: "end_date",
    name: "end_date",
    type: "date",
    required: true,
    validation: UtilFieldValidator.compose(
      UtilFieldValidator.date,
      UtilFieldValidator.endDateAfterStart,
    ),
    visibleWhen: (values) => {
      const periodicity = values.fee_type_id?._meta?.periodicity;
      return periodicity === "monthly";
    },
  },
  {
    label: "Monto",
    id: "amount",
    name: "amount",
    type: "number",
    required: true,
    validation: UtilFieldValidator.amount,
  },
  {
    label: "Fechas de cargos",
    id: "occurrences",
    name: "occurrences",
    type: "array",
    of: { type: "date" },

    requiredWhen: (values) => {
      const periodicity = values.fee_type_id?._meta?.periodicity;
      return periodicity === "adhoc";
    },

    visibleWhen: (values) => {
      const periodicity = values.fee_type_id?._meta?.periodicity;
      return periodicity === "adhoc";
    },
    validation: UtilFieldValidator.compose(
      UtilFieldValidator.arrayOf(
        (params) => UtilFieldValidator.date(params),
        {
          required: true,
          minItems: 1,
        },
      ),
      UtilFieldValidator.uniqueValues(),
    ),
  },
];

export const ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_EDIT_FIELDS: (
  | TextField
  | SelectField
  | ArrayField
)[] = ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_BASE_FIELDS.map((f) => {
  if (f.id === "amount") return f;
  return {
    ...f,
    isDisabledByDefault: true,
  };
});

export const FINANCE_FEE_TYPES_BASE_FIELDS: (
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
    label: "Periodicidad",
    type: "select",
    id: "periodicity",
    name: "periodicity",
    defaultValue: "-- Seleccione --",
    options: PERIODICITY_LOOKUP,
    required: true,
  },
];

export const FINANCE_FEE_TYPES_EDIT_FIELDS: (
  | TextField
  | SelectField
  | TextAreaField
)[] = [
  {
    label: "Código",
    id: "code",
    name: "code",
    type: "text",
    required: true,
    isDisabledByDefault: true,
    outputFormat: UtilFieldFormatter.feeCode,
    validation: UtilFieldValidator.feeCode,
  },
  ...FINANCE_FEE_TYPES_BASE_FIELDS,
];
