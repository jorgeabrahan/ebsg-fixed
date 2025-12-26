import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import {
  confirmationModalOptions,
  isShowingConfirmationModal,
} from "../stores/confirmationModal";
import { PrimaryButton } from "./PrimaryButton";

export function ConfirmationModal() {
  return (
    <>
      <Modal
        className={
          "[&]:bg-dark/20 backdrop-blur-md [&>div>div]:bg-dark-925  [&>div>div]:text-contrast [&>div>div_div]:border-none"
        }
        show={isShowingConfirmationModal.value}
        onClose={() => confirmationModalOptions.value.onCancel?.()}
      >
        <ModalHeader>{confirmationModalOptions.value.title}</ModalHeader>
        <ModalBody>
          <p>{confirmationModalOptions.value.body}</p>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton
            size="lg"
            onClick={() => {
              isShowingConfirmationModal.value = false;
              confirmationModalOptions.value.onConfirm?.();
            }}
          >
            <span>Confirmar</span>
          </PrimaryButton>
          <PrimaryButton
            variant="muted"
            size="lg"
            onClick={() => {
              isShowingConfirmationModal.value = false;
              confirmationModalOptions.value.onCancel?.();
            }}
          >
            <span>Cancelar</span>
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
