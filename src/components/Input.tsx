import type { ComponentProps } from "preact";

export const Input = ({
  label,
  className,
  validationErrors,
  ...props
}: {
  label?: string;
  className?: string;
  validationErrors: { inputName: string; isSuccess: boolean; error?: string }[];
} & ComponentProps<"input">) => {
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
        <input className="field-base" autoComplete={"off"} {...props} />
      </div>
      {showError && (
        <div className="text-red-300 font-semibold text-sm mt-1">
          {inputError.error}
        </div>
      )}
    </div>
  );
};
