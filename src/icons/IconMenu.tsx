import type { FunctionComponent } from "preact";
import type { SVGAttributes } from "preact/compat";

export const IconMenu: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
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
        d="M3 5H21"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M3 12H21"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M3 19H21"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
