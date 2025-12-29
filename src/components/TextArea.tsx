import type { ComponentProps } from "preact";
import type { TextAreaField } from "../lib/types/forms";

export const TextArea = ({
  label,
  className,
  validationErrors,
  isDisabledByDefault,
  handleValueChange,
  variant = "lg",
  ...props
}: TextAreaField & {
  className?: string;
  validationErrors: { inputName: string; isSuccess: boolean; error?: string }[];
  isDisabledByDefault?: boolean;
  handleValueChange: (value: string) => void;
} & ComponentProps<"textarea">) => {
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
        className={`${className} ${
          applyDisabledStyle ? "opacity-50 cursor-not-allowed" : ""
        } relative`}
      >
        <label
          className={`absolute -top-2 left-4 bg-dark-950 rounded-sm px-1.5 text-sm z-10`}
          htmlFor={props?.id}
        >
          {label}
        </label>

        <div className="flex items-stretch gap-1.5">
          <textarea
            className={`field-base resize-none field-base-${variant}`}
            autoComplete="off"
            {...props}
            id={props?.id}
            name={props?.name}
            value={props.value ?? ""}
            onInput={(e) => {
              props.onChange?.(e);
              handleValueChange((e.target as HTMLTextAreaElement).value);
            }}
            readOnly={isDisabledByDefault}
          />
        </div>
      </div>

      {showError && (
        <div className="text-red-300 font-semibold text-sm mt-1">
          {inputError.error}
        </div>
      )}
    </div>
  );
};
