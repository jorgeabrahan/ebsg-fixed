import { STUDENT_EDIT_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import ResourceEdit from "../../components/ResourceEdit";
import ResourceList from "../../components/ResourceList";
import {
  STUDENT_CONTACT_TABLE_COLUMNS,
  STUDENT_SCHOOL_ENROLLMENTS_TABLE_COLUMNS,
} from "../../lib/constants/tables";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";
import { CTabs } from "../../components/CTabs";

export const PageStudent = ({ studentId }: { studentId?: string }) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"person_students">
        id={studentId}
        table="person_students"
        fields={STUDENT_EDIT_FIELDS}
        redirectTo={ROUTES.students.path}
        submitLabel="Editar estudiante"
      />

      {studentId && (
        <CTabs
          title="Tabs de estudiante"
          tabs={[
            {
              label: "Contactos",
              id: "contacts",
              isDefault: true,
              content: (
                <ResourceList
                  title="Contactos"
                  hideTitle
                  table="person_student_contacts"
                  columns={STUDENT_CONTACT_TABLE_COLUMNS}
                  select="*, person_contacts(*)"
                  where={[
                    {
                      column: "student_id",
                      operator: "eq",
                      value: studentId,
                    },
                  ]}
                  redirectCreate={`${ROUTES.studentContactsNew.build(studentId)}`}
                  redirectEdit={(id) =>
                    ROUTES.studentContact.build(studentId, id)
                  }
                />
              ),
            },
            {
              label: "Matrículas",
              id: "enrollments",
              isDefault: true,
              content: (
                <ResourceList
                  title="Matrículas"
                  hideTitle
                  table="school_enrollments"
                  columns={STUDENT_SCHOOL_ENROLLMENTS_TABLE_COLUMNS}
                  select="*, school_academic_years(year_label), school_grades(name)"
                  where={[
                    {
                      column: "student_id",
                      operator: "eq",
                      value: studentId,
                    },
                  ]}
                  redirectCreate={`${ROUTES.studentSchoolEnrollmentsNew.build(studentId)}`}
                  redirectEdit={(id) =>
                    ROUTES.studentSchoolEnrollment.build(studentId, id)
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
