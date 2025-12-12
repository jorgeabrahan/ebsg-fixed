import { STUDENT_CREATE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import ResourceCreate from "../../components/ResourceCreate";

export const PageNewStudent = () => {
  return (
    <>
      <ResourceCreate<"person_students">
        table="person_students"
        fields={STUDENT_CREATE_FIELDS}
        redirectTo={ROUTES.students.path}
        submitLabel="Agregar estudiante"
      />
    </>
  );
};
