import ResourceCreate from "../../../components/ResourceCreate";
import { STUDENT_CONTACT_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";
import { useStudentInFields } from "../../../hooks/useStudentInFields";

export const PageNewStudentContact = ({
  studentId,
}: {
  studentId?: string;
}) => {
  const { student, populateStudentInFields } = useStudentInFields(studentId);
  return (
    <WrapperDelimiter>
      <ResourceCreate<"person_student_contacts">
        table="person_student_contacts"
        fields={
          student != null
            ? populateStudentInFields(STUDENT_CONTACT_BASE_FIELDS)
            : STUDENT_CONTACT_BASE_FIELDS
        }
        redirectTo={
          studentId ? ROUTES.student.build(studentId) : ROUTES.students.path
        }
        submitLabel="Agregar contacto"
      />
    </WrapperDelimiter>
  );
};
