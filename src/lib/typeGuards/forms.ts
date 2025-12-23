import type {
  FormDefinition,
  SelectField,
  TextAreaField,
} from "../types/forms";

export function isSelectField(
  field: FormDefinition["fields"][number],
): field is SelectField {
  return (
    (field as SelectField).options !== undefined &&
    Array.isArray((field as SelectField).options)
  );
}
export function isTextAreaField(
  field: FormDefinition["fields"][number],
): field is TextAreaField {
  return (
    (field as TextAreaField).rows !== undefined &&
    typeof (field as TextAreaField).rows === "number"
  );
}
