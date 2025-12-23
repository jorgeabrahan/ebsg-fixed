import ResourceList from "../../components/ResourceList";
import { ROUTES } from "../../lib/constants/routes";
import { ACADEMIC_YEARS_TABLE_COLUMNS } from "../../lib/constants/tables";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageAcademicYears = () => {
  return (
    <WrapperDelimiter>
      <ResourceList
        table="school_academic_years"
        title="Años Escolares"
        columns={ACADEMIC_YEARS_TABLE_COLUMNS}
        redirectCreate={ROUTES.academicYearsNew.path}
        redirectEdit={(id) => ROUTES.academicYear.build(id)}
        order={{
          column: "year_label",
          ascending: false,
        }}
      />
    </WrapperDelimiter>
  );
};
