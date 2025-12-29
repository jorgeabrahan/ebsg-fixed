import type { FunctionComponent } from "preact";
import type { SVGAttributes } from "preact/compat";

export const IconPlus: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
  width = 24,
  height = 24,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      width={width}
      height={height}
      stroke-width={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 12H12M18 12H12M12 12V6M12 12V18"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
