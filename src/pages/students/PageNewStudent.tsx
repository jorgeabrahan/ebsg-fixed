import { STUDENT_CREATE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import ResourceCreate from "../../components/ResourceCreate";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageNewStudent = () => {
  return (
    <WrapperDelimiter>
      <ResourceCreate<"person_students">
        table="person_students"
        fields={STUDENT_CREATE_FIELDS}
        redirectTo={ROUTES.students.path}
        submitLabel="Agregar estudiante"
      />
    </WrapperDelimiter>
  );
};
