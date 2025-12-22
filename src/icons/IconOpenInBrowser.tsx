export const IconOpenInBrowser = ({ size = 24, strokeWidth = 1.5 }) => {
  return (
    <svg
      width={size}
      height={size}
      stroke-width={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6V16"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M10 6L18 6"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M6 6H7"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M3.5 20.5L12 12M12 12V16M12 12H8"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
