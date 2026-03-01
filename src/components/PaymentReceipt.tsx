import { useEffect } from "preact/hooks";
import { formatCurrencyHNL } from "../lib/constants/tables";
import html2pdf from "html2pdf.js";

interface ReceiptDetail {
  id: string;
  description: string;
  amount: number;
}

interface ReceiptData {
  schoolName: string;
  rtn: string;
  address: string;
  transactionId: number;
  studentName: string;
  grade: string;
  paymentDate: string;
  method: string;
  details: ReceiptDetail[];
}

export function PaymentReceipt({
  receipts,
}: {
  receipts: ReceiptData[];
}) {
  useEffect(() => {
    const element = document.getElementById("pdf-content");

    if (element) {
      html2pdf()
        .set({
          margin: 10,
          filename: `Factura-${receipts
            .map((r) => r.transactionId)
            .join("-")}.pdf`,
          image: { type: "png", quality: 1 },
          html2canvas: { scale: 3 },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
        })
        .from(element)
        .save();
    }
  }, []);

  return (
    <div id="pdf-content">
      {receipts.map((data, index) => {
        const subtotal = data.details.reduce(
          (acc, item) => acc + item.amount,
          0
        );

        return (
          <div
            key={index}
            class="bg-white p-10 max-w-4xl mx-auto"
            style={{
              pageBreakAfter:
                index !== receipts.length - 1
                  ? "always"
                  : "auto",
            }}
          >
            {/* LOGO */}
            <div class="flex justify-center mb-6">
              <img
                src="/ebsg_logo.png"
                alt="Logo Escuela"
                class="h-48 object-contain"
              />
            </div>

            {/* HEADER */}
            <div class="flex justify-between mb-8">
              <div>
                <h1 class="text-2xl font-bold text-blue-700">
                  {data.schoolName}
                </h1>
                <p class="text-gray-700">
                  RTN: {data.rtn}
                </p>
                <p class="text-gray-700">
                  {data.address}
                </p>
              </div>

              <div class="text-right">
                <p class="text-gray-600 font-medium">
                  Fecha
                </p>
                <p class="font-semibold text-gray-800">
                  {data.paymentDate}
                </p>

                <p class="text-gray-600 font-medium mt-3">
                  Factura #
                </p>
                <p class="font-semibold text-gray-800">
                  {data.transactionId}
                </p>
              </div>
            </div>

            {/* STUDENT INFO */}
            <div class="bg-gray-200 p-6 rounded mb-8 flex justify-between">
              <div>
                <p class="font-bold text-gray-900">
                  Alumno
                </p>
                <p class="text-gray-800">
                  {data.studentName}
                </p>
                <p class="text-gray-700">
                  Grado: {data.grade}
                </p>
              </div>

              <div class="text-right">
                <p class="font-bold text-gray-900">
                  Método de Pago
                </p>
                <p class="text-gray-800">
                  {data.method}
                </p>
                <p class="text-green-700 font-bold mt-3">
                  PAGADO
                </p>
              </div>
            </div>

            {/* TABLE */}
            <table class="w-full border-collapse text-gray-800">
              <thead>
                <tr class="border-b-2 border-blue-700">
                  <th class="text-left py-3 font-semibold">
                    #
                  </th>
                  <th class="text-left py-3 font-semibold">
                    Concepto
                  </th>
                  <th class="text-right py-3 font-semibold">
                    Monto
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.details.map((item, i) => (
                  <tr
                    key={item.id}
                    class="border-b border-gray-300"
                  >
                    <td class="py-3">{i + 1}</td>
                    <td class="py-3">
                      {item.description}
                    </td>
                    <td class="py-3 text-right font-medium">
                      {formatCurrencyHNL(
                        item.amount
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTAL */}
            <div class="flex justify-end mt-8">
              <div class="bg-blue-700 text-white px-8 py-5 rounded">
                <p class="text-sm opacity-90">
                  Total
                </p>
                <p class="text-2xl font-bold">
                  {formatCurrencyHNL(subtotal)}
                </p>
              </div>
            </div>

            {/* NOTES */}
            <div class="mt-10 text-sm text-gray-800">
              <p class="font-bold text-blue-700">
                Notas
              </p>
              <p class="italic">
                Este documento es un comprobante
                oficial de pago generado
                automáticamente por el sistema
                escolar.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}