import { STUDENT_EDIT_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import ResourceEdit from "../../components/ResourceEdit";
import ResourceList from "../../components/ResourceList";
import { STUDENT_CONTACT_TABLE_COLUMNS } from "../../lib/constants/tables";

export const PageStudent = ({ studentId }: { studentId?: string }) => {
  return (
    <>
      <ResourceEdit<"person_students">
        id={studentId}
        table="person_students"
        fields={STUDENT_EDIT_FIELDS}
        redirectTo={ROUTES.students.path}
        submitLabel="Editar estudiante"
      />

      {studentId && (
        <ResourceList
          table="person_student_contacts"
          columns={STUDENT_CONTACT_TABLE_COLUMNS}
          select="*, person_contacts(*)"
          where={[
            {
              operator: "eq",
              column: "student_id",
              value: studentId,
            },
          ]}
          redirectEdit={(id) => ROUTES.contact.build(id)}
        />
      )}
    </>
  );
};
