import ResourceList from "../../components/ResourceList";
import { ROUTES } from "../../lib/constants/routes";
import { CONTACT_TABLE_COLUMNS } from "../../lib/constants/tables";

export const PageContacts = () => {
  return (
    <ResourceList
      table="person_contacts"
      title="Contactos"
      columns={CONTACT_TABLE_COLUMNS}
      redirectCreate={ROUTES.contactsNew.path}
      redirectEdit={(id) => ROUTES.contact.build(id)}
    />
  );
};
