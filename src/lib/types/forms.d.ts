import type {
  ComponentChildren,
  ComponentProps,
  ComponentType,
  TargetedSubmitEvent,
} from "preact";
import type { PublicTable } from "./request";

type BaseField = {
  label: string;
  id: string;
  outputFormat?: (value: string) => any;
  // sanitizedValue is the returned value from the outputFormat function
  // originalValue is the value before sanitization
  validation?: (
    sanitizedValue: any,
    originalValue?: string,
  ) => {
    isSuccess: boolean;
    error?: string;
  };
  isDisabledByDefault?: boolean;
};

type InputHTMLProps = Omit<
  ComponentProps<"input">,
  "type" | "id" | "className"
>;
export type TextField = BaseField &
  InputHTMLProps & {
    name: string;
    type:
      | "text"
      | "email"
      | "password"
      | "number"
      | "date"
      | "tel"
      | "reference"
      | "checkbox";
    required?: boolean;
    reference?: string;
    table?: PublicTable;
    select?: string;
    getReferenceLabel?: (item: Record<string, any>) => string;
    getReferenceEditPath?: (itemId: string) => string;
    referenceListPath?: string;
  };

type SelectHTMLProps = Omit<ComponentProps<"select">, "id" | "className">;
export type SelectField = BaseField &
  SelectHTMLProps & {
    name: string;
    defaultValue: string;
    options: readonly { label: string; value: string }[];
  };

export type FormDefinition = {
  fields: (TextField | SelectField)[];
  onSubmit: (params: {
    e: TargetedSubmitEvent<HTMLFormElement>;
    originalEntries: Record<string, string | File>;
    sanitizedEntries: Record<string, any>;
  }) => void;
  onCancel?: () => void;
  submitButton: ComponentChildren;
};
