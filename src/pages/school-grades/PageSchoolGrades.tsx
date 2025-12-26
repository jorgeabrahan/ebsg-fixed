import ResourceList from "../../components/ResourceList";
import { ROUTES } from "../../lib/constants/routes";
import { SCHOOL_GRADES_TABLE_COLUMNS } from "../../lib/constants/tables";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageSchoolGrades = () => {
  return (
    <WrapperDelimiter>
      <ResourceList
        table="school_grades"
        title="Grados Escolares"
        columns={SCHOOL_GRADES_TABLE_COLUMNS}
        redirectCreate={ROUTES.schoolGradesNew.path}
        redirectEdit={(id) => ROUTES.schoolGrade.build(id)}
        order={{
          column: "name",
          ascending: true,
        }}
      />
    </WrapperDelimiter>
  );
};
