import ResourceCreate from "../../components/ResourceCreate";
import { CONTACT_CREATE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageNewContact = () => {
  return (
    <WrapperDelimiter>
      <ResourceCreate<"person_contacts">
        table="person_contacts"
        fields={CONTACT_CREATE_FIELDS}
        redirectTo={ROUTES.contacts.path}
        submitLabel="Agregar contacto"
      />
    </WrapperDelimiter>
  );
};
