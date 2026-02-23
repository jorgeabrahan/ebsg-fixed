import { IconEditPencil } from "../../icons/IconEditPencil";
import { IconTrash } from "../../icons/IconTrash";
import type { Column } from "../types/tables";
import { UtilLookup } from "../utils/UtilLookup";
import {
  GENDER_LOOKUP,
  PERIODICITY_LOOKUP,
  SCHOOL_ENROLLMENT_STATUS_LOOKUP,
  STUDENT_CONTANT_RELATION_TYPE_LOOKUP,
} from "./lookups";

export const COLUMN_FORMATS = {
  text: "text",
  date: "date",
} as const;

export const formatCurrencyHNL = (value: number) =>
  new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(value);

export const MORE_ACTIONS = {
  delete: {
    id: "delete",
    label: "Eliminar",
    icon: IconTrash,
  },
  edit: {
    id: "edit",
    label: "Editar",
    icon: IconEditPencil,
  },
};

export const STUDENT_TABLE_COLUMNS: Column[] = [
  { id: "id", label: "ID", minWidth: "100px", maxWidth: "100px" },
  { id: "code", label: "Código", minWidth: "150px", maxWidth: "150px" },
  {
    id: "first_name",
    label: "Nombre",
  },
  {
    id: "last_name",
    label: "Apellido",
  },
  { id: "birth_date", label: "Fecha de Nacimiento", format: "date" },
  {
    id: "gender",
    label: "Sexo",
    minWidth: "100px",
    maxWidth: "100px",
    calculatedValue: (i) =>
      UtilLookup.getLabelFromValue(GENDER_LOOKUP, i.gender),
  },
];

export const CONTACT_TABLE_COLUMNS: Column[] = [
  { id: "id", label: "ID", minWidth: "100px", maxWidth: "100px" },
  {
    id: "first_name",
    label: "Nombre",
  },
  {
    id: "last_name",
    label: "Apellido",
  },
  {
    id: "phone",
    label: "Teléfono",
  },
  {
    id: "email",
    label: "Correo",
  },
  {
    id: "address",
    label: "Dirección",
  },
];

export const STUDENT_CONTACT_TABLE_COLUMNS: Column[] = [
  {
    id: "relation_type",
    label: "Parentesco",
    calculatedValue: (i) =>
      UtilLookup.getLabelFromValue(
        STUDENT_CONTANT_RELATION_TYPE_LOOKUP,
        i.relation_type,
      ),
  },
  {
    id: "is_primary",
    label: "Principal",
    calculatedValue: (item) => (item.is_primary ? "Sí" : "No"),
  },
  {
    id: "first_name",
    label: "Nombre",
    calculatedValue: (i) => {
      return i?.person_contacts?.first_name;
    },
  },
  {
    id: "last_name",
    label: "Apellido",
    calculatedValue: (i) => {
      return i?.person_contacts?.last_name;
    },
  },
  {
    id: "phone",
    label: "Teléfono",
    calculatedValue: (i) => {
      return i?.person_contacts?.phone;
    },
  },
  {
    id: "email",
    label: "Correo",
    calculatedValue: (i) => {
      return i?.person_contacts?.email;
    },
  },
  {
    id: "address",
    label: "Dirección",
    calculatedValue: (i) => {
      return i?.person_contacts?.address;
    },
  },
];

export const STUDENT_SCHOOL_ENROLLMENTS_TABLE_COLUMNS: Column[] = [
  {
    id: "year_label",
    label: "Año academico",
    calculatedValue: (i) => i?.school_academic_years?.year_label,
  },
  {
    id: "school_grade",
    label: "Grado",
    calculatedValue: (item) => item?.school_grades?.name,
  },
  {
    id: "section",
    label: "Sección",
  },
  {
    id: "created_at",
    label: "Enrolado en",
    format: "date",
  },
  {
    id: "status",
    label: "Status",
    calculatedValue: (i) =>
      UtilLookup.getLabelFromValue(SCHOOL_ENROLLMENT_STATUS_LOOKUP, i.status),
  },
];

export const SCHOOL_GRADES_TABLE_COLUMNS: Column[] = [
  { id: "id", label: "ID", minWidth: "100px", maxWidth: "100px" },
  {
    id: "name",
    label: "Nombre",
  },
  {
    id: "description",
    label: "Descripción",
  },
];

export const ACADEMIC_YEARS_TABLE_COLUMNS: Column[] = [
  { id: "id", label: "ID", minWidth: "100px", maxWidth: "100px" },
  {
    id: "year_label",
    label: "Año",
  },
  { id: "start_date", label: "Fecha de Inicio", format: "date" },
  { id: "end_date", label: "Fecha de Finalización", format: "date" },
  {
    id: "is_active",
    label: "Activa",
    calculatedValue: (item) => (item.is_active ? "Sí" : "No"),
  },
];
export const ACADEMIC_YEAR_FINANCE_FEE_SCHEDULES_TABLE_COLUMNS: Column[] = [
  {
    id: "grade_id",
    label: "Grado",
    calculatedValue: (i) => i?.school_grades?.name,
  },
  {
    id: "fee_type",
    label: "Tipo de pago",
    calculatedValue: (i) => i?.finance_fee_types?.name,
  },
  {
    id: "fee_type_periodicity",
    label: "Periodicidad",
    calculatedValue: (i) =>
      UtilLookup.getLabelFromValue(
        PERIODICITY_LOOKUP,
        i?.finance_fee_types?.periodicity,
      ),
  },
  {
    id: "amount",
    label: "Monto",
  },
];

export const FINANCE_FEE_TYPES_TABLE_COLUMNS: Column[] = [
  { id: "id", label: "ID", minWidth: "100px", maxWidth: "100px" },
  {
    id: "code",
    label: "Código",
  },
  {
    id: "name",
    label: "Nombre",
  },
  {
    id: "periodicity",
    label: "Periodicidad",
    calculatedValue: (i) =>
      UtilLookup.getLabelFromValue(PERIODICITY_LOOKUP, i.periodicity),
  },
];

export const FINANCE_CHARGES_TABLE_COLUMNS: Column[] = [
  {
    id: "fee_type",
    label: "Concepto",
    calculatedValue: (i) => i?.finance_fee_types?.name,
  },
  {
    id: "description",
    label: "Descripción",
  },
  {
    id: "period_month",
    label: "Periodo",
    calculatedValue: (i) =>
      i?.period_month
        ? new Date(i.period_month).toLocaleDateString("es-HN", {
            year: "numeric",
            month: "long",
          })
        : "—",
  },
    {
    id: "amount_due",
    label: "Monto",
    calculatedValue: (i) => formatCurrencyHNL(Number(i.amount_due)),
  },
  {
    id: "due_date",
    label: "Vence",
    format: "date",
  },
  {
    id: "status",
    label: "Estado",
  },
];

export const FINANCE_TRANSACTIONS_TABLE_COLUMNS: Column[] = [
  {
    id: "payment_date",
    label:  "Fecha",
  },
  {
    id: "method",
    label: "Método",
  },
  {
    id: "reference",
    label: "Referencia",
  },
  {    
    id: "amount_total",
    label: "Total",
    calculatedValue: (i) => formatCurrencyHNL(Number(i.amount_total)),
  },
  {
    id: "notes",
    label: "Notas",
  },
  {
    id: "created_at",
    label: "Creado",
  },
];

