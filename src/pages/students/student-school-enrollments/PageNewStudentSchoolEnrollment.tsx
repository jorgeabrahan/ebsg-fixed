import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";
import { STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS } from "../../../lib/constants/forms";
import ResourceCreate from "../../../components/ResourceCreate";
import { ROUTES } from "../../../lib/constants/routes";
import { useStudentInFields } from "../../../hooks/useStudentInFields";

export const PageNewStudentSchoolEnrollment = ({
  studentId,
}: {
  studentId?: string;
}) => {
  const { fields } = useStudentInFields(
    STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS,
    studentId,
  );
  return (
    <WrapperDelimiter>
      <ResourceCreate<"school_enrollments">
        table="school_enrollments"
        fields={fields}
        redirectTo={
          studentId ? ROUTES.student.build(studentId) : ROUTES.students.path
        }
        submitLabel="Matricular estudiante"
      />
    </WrapperDelimiter>
  );
};
