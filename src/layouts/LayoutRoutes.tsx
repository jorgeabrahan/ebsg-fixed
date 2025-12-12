import type { ComponentChildren } from "preact";
import { Toaster } from "sonner";

export const LayoutRoutes = ({ children }: { children: ComponentChildren }) => {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  );
};
