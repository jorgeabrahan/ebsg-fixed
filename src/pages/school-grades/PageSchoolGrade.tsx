import ResourceEdit from "../../components/ResourceEdit";
import { SCHOOL_GRADES_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageSchoolGrade = ({
  schoolGradeId,
}: {
  schoolGradeId?: string;
}) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"school_grades">
        id={schoolGradeId}
        table="school_grades"
        fields={SCHOOL_GRADES_BASE_FIELDS}
        redirectTo={ROUTES.schoolGrades.path}
        submitLabel="Editar grado"
      />
    </WrapperDelimiter>
  );
};
