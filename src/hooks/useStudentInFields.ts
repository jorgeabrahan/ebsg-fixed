import { useEffect, useState } from "preact/hooks";
import type { FormDefinition, TextField } from "../lib/types/forms";
import { ServiceCRUD } from "../services/ServiceCRUD";

export const useStudentInFields = (
  fields: FormDefinition["fields"],
  studentId?: string,
) => {
  const [fieldsCopy, setFieldsCopy] =
    useState<FormDefinition["fields"]>(fields);
  useEffect(() => {
    const studentField = fieldsCopy.find((f) => f.id === "student_id") as
      | TextField
      | undefined;
    const fetchStudent = async (id: string, studentField: TextField) => {
      const { data, isSuccess } = await ServiceCRUD.readOne("person_students", {
        id: Number(id),
        select: studentField.select,
      });
      if (!isSuccess || !data) {
        return;
      }
      setFieldsCopy((prev) =>
        prev.map((f) => {
          if (f.id != "student_id") return f;
          const field = f as TextField;
          return {
            ...field,
            value: field?.getReferenceLabel?.(data as Record<string, any>),
            reference: data?.id?.toString(),
          };
        }),
      );
    };
    if (!studentId || !studentField) {
      return;
    }
    fetchStudent(studentId, studentField);
  }, [studentId]);
  return { fields: fieldsCopy };
};
