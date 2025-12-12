import { useState } from "preact/hooks";
import { ServiceCRUD } from "../services/ServiceCRUD";
import type { Tables } from "../lib/types/database.types";
import type { PublicTable } from "../lib/types/request";
import { route } from "preact-router";
import { toast } from "sonner";
import { WrapperDelimiter } from "../wrappers/WrapperDelimiter";
import { Form } from "./Form";
import type { FormDefinition } from "../lib/types/forms";
import { IconUserPlus } from "../icons/IconUserPlus";

export default function ResourceCreate<K extends PublicTable>({
  table,
  fields,
  redirectTo,
  submitLabel,
}: {
  table: K;
  fields: FormDefinition["fields"];
  redirectTo: string;
  submitLabel: string;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const onSubmit = async ({
    sanitizedEntries,
  }: {
    sanitizedEntries: Record<string, any>;
  }) => {
    setIsCreating(true);
    const { isSuccess, error } = await ServiceCRUD.create<K>(
      table,
      sanitizedEntries as Tables<typeof table>,
    );
    setIsCreating(false);
    if (isSuccess && error == null) {
      route(redirectTo);
      return;
    }
    toast.error(error?.message || "Ocurrió un error inesperado");
  };
  return (
    <WrapperDelimiter>
      <Form
        className="my-10"
        fields={fields}
        onSubmit={onSubmit}
        onCancel={() => route(redirectTo)}
        submitButton={
          <>
            <IconUserPlus />
            <span>{submitLabel}</span>
          </>
        }
        isDisabled={isCreating}
      />
    </WrapperDelimiter>
  );
}
