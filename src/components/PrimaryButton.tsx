import type { ComponentChildren, ComponentProps } from "preact";

export const PrimaryButton = ({
  children,
  className,
  size = "xl",
  variant = "default",
  ...props
}: {
  children: ComponentChildren;
  className?: string;
  size?: "lg" | "xl";
  variant?: "default" | "muted";
} & ComponentProps<"button">) => {
  const colors = {
    default: "bg-primary text-zinc-950",
    muted: "bg-dark-700 text-contrast",
  };
  return (
    <button
      className={`button-base ${size} ${colors[variant]} ${props?.disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
