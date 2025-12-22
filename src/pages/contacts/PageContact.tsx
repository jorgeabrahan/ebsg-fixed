import ResourceEdit from "../../components/ResourceEdit";
import { CONTACT_EDIT_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageContact = ({ contactId }: { contactId?: string }) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"person_contacts">
        id={contactId}
        table="person_contacts"
        fields={CONTACT_EDIT_FIELDS}
        redirectTo={ROUTES.contacts.path}
        submitLabel="Editar contacto"
      />
    </WrapperDelimiter>
  );
};
