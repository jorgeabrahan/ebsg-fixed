import ResourceEdit from "../../components/ResourceEdit";
import { ACADEMIC_YEARS_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageAcademicYear = ({
  academicYearId,
}: {
  academicYearId?: string;
}) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"school_academic_years">
        id={academicYearId}
        table="school_academic_years"
        fields={ACADEMIC_YEARS_BASE_FIELDS}
        redirectTo={ROUTES.academicYears.path}
        submitLabel="Editar grado"
      />
    </WrapperDelimiter>
  );
};
