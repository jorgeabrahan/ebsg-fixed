import type { FormDefinition } from "../lib/types/forms";
import { Input } from "./Input";
import { PrimaryButton } from "./PrimaryButton";
import { Select } from "./Select";
import { isSelectField } from "../lib/typeGuards/forms";
import type { TargetedSubmitEvent } from "preact";
import { useState } from "preact/hooks";

export const Form = ({
  fields,
  onSubmit,
  onCancel,
  submitButton,
  className,
  isDisabled = false,
}: FormDefinition & { className?: string; isDisabled?: boolean }) => {
  const [validationResults, setValidationResults] = useState<
    { inputName: string; isSuccess: boolean; error?: string }[]
  >([]);
  const removeLabelFields = (sanitizedEntries: Record<string, any>) => {
    const result: Record<string, any> = {};
    for (const key in sanitizedEntries) {
      if (!key.includes("_label")) {
        result[key] = sanitizedEntries[key];
      }
    }
    return result;
  };
  const sanitizeFields = (entries: Record<string, any>) => {
    const sanitizedEntries: Record<string, any> = {};
    fields.map((f) => {
      if (f == null || typeof f?.name !== "string") return;
      if (typeof f?.outputFormat === "function") {
        sanitizedEntries[f.name] = f.outputFormat(entries[f.name]);
      }
      // by default if checkbox is not checked it does NOT appear on entries
      // and if it is true it appears as 'on'
      // so the following code ensures the checkbox is always present and is a boolean
      if (!isSelectField(f) && f.type === "checkbox") {
        sanitizedEntries[f.name] = entries[f.name] != null;
      }
    });
    return { ...entries, ...sanitizedEntries };
  };
  const validateFields = (
    sanitizedEntries: Record<string, any>,
    originalEntries: Record<string, any>,
  ) => {
    const tempValidationResults = fields.map((f) => {
      const inputName = typeof f.name === "string" ? f.name : String(f.name);

      if (typeof f?.validation === "function") {
        return {
          inputName,
          ...f.validation(
            sanitizedEntries[inputName],
            originalEntries[inputName],
          ),
        };
      }
      return { inputName, isSuccess: true };
    });

    setValidationResults(tempValidationResults);
    return tempValidationResults.some((result) => !result.isSuccess);
  };
  const onSubmitMiddleware = (e: TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const originalEntries = Object.fromEntries(
      new FormData(e.target as HTMLFormElement),
    );
    const sanitizedEntries = removeLabelFields(sanitizeFields(originalEntries));
    const isAtLeastOneFieldInvalid = validateFields(
      sanitizedEntries,
      originalEntries,
    );
    if (!isAtLeastOneFieldInvalid) {
      onSubmit({ e, originalEntries, sanitizedEntries });
    }
  };
  return (
    <form
      className={`flex flex-col gap-6 ${className}`}
      onSubmit={onSubmitMiddleware}
    >
      {fields.map((field) => {
        if (isSelectField(field)) {
          return (
            <Select
              {...field}
              disabled={isDisabled}
              validationErrors={validationResults}
            />
          );
        }
        return (
          <Input
            {...field}
            disabled={isDisabled}
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
