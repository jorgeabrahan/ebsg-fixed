import ResourceEdit from "../../../components/ResourceEdit";
import { STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";
import { CTabs } from "../../../components/CTabs";
import ResourceList from "../../../components/ResourceList";
import { FINANCE_CHARGES_TABLE_COLUMNS, FINANCE_TRANSACTIONS_TABLE_COLUMNS } from "../../../lib/constants/tables";
import { useState } from "preact/hooks";

import {
  isShowingPaymentModal,
  paymentModalOptions,
} from "../../../stores/paymentModal";
import { PrimaryButton } from "../../../components/PrimaryButton";

export const PageStudentSchoolEnrollment = ({
  studentId,
  schoolEnrollmentId,
}: {
  studentId?: string;
  schoolEnrollmentId?: string;
}) => {
  const [selectedCharges, setSelectedCharges] = useState<any[]>([]);

  return (
    <WrapperDelimiter>
      <ResourceEdit<"school_enrollments">
        id={schoolEnrollmentId}
        table="school_enrollments"
        select="*, person_students(id, first_name, last_name), school_academic_years(id, year_label), school_grades(id, name)"
        fields={STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS}
        redirectTo={
          studentId ? ROUTES.student.build(studentId) : ROUTES.students.path
        }
        submitLabel="Editar matricula"
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
                  <header className="flex items-center justify-between gap-2 pb-3">
                    <h2 className="text-3xl font-bold"></h2>

                    <PrimaryButton
                      size="lg"
                      disabled={
                        selectedCharges.length === 0 || !studentId
                      }
                      onClick={() => {
                        if (!studentId) return;

                        paymentModalOptions.value = {
                          studentId: Number(studentId), 
                          charges: selectedCharges.map((c) => ({
                            id: c.id,
                            amount_due: Number(c.amount_due),
                          })),
                          onSuccess: () => {
                            setSelectedCharges([]);
                            // aquí puedes disparar reload si tu ResourceList lo soporta
                          },
                        };

                        isShowingPaymentModal.value = true;
                      }}
                    >
                      Crear pago
                    </PrimaryButton>
                  </header>

                  <ResourceList
                    table="finance_charges"
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
                    ]}
                    selectionEnabled
                    onSelectionChange={(_, items) =>
                      setSelectedCharges(items)
                    }
                  />
                </>
              ),
            },
            {
              label: "Pagos",
              id: "payments",
              content: (
                <ResourceList
                  table="finance_transactions"
                  columns={FINANCE_TRANSACTIONS_TABLE_COLUMNS}
                  select={`
                    *,
                    finance_transaction_allocations(
                      amount_applied,
                      finance_charges(enrollment_id)
                    )
                  `}
                  where={[
                    {
                      column:
                        "finance_transaction_allocations.finance_charges.enrollment_id",
                      operator: "eq",
                      value: schoolEnrollmentId,
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      )}
    </WrapperDelimiter>
  );
};