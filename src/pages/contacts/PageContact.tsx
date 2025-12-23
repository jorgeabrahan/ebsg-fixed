import ResourceEdit from "../../components/ResourceEdit";
import { CONTACT_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageContact = ({ contactId }: { contactId?: string }) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"person_contacts">
        id={contactId}
        table="person_contacts"
        fields={CONTACT_BASE_FIELDS}
        redirectTo={ROUTES.contacts.path}
        submitLabel="Editar contacto"
      />
    </WrapperDelimiter>
  );
};
