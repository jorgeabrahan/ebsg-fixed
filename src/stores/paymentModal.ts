import { signal } from "@preact/signals";

export type Charge = {
  id: number;
  amount_due: number;
  description: string;
};

type PaymentModalOptions = {
  studentId: number | null;
  charges: Charge[];
  onSuccess?: () => void;
};

export const isShowingPaymentModal = signal(false);

export const paymentModalOptions = signal<PaymentModalOptions>({
  studentId: null,
  charges: [],
});