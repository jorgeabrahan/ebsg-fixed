import { IconEditPencil } from "../../icons/IconEditPencil";
import { IconTrash } from "../../icons/IconTrash";
import type { Column } from "../types/tables";

export const COLUMN_FORMATS = {
  text: "text",
  date: "date",
} as const;

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
  },
  {
    id: "is_primary",
    label: "Principal",
  },
  ...CONTACT_TABLE_COLUMNS,
];
