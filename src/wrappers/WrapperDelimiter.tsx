import type { ComponentChildren } from "preact";

export const WrapperDelimiter = ({
  as: Tag = "section",
  children,
  className,
}: {
  as?: keyof HTMLElementTagNameMap;
  children: ComponentChildren;
  className?: string;
}) => {
  return <Tag className={`w-full px-4 md:px-6 ${className}`}>{children}</Tag>;
};
