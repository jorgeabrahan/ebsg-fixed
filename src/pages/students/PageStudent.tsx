import { STUDENT_EDIT_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import ResourceEdit from "../../components/ResourceEdit";
import ResourceList from "../../components/ResourceList";
import { STUDENT_CONTACT_TABLE_COLUMNS } from "../../lib/constants/tables";
import { Tabs } from "../../components/Tabs";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

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
        <Tabs
          tabs={[
            {
              label: "Contactos",
              id: "contacts",
              isDefault: true,
              content: (
                <ResourceList
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
              label: "Matriculas",
              id: "enrollments",
            },
            {
              label: "Pagos",
              id: "payments",
            },
          ]}
        />
      )}
    </WrapperDelimiter>
  );
};
