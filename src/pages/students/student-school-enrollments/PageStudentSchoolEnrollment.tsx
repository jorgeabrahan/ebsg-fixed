import ResourceEdit from "../../../components/ResourceEdit";
import { STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";
import { CTabs } from "../../../components/CTabs";
import ResourceList from "../../../components/ResourceList";
import {
  FINANCE_CHARGES_TABLE_COLUMNS,
  FINANCE_TRANSACTIONS_TABLE_COLUMNS,
} from "../../../lib/constants/tables";
import { useState } from "preact/hooks";

import {
  isShowingPaymentModal,
  paymentModalOptions,
} from "../../../stores/paymentModal";
import { PrimaryButton } from "../../../components/PrimaryButton";

import type { Database } from "../../../lib/types/database.types";
import type { Charge } from "../../../stores/paymentModal";

type FinanceChargeWithBalance =
  Database["public"]["Views"]["finance_charges_with_balance"]["Row"];

export const PageStudentSchoolEnrollment = ({
  studentId,
  schoolEnrollmentId,
}: {
  studentId?: string;
  schoolEnrollmentId?: string;
}) => {
  const [selectedCharges, setSelectedCharges] =
    useState<FinanceChargeWithBalance[]>([]);

  return (
    <WrapperDelimiter>
      <ResourceEdit<"school_enrollments">
        id={schoolEnrollmentId}
        table="school_enrollments"
        select="*, person_students(id, first_name, last_name), school_academic_years(id, year_label), school_grades(id, name)"
        fields={STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS}
        redirectTo={
          studentId
            ? ROUTES.student.build(studentId)
            : ROUTES.students.path
        }
        submitLabel="Editar matrícula"
      />

      {schoolEnrollmentId && (
        <CTabs
          title="Detalles de matrícula"
          tabs={[
            {
              label: "Cargos",
              id: "charges",
              isDefault: true,
              content: (
                <>
                  <ResourceList
                    title="Cargos Financieros"
                    hideTitle
                    headerActions={
                      <PrimaryButton
                        size="lg"
                        className="ml-auto"
                        disabled={
                          selectedCharges.length === 0 || !studentId
                        }
                        onClick={() => {
                          if (!studentId) return;

                          const adaptedCharges: Charge[] = selectedCharges
                            .filter((c) => c.id !== null)
                            .map((c) => ({
                              id: c.id as number,
                              amount_due: Number(c.balance_due ?? 0),
                              description: c.description as string
                            }));

                          paymentModalOptions.value = {
                            studentId: Number(studentId),
                            charges: adaptedCharges,
                            onSuccess: () => {
                              setSelectedCharges([]);
                            },
                          };

                          isShowingPaymentModal.value = true;
                        }}
                      >
                        Crear pago
                      </PrimaryButton>
                    }
                    table="finance_charges_with_balance"
                    columns={FINANCE_CHARGES_TABLE_COLUMNS}
                    select={`
                      *,
                      finance_fee_types(name)
                    `}
                    where={[
                      {
                        column: "enrollment_id",
                        operator: "eq",
                        value: schoolEnrollmentId,
                      },
                      {
                        column: "status",
                        operator: "in",
                        value: ["open", "partially_paid"],
                      },
                    ]}
                    selectionEnabled
                    onSelectionChange={(_, items) =>
                      setSelectedCharges(
                        items as FinanceChargeWithBalance[]
                      )
                    }
                  />
                </>
              ),
            },

            ...(studentId
              ? [
                  {
                    label: "Pagos",
                    id: "payments",
                    content: (
                      <ResourceList
                        title="Pagos Financieros"
                        hideTitle
                        table="finance_transactions"
                        columns={FINANCE_TRANSACTIONS_TABLE_COLUMNS}
                        select={`
                          *,
                          finance_transaction_allocations(
                            amount_applied,
                            finance_charges(
                              id,
                              description,
                              period_month
                            )
                          )
                        `}
                        where={[
                          {
                            column: "student_id",
                            operator: "eq",
                            value: studentId,
                          },
                        ]}
                      />
                    ),
                  },
                ]
              : []),
          ]}
        />
      )}
    </WrapperDelimiter>
  );
};