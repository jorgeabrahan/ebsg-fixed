import type { FunctionComponent } from "preact";
import type { SVGAttributes } from "preact/compat";

export const IconCalendar: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
  width = 16,
  height = 16,
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
        d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M7 2V6"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
