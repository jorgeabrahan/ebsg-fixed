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
  const { student, populateStudentInFields } = useStudentInFields(studentId);
  return (
    <WrapperDelimiter>
      <ResourceCreate<"school_enrollments">
        table="school_enrollments"
        fields={
          student != null
            ? populateStudentInFields(STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS)
            : STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS
        }
        redirectTo={
          studentId ? ROUTES.student.build(studentId) : ROUTES.students.path
        }
        submitLabel="Matricular estudiante"
      />
    </WrapperDelimiter>
  );
};
