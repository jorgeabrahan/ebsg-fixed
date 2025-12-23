import { useEffect, useState } from "preact/hooks";
import ResourceCreate from "../../../components/ResourceCreate";
import { STUDENT_CONTACT_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";
import { ServiceCRUD } from "../../../services/ServiceCRUD";
import type { Tables } from "../../../lib/types/database.types";
import type { FormDefinition } from "../../../lib/types/forms";

export const PageNewStudentContact = ({
  studentId,
}: {
  studentId?: string;
}) => {
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
  const populateStudent = (): FormDefinition["fields"] => {
    return STUDENT_CONTACT_BASE_FIELDS.map((f) => {
      if (f.id != "student_id") return f;
      return {
        ...f,
        value: `${student?.first_name} ${student?.last_name}`,
        reference: student?.id?.toString(),
      };
    });
  };
  return (
    <WrapperDelimiter>
      <ResourceCreate<"person_student_contacts">
        table="person_student_contacts"
        fields={
          student != null ? populateStudent() : STUDENT_CONTACT_BASE_FIELDS
        }
        redirectTo={
          studentId ? ROUTES.student.build(studentId) : ROUTES.students.path
        }
        submitLabel="Agregar contacto"
      />
    </WrapperDelimiter>
  );
};
