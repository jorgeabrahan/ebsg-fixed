import type { ComponentProps } from "preact";
import type { SelectField } from "../lib/types/forms";

export const Select = ({
  label,
  defaultValue,
  options,
  className,
  validationErrors,
  isDisabledByDefault,
  handleValueChange,
  variant = "lg",
  ...props
}: SelectField & {
  className?: string;
  validationErrors?: {
    inputName: string;
    isSuccess: boolean;
    error?: string;
  }[];
  isDisabledByDefault?: boolean;
  handleValueChange: (value: string) => void;
} & ComponentProps<"select">) => {
  const inputError = validationErrors?.find(
    (err) => err.inputName === props?.name,
  );
  const showError =
    inputError != null &&
    !inputError.isSuccess &&
    inputError.error != null &&
    inputError.error.length > 0;
  const applyDisabledStyle = props?.disabled || isDisabledByDefault;
  return (
    <div>
      <div
        className={`${className} ${applyDisabledStyle ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} relative`}
      >
        <label
          className="absolute -top-2 left-4 text-sm bg-dark-950 px-1.5 rounded-sm"
          htmlFor={props?.id}
        >
          {label}
        </label>
        <select
          className={`field-base field-base-${variant}`}
          {...props}
          value={props.value ?? ""}
          onChange={(e) => {
            props.onChange?.(e);
            handleValueChange(e.currentTarget?.value);
          }}
          tabIndex={isDisabledByDefault ? -1 : 0}
        >
          {defaultValue && <option value="">{defaultValue}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {showError && (
        <div className="text-red-300 font-semibold text-sm mt-1">
          {inputError.error}
        </div>
      )}
    </div>
  );
};
