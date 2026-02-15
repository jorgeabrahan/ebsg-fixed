import ResourceEdit from "../../../components/ResourceEdit";
import { ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_EDIT_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";

export const PageAcademicYearFinanceFeeSchedule = ({
  academicYearId,
  financeFeeScheduleId,
}: {
  academicYearId: string;
  financeFeeScheduleId: string;
}) => {
  const onBeforeUpdate = (entries: Record<string, any>) => {
    const { occurrences, ...schedule } = entries;
    return schedule;
  };

  return (
    <WrapperDelimiter>
      <ResourceEdit<"finance_fee_schedules">
        id={financeFeeScheduleId}
        table="finance_fee_schedules"
        select="*, school_academic_years(id, year_label), finance_fee_types(id, code, periodicity), school_grades(id, name)"
        fields={ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_EDIT_FIELDS}
        redirectTo={
          academicYearId
            ? ROUTES.academicYear.build(academicYearId)
            : ROUTES.academicYears.path
        }
        submitLabel="Editar política"
        onBeforeUpdate={onBeforeUpdate}
      />
    </WrapperDelimiter>
  );
};
