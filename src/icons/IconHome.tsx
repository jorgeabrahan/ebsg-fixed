import type { FunctionComponent } from "preact";
import type { SVGAttributes } from "preact/compat";

export const IconHome: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
  width = 16,
  height = 16,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke-width={strokeWidth}
      fill="none"
    >
      <path
        d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
