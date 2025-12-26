import { Signal, signal } from "@preact/signals";

export const confirmationModalOptions: Signal<{
  title: string;
  body: string;
  onConfirm: () => void;
  onCancel?: () => void;
}> = signal({
  title: "",
  body: "",
  onConfirm: () => {},
  onCancel: () => {},
});

export const isShowingConfirmationModal: Signal<boolean> = signal(false);
