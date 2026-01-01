import type { FormDefinition } from "../lib/types/forms";
import { Input } from "./Input";
import { PrimaryButton } from "./PrimaryButton";
import { Select } from "./Select";
import { isSelectField, isTextAreaField } from "../lib/typeGuards/forms";
import type { TargetedSubmitEvent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { TextArea } from "./TextArea";

export const Form = ({
  fields,
  onSubmit,
  onCancel,
  submitButton,
  className,
  isDisabled = false,
}: FormDefinition & { className?: string; isDisabled?: boolean }) => {
  const buildInitialValues = (fields: FormDefinition["fields"]) => {
    const obj: Record<string, any> = {};

    fields.forEach((f) => {
      if (!isSelectField(f) && !isTextAreaField(f) && f?.type === "checkbox") {
        obj[f.name] = Boolean(f.value);
        return;
      }

      obj[f.name] = f.value ?? "";
    });

    return obj;
  };

  const [values, setValues] = useState(() => buildInitialValues(fields));
  const [validationResults, setValidationResults] = useState<
    { inputName: string; isSuccess: boolean; error?: string }[]
  >([]);
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      ...buildInitialValues(fields),
    }));
  }, [fields]);

  const removeLabelFields = (sanitizedEntries: Record<string, any>) => {
    const result: Record<string, any> = {};
    for (const key in sanitizedEntries) {
      if (key.includes("_label") && fields.find((f) => f.name === key) == null)
        continue;
      result[key] = sanitizedEntries[key];
    }
    return result;
  };
  const sanitizeFields = (entries: Record<string, any>) => {
    const sanitizedEntries: Record<string, any> = {};

    fields.forEach((f) => {
      if (f == null || typeof f.name !== "string") return;

      const value = entries[f.name];

      if (typeof f.outputFormat === "function") {
        sanitizedEntries[f.name] = f.outputFormat(value);
        return;
      }

      // { id, _meta } → id
      if (value && typeof value === "object" && "id" in value) {
        sanitizedEntries[f.name] = value.id;
        return;
      }

      sanitizedEntries[f.name] = value;
    });

    return sanitizedEntries;
  };
  const validateFields = (
    sanitizedEntries: Record<string, any>,
    originalEntries: Record<string, any>,
  ) => {
    const tempValidationResults = fields.map((f) => {
      const inputName = typeof f.name === "string" ? f.name : String(f.name);

      if (!isFieldVisible(f, originalEntries)) {
        return { inputName, isSuccess: true };
      }

      if (typeof f?.validation === "function") {
        return {
          inputName,
          ...f.validation({
            sanitizedValue: sanitizedEntries[inputName],
            originalValue: originalEntries[inputName],
            sanitizedEntries,
            originalEntries,
          }),
        };
      }
      return { inputName, isSuccess: true };
    });

    setValidationResults(tempValidationResults);
    return tempValidationResults.some((result) => !result.isSuccess);
  };
  const onSubmitMiddleware = (e: TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitized = removeLabelFields(sanitizeFields(values));

    const invalid = validateFields(sanitized, values);
    if (!invalid) {
      onSubmit({
        e,
        originalEntries: values,
        sanitizedEntries: sanitized,
      });
    }
  };

  const handleValueChange = (
    name: string,
    value: any,
    meta?: Record<string, any>
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: meta
        ? { id: value, _meta: meta }
        : value,
    }));
  };

  const visibleFields = fields.filter((field) =>
    typeof field.visibleWhen === "function" ? field.visibleWhen(values) : true
  );

  const isFieldVisible = (
    field: FormDefinition["fields"][number],
    values: Record<string, any>
  ) => {
    if (typeof field.visibleWhen !== "function") return true;
    return field.visibleWhen(values);
  };

  useEffect(() => {
    setValues((prev) => {
      let changed = false;
      const next = { ...prev };

      fields.forEach((field) => {
        if (!field.name) return;

        const visible = isFieldVisible(field, prev);

        if (!visible && prev[field.name] != null) {
          next[field.name] = null;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [values, fields]);

  return (
    <form
      className={`flex flex-col gap-6 pt-4 pb-8 ${className}`}
      onSubmit={onSubmitMiddleware}
    >
      {visibleFields.map((field) => {
        if (isSelectField(field)) {
          return (
            <Select
              {...field}
              value={values[field.name]}
              handleValueChange={(v) => handleValueChange(field.name, v)}
              validationErrors={validationResults}
            />
          );
        }
        if (isTextAreaField(field)) {
          return (
            <TextArea
              {...field}
              value={values[field.name]}
              handleValueChange={(v) => handleValueChange(field.name, v)}
              validationErrors={validationResults}
            />
          );
        }

        return (
          <Input
            {...field}
            value={values[field.name]}
            handleValueChange={(v, meta) =>
              handleValueChange(field.name, v, meta)
            }
            validationErrors={validationResults}
          />
        );
      })}
      <div
        className={
          "flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-4"
        }
      >
        <PrimaryButton
          variant="muted"
          type="button"
          onClick={onCancel}
          disabled={isDisabled}
        >
          <span>Cancelar</span>
        </PrimaryButton>
        <PrimaryButton disabled={isDisabled}>{submitButton}</PrimaryButton>
      </div>
    </form>
  );
};
