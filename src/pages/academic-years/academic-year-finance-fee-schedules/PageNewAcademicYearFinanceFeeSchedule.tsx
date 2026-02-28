import ResourceCreate from "../../../components/ResourceCreate";
import { useAcademicYearInFields } from "../../../hooks/useAcademicYearInFields";
import { ACADEMIC_YEAR_FINANCE_FEE_SCHEDULE_BASE_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";
import { insertMany } from "../../../services/ServiceInsertMany";

export const PageNewAcademicYearFinanceFeeSchedule = ({
  academicYearId,
}: {
  academicYearId?: string;
}) => {
  const { populateAcademicYearInFields } =
    useAcademicYearInFields(academicYearId);

  const onBeforeCreate = (entries: Record<string, any>) => {
    const { occurrences, ...schedule } = entries;
    return schedule; 
  };

  const onAfterCreate = async (
    createdSchedule: { id: number },
    rawEntries: Record<string, any>,
  ) => {
    const occurrences: string[] = rawEntries.occurrences ?? [];
    if (!occurrences.length) return;

    await insertMany(
      "finance_fee_schedule_occurrences",
      occurrences.map((date) => ({
        schedule_id: createdSchedule.id,
        due_date: date,
      })),
    );
  };

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
        onBeforeCreate={onBeforeCreate}
        onAfterCreate={onAfterCreate}
      />
    </WrapperDelimiter>
  );
};
