import ResourceCreate from "../../components/ResourceCreate";
import { ACADEMIC_YEARS_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageNewAcademicYear = () => {
  return (
    <WrapperDelimiter>
      <ResourceCreate<"school_academic_years">
        table="school_academic_years"
        fields={ACADEMIC_YEARS_BASE_FIELDS}
        redirectTo={ROUTES.academicYears.path}
        submitLabel="Agregar año"
      />
    </WrapperDelimiter>
  );
};
