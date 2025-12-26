import type { FunctionComponent } from "preact";
import type { SVGAttributes } from "preact/compat";

export const IconXmark: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
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
        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
