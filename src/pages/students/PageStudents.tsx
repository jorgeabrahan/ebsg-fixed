import ResourceList from "../../components/ResourceList";
import { STUDENT_TABLE_COLUMNS } from "../../lib/constants/tables";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageStudents = () => {
  return (
    <WrapperDelimiter>
      <ResourceList
        table="person_students"
        title="Estudiantes"
        columns={STUDENT_TABLE_COLUMNS}
        redirectCreate={ROUTES.studentsNew.path}
        redirectEdit={(id) => ROUTES.student.build(id)}
        sortableColumns={[
          {
            label: "Fecha de creación",
            value: "created_at",
          },
          {
            label: "Fecha de actualización",
            value: "updated_at",
          },
          {
            label: "Código",
            value: "code",
          },
          {
            label: "Nombre",
            value: "first_name",
          },
          {
            label: "Apellido",
            value: "last_name",
          },
        ]}
        searchableColumns={[
          "first_name",
          "last_name",
          "code"
        ]}
      />
    </WrapperDelimiter>
  );
};
