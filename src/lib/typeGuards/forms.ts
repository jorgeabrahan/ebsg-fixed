import type { FormDefinition, SelectField } from "../types/forms";

export function isSelectField(
  field: FormDefinition["fields"][number],
): field is SelectField {
  return (
    (field as SelectField).options !== undefined &&
    Array.isArray((field as SelectField).options)
  );
}
