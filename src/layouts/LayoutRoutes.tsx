import type { ComponentChildren } from "preact";
import { Toaster } from "sonner";
import { ConfirmationModal } from "../components/ConfirmationModal";

export const LayoutRoutes = ({ children }: { children: ComponentChildren }) => {
  return (
    <>
      {children}
      <ConfirmationModal />
      <Toaster position="top-center" richColors />
    </>
  );
};
