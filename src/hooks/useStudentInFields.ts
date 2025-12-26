import { useEffect, useState } from "preact/hooks";
import type { FormDefinition } from "../lib/types/forms";
import { ServiceCRUD } from "../services/ServiceCRUD";
import type { Tables } from "../lib/types/database.types";

export const useStudentInFields = (studentId?: string) => {
  const [student, setStudent] = useState<Pick<
    Tables<"person_students">,
    "id" | "first_name" | "last_name"
  > | null>(null);
  useEffect(() => {
    const fetchStudent = async (id: string) => {
      const { data, isSuccess } = await ServiceCRUD.readOne("person_students", {
        id: Number(id),
        select: "id, first_name, last_name",
      });
      if (!isSuccess || !data) {
        return;
      }
      setStudent(data);
    };
    if (!studentId) {
      return;
    }
    fetchStudent(studentId);
  }, [studentId]);
  const populateStudentInFields = (
    fields: FormDefinition["fields"],
  ): FormDefinition["fields"] => {
    return fields.map((f) => {
      if (f.id != "student_id") return f;
      return {
        ...f,
        value: `${student?.first_name} ${student?.last_name}`,
        reference: student?.id?.toString(),
      };
    });
  };
  return {
    student,
    populateStudentInFields,
  };
};
