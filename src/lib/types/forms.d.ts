import type {
  ComponentChildren,
  ComponentProps,
  ComponentType,
  TargetedSubmitEvent,
} from "preact";
import type { PublicTable, ReadWhere } from "./request";

export type FieldValidationParameters = {
  sanitizedValue: any;
  originalValue: string;
  sanitizedEntries: Record<string, any>;
  originalEntries: Record<string, any>;
};
export type FieldSizeVariants = "md" | "lg";
type BaseField = {
  label: string;
  id: string;
  visibleWhen?: (values: Record<string, any>) => boolean;
  requiredWhen?: boolean | ((values: Record<string, any>) => boolean);
  outputFormat?: (value: any) => any;
  // sanitizedValue is the returned value from the outputFormat function
  // originalValue is the value before sanitization
  validation?: ({
    sanitizedValue,
    originalValue,
    sanitizedEntries,
    originalEntries,
  }: FieldValidationParameters) => {
    isSuccess: boolean;
    error?: string;
  };
  isDisabledByDefault?: boolean;
  variant?: FieldSizeVariants;
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
    where?: ReadWhere;
    searchColumns?: string[];
    getReferenceLabel?: (item: Record<string, any>) => string;
    getReferenceEditPath?: (itemId: string) => string;
    referenceListPath?: string;
    orderColumn?: string;
    orderAscending?: boolean;
  };

type TextAreaHTMLProps = Omit<ComponentProps<"textarea">, "id" | "className">;
export type TextAreaField = BaseField &
  TextAreaHTMLProps & {
    name: string;
    type: "textArea";
    required?: boolean;
    rows: number;
  };

type SelectHTMLProps = Omit<ComponentProps<"select">, "id" | "className">;
export type SelectField = BaseField &
  SelectHTMLProps & {
    name: string;
    type: "select";
    defaultValue?: string;
    options: readonly { label: string; value: string }[];
  };

export type FormDefinition = {
  fields: (TextField | SelectField | TextAreaField | RepeatableField )[];
  onSubmit: (params: {
    e: TargetedSubmitEvent<HTMLFormElement>;
    originalEntries: Record<string, string | File>;
    sanitizedEntries: Record<string, any>;
  }) => void;
  onCancel?: () => void;
  submitButton: ComponentChildren;
};

export type ReferenceValue<TMeta = any> = {
  id: string;
  _meta?: TMeta;
};

export type ArrayFieldType =
  | { type: "date" }
  | { type: "text" }
  | {
      type: "select";
      options: readonly { label: string; value: string }[];
    };

export type ArrayField = BaseField & {
  name: string;
  type: "array";
  of: ArrayFieldType;
  required?: boolean;
  minItems?: number;
};
