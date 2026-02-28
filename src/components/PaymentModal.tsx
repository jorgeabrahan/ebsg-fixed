import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { isShowingPaymentModal, paymentModalOptions } from "../stores/paymentModal";
import { PrimaryButton } from "./PrimaryButton";
import { useState, useMemo } from "preact/hooks";
import { supabase } from "../config/supabase";

export function PaymentModal() {
  const charges = paymentModalOptions.value.charges || [];
  const studentId = paymentModalOptions.value.studentId;

  const [payments, setPayments] = useState([
    { method: "cash", amount: 0, reference: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const total = useMemo(() => {
    return charges.reduce(
      (sum, c) => sum + Number(c.amount_due ?? 0),
      0
    );
  }, [charges]);

  const enteredTotal = useMemo(() => {
    return payments.reduce(
      (sum, p) => sum + Number(p.amount ?? 0),
      0
    );
  }, [payments]);

  const remaining = total - enteredTotal;

  const isValid =
    enteredTotal > 0 &&
    enteredTotal <= total &&
    payments.every((p) => Number(p.amount) > 0);

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
    if (!isValid || !studentId) return;

    setLoading(true);

    try {
      for (const p of payments) {
        let remainingToApply = Number(p.amount);
        const allocations: { charge_id: number; amount: number }[] = [];

        for (const charge of charges) {
          if (remainingToApply <= 0) break;

          const chargeDue = Number(charge.amount_due ?? 0);
          if (chargeDue <= 0) continue;

          const amountApplied = Math.min(
            chargeDue,
            remainingToApply
          );

          allocations.push({
            charge_id: charge.id,
            amount: amountApplied,
          });

          remainingToApply -= amountApplied;
        }

        const { error } = await supabase.rpc(
          "create_finance_payment",
          {
            p_student_id: studentId,
            p_payment_date: new Date()
              .toISOString()
              .slice(0, 10),
            p_method: p.method,
            p_reference: p.reference || null,
            p_amount_total: p.amount,
            p_notes: null,
            p_allocations: allocations,
          }
        );

        if (error) throw error;
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
        <p class="font-semibold">
          Cargos seleccionados: {charges.length}
        </p>

        <p class="font-semibold mt-2">
          Total pendiente: L {total.toFixed(2)}
        </p>

        {/* Detalle de cargos */}
        <div class="mt-3 space-y-2">
          {charges.map((c) => (
            <div
              key={c.id}
              class="flex justify-between text-sm border-b pb-1"
            >
              <span>{c.description}</span>
              <span class="font-semibold">
                L {Number(c.amount_due ?? 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

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
                  min="0"
                  max={total}
                  onInput={(e: any) =>
                    updatePayment(
                      index,
                      "amount",
                      Number(e.target.value)
                    )
                  }
                  class="w-full border rounded px-2 py-1"
                />
              </div>

              {p.method === "transfer" && (
                <div class="mb-2">
                  <label class="block text-sm">
                    Referencia
                  </label>
                  <input
                    value={p.reference}
                    onInput={(e: any) =>
                      updatePayment(
                        index,
                        "reference",
                        e.target.value
                      )
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
            class="text-blue-500 text-sm"
            onClick={addPayment}
          >
            + Agregar método
          </button>
        </div>

        <div class="mt-4">
          <p>Total ingresado: L {enteredTotal.toFixed(2)}</p>

          <p
            class={
              remaining === 0
                ? "text-green-500 font-semibold"
                : remaining > 0
                ? "text-red-500 font-semibold"
                : "text-yellow-500 font-semibold"
            }
          >
            Restante por asignar: L {remaining.toFixed(2)}
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
          onClick={() =>
            (isShowingPaymentModal.value = false)
          }
        >
          Cancelar
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
}