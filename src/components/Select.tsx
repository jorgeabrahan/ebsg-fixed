import type { ComponentProps } from "preact";
import type { SelectField } from "../lib/types/forms";

export const Select = ({
  label,
  defaultValue,
  options,
  className,
  validationErrors,
  ...props
}: SelectField & {
  className?: string;
  validationErrors: { inputName: string; isSuccess: boolean; error?: string }[];
} & ComponentProps<"select">) => {
  const inputError = validationErrors?.find(
    (err) => err.inputName === props?.name,
  );
  const showError =
    inputError != null &&
    !inputError.isSuccess &&
    inputError.error != null &&
    inputError.error.length > 0;
  return (
    <div>
      <div
        className={`${className} ${props?.disabled ? "opacity-50 cursor-not-allowed" : ""} relative`}
      >
        <label
          className="absolute -top-3 left-3 font-semibold bg-neutral-800 px-1.5 rounded-sm"
          htmlFor={props?.id}
        >
          {label}
        </label>
        <select className="field-base" {...props}>
          <option value="">{defaultValue}</option>
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
