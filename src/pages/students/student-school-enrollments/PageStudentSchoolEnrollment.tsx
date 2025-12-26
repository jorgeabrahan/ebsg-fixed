import ResourceEdit from "../../../components/ResourceEdit";
import { STUDENT_SCHOOL_ENROLLMENT_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";

export const PageStudentSchoolEnrollment = ({
  studentId,
  schoolEnrollmentId,
}: {
  studentId?: string;
  schoolEnrollmentId?: string;
}) => {
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
    </WrapperDelimiter>
  );
};
