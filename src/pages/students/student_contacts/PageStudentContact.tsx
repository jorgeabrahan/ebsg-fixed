import ResourceEdit from "../../../components/ResourceEdit";
import { STUDENT_CONTACT_EDIT_FIELDS } from "../../../lib/constants/forms";
import { ROUTES } from "../../../lib/constants/routes";
import { WrapperDelimiter } from "../../../wrappers/WrapperDelimiter";

export const PageStudentContact = ({
  studentId,
  contactId,
}: {
  studentId?: string;
  contactId?: string;
}) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"person_student_contacts">
        id={contactId}
        table="person_student_contacts"
        select="*, person_students(id, first_name, last_name), person_contacts(id, first_name, last_name)"
        fields={STUDENT_CONTACT_EDIT_FIELDS}
        redirectTo={
          studentId ? ROUTES.student.build(studentId) : ROUTES.students.path
        }
        submitLabel="Editar contacto"
      />
    </WrapperDelimiter>
  );
};
