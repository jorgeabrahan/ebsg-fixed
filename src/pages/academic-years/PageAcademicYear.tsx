import { CTabs } from "../../components/CTabs";
import ResourceEdit from "../../components/ResourceEdit";
import ResourceList from "../../components/ResourceList";
import { ACADEMIC_YEARS_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { ACADEMIC_YEAR_FINANCE_FEE_SCHEDULES_TABLE_COLUMNS } from "../../lib/constants/tables";
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
        submitLabel="Editar año"
      />
      {academicYearId && (
        <CTabs
          title="Tabs de año academico"
          tabs={[
            {
              label: "Políticas financieras",
              id: "finance_fee_schedules",
              isDefault: true,
              content: (
                <ResourceList
                  table="finance_fee_schedules"
                  columns={ACADEMIC_YEAR_FINANCE_FEE_SCHEDULES_TABLE_COLUMNS}
                  select="*, school_grades(name), finance_fee_types(name, periodicity)"
                  where={[
                    {
                      column: "year_id",
                      operator: "eq",
                      value: academicYearId,
                    },
                  ]}
                  redirectCreate={`${ROUTES.academicYearFinanceFeeSchedulesNew.build(academicYearId)}`}
                  redirectEdit={(id) =>
                    ROUTES.academicYearFinanceFeeSchedule.build(
                      academicYearId,
                      id,
                    )
                  }
                />
              ),
            },
          ]}
        />
      )}
    </WrapperDelimiter>
  );
};
