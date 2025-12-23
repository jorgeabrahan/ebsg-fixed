import ResourceCreate from "../../components/ResourceCreate";
import { SCHOOL_GRADES_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageNewSchoolGrade = () => {
  return (
    <WrapperDelimiter>
      <ResourceCreate<"school_grades">
        table="school_grades"
        fields={SCHOOL_GRADES_BASE_FIELDS}
        redirectTo={ROUTES.schoolGrades.path}
        submitLabel="Agregar grado"
      />
    </WrapperDelimiter>
  );
};
