import ResourceCreate from "../../components/ResourceCreate";
import { CONTACT_CREATE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";

export const PageNewContact = () => {
  return (
    <>
      <ResourceCreate<"person_contacts">
        table="person_contacts"
        fields={CONTACT_CREATE_FIELDS}
        redirectTo={ROUTES.contacts.path}
        submitLabel="Agregar estudiante"
      />
    </>
  );
};
