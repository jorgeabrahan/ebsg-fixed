import type { ComponentChildren } from "preact";
import { Toaster } from "sonner";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { PaymentModal } from "../components/PaymentModal"

export const LayoutRoutes = ({ children }: { children: ComponentChildren }) => {
  return (
    <>
      {children}
      <ConfirmationModal />
      <PaymentModal />
      <Toaster position="top-center" richColors />
    </>
  );
};
