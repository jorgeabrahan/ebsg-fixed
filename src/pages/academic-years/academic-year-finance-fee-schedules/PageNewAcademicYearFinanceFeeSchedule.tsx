import ResourceCreate from "../../../components/ResourceCreate";
import { useAcademicYearInFields } from "../../../hooks/useAcademicYearInFields";
import { ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";

export const PageNewAcademicYearFinanceFeeSchedule = ({
  academicYearId,
}: {
  academicYearId?: string;
}) => {
  const { populateAcademicYearInFields } =
    useAcademicYearInFields(academicYearId);
  return (
    <WrapperDelimiter>
      <ResourceCreate<"finance_fee_schedules">
        table="finance_fee_schedules"
        fields={
          academicYearId != null
            ? populateAcademicYearInFields(
                ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_BASE_FIELDS,
              )
            : ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_BASE_FIELDS
        }
        redirectTo={
          academicYearId
            ? ROUTES.academicYear.build(academicYearId)
            : ROUTES.academicYears.path
        }
        submitLabel="Agregar política financiera"
      />
    </WrapperDelimiter>
  );
};
