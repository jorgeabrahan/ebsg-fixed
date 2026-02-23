import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { isShowingPaymentModal, paymentModalOptions } from "../stores/paymentModal";
import { PrimaryButton } from "./PrimaryButton";
import { useState, useMemo } from "preact/hooks";
import { supabase } from '../config/supabase';

export function PaymentModal() {
  const charges = paymentModalOptions.value.charges || [];
  const studentId = paymentModalOptions.value.studentId;

  const [payments, setPayments] = useState([
    { method: "cash", amount: 0, reference: "" },
  ]);

  const [loading, setLoading] = useState(false);

  // Total pendiente
  const total = useMemo(
    () =>
      charges.reduce((sum, c) => sum + Number(c.amount_due || 0), 0),
    [charges]
  );

  // Total ingresado
  const enteredTotal = useMemo(
    () =>
      payments.reduce((sum, p) => sum + Number(p.amount || 0), 0),
    [payments]
  );

  const remaining = total - enteredTotal;

  const isValid =
    enteredTotal > 0 &&
    enteredTotal <= total &&
    payments.every((p) => p.amount > 0);

  function updatePayment(index: number, field: string, value: any) {
    const copy = [...payments];
    copy[index] = { ...copy[index], [field]: value };
    setPayments(copy);
  }

  function addPayment() {
    setPayments([
      ...payments,
      { method: "cash", amount: 0, reference: "" },
    ]);
  }

  function removePayment(index: number) {
    setPayments(payments.filter((_, i) => i !== index));
  }

  async function handleConfirm() {
    if (!isValid) return;

    setLoading(true);

    try {
      for (const p of payments) {
        // 1️⃣ Crear transaction
        const { data: transaction, error } = await supabase
          .from("finance_transactions")
          .insert({
            student_id: studentId,
            amount_total: p.amount,
            method: p.method,
            reference: p.reference || null,
          })
          .select()
          .single();

        if (error) throw error;

        // 2️⃣ Distribuir allocations automáticamente
        let remainingToApply = p.amount;

        for (const charge of charges) {
          if (remainingToApply <= 0) break;

          const chargeDue = Number(charge.amount_due);

          const amountApplied = Math.min(chargeDue, remainingToApply);

          if (amountApplied > 0) {
            const { error: allocError } = await supabase
              .from("finance_transaction_allocations")
              .insert({
                transaction_id: transaction.id,
                charge_id: charge.id,
                amount_applied: amountApplied,
              });

            if (allocError) throw allocError;

            remainingToApply -= amountApplied;
          }
        }
      }

      isShowingPaymentModal.value = false;
      paymentModalOptions.value.onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Error al registrar el pago");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      show={isShowingPaymentModal.value}
      onClose={() => (isShowingPaymentModal.value = false)}
    >
      <ModalHeader>Crear pago</ModalHeader>

      <ModalBody>
        <p>Cargos seleccionados: {charges.length}</p>
        <p>Total pendiente: {total.toFixed(2)}</p>

        <div class="mt-4">
          {payments.map((p, index) => (
            <div key={index} class="border rounded p-3 mb-3">

              <div class="mb-2">
                <label class="block text-sm">Método</label>
                <select
                  value={p.method}
                  onChange={(e: any) =>
                    updatePayment(index, "method", e.target.value)
                  }
                  class="w-full border rounded px-2 py-1"
                >
                  <option value="cash">Efectivo</option>
                  <option value="transfer">Transferencia</option>
                </select>
              </div>

              <div class="mb-2">
                <label class="block text-sm">Monto</label>
                <input
                  type="number"
                  value={p.amount}
                  onInput={(e: any) =>
                    updatePayment(index, "amount", Number(e.target.value))
                  }
                  class="w-full border rounded px-2 py-1"
                />
              </div>

              {p.method === "transfer" && (
                <div class="mb-2">
                  <label class="block text-sm">Referencia</label>
                  <input
                    value={p.reference}
                    onInput={(e: any) =>
                      updatePayment(index, "reference", e.target.value)
                    }
                    class="w-full border rounded px-2 py-1"
                  />
                </div>
              )}

              {payments.length > 1 && (
                <button
                  type="button"
                  class="text-red-500 text-sm"
                  onClick={() => removePayment(index)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            class="text-blue-600 text-sm"
            onClick={addPayment}
          >
            + Agregar método
          </button>
        </div>

        <div class="mt-4">
          <p>Total ingresado: {enteredTotal.toFixed(2)}</p>
          <p
            class={
              remaining === 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            Restante por asignar: {remaining.toFixed(2)}
          </p>
        </div>
      </ModalBody>

      <ModalFooter>
        <PrimaryButton
          onClick={handleConfirm}
          disabled={!isValid || loading}
        >
          {loading ? "Guardando..." : "Confirmar"}
        </PrimaryButton>

        <PrimaryButton
          variant="muted"
          onClick={() => (isShowingPaymentModal.value = false)}
        >
          Cancelar
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
}
