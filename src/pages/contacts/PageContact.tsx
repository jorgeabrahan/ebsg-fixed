import ResourceEdit from "../../components/ResourceEdit";
import { CONTACT_EDIT_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";

export const PageContact = ({ contactId }: { contactId?: string }) => {
  return (
    <>
      <ResourceEdit<"person_contacts">
        id={contactId}
        table="person_contacts"
        fields={CONTACT_EDIT_FIELDS}
        redirectTo={ROUTES.contacts.path}
        submitLabel="Editar contacto"
      />
    </>
  );
};
