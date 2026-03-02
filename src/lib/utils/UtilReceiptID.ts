import { supabase } from "../../config/supabase";

export async function UtilReceiptID(ids: number[]) {
  const { data, error } = await supabase
    .from("finance_transactions")
    .select(`
      id,
      payment_date,
      method,
      amount_total,
      person_students (
        first_name,
        last_name,
        school_enrollments (
          school_grades ( name )
        )
      ),
      finance_transaction_allocations (
        amount_applied,
        finance_charges ( description )
      )
    `)
    .in("id", ids);

  if (error || !data) throw error;

  return data.map((fullData) => {
    const student = Array.isArray(fullData.person_students)
      ? fullData.person_students[0]
      : fullData.person_students;

    const fullName = student
      ? `${student.first_name} ${student.last_name}`
      : "Estudiante";

    const enrollment = student?.school_enrollments?.[0];

    const gradeObj = Array.isArray(enrollment?.school_grades)
      ? enrollment.school_grades[0]
      : enrollment?.school_grades;

    const gradeName = gradeObj?.name ?? "Sin grado";

    return {
      schoolName: "Eden Billingual School Garden",
      rtn: "050119011352909",
      address: "Colonia Aurora 17 avenida entre 6 y 7 calle, Edificio 673",
      transactionId: fullData.id,
      studentName: fullName,
      grade: gradeName,
      paymentDate: fullData.payment_date,
      method:
        fullData.method === "cash"
          ? "Efectivo"
          : "Transferencia",
      details:
        fullData.finance_transaction_allocations.map((a: any) => ({
          id: crypto.randomUUID(),
          description: a.finance_charges.description,
          amount: a.amount_applied,
        })),
    };
  });
}