import { useState } from "preact/hooks";
import { ServiceCRUD } from "../services/ServiceCRUD";
import type { Tables } from "../lib/types/database.types";
import type { PublicTable } from "../lib/types/request";
import { route } from "preact-router";
import { toast } from "sonner";
import { Form } from "./Form";
import type { FormDefinition } from "../lib/types/forms";
import { IconUserPlus } from "../icons/IconUserPlus";

export default function ResourceCreate<K extends PublicTable>({
  table,
  fields,
  redirectTo,
  submitLabel,
  onBeforeCreate = (entries) => [entries, true],
}: {
  table: K;
  fields: FormDefinition["fields"];
  redirectTo: string;
  submitLabel: string;
  onBeforeCreate?: (
    entries: Record<string, any>,
  ) => [Record<string, any>, boolean];
}) {
  const [isCreating, setIsCreating] = useState(false);
  const onSubmit = async ({
    sanitizedEntries,
  }: {
    sanitizedEntries: Record<string, any>;
  }) => {
    const [entries, shouldSubmit] = onBeforeCreate(sanitizedEntries);
    if (!shouldSubmit) return;
    setIsCreating(true);
    const { isSuccess, error } = await ServiceCRUD.create<K>(
      table,
      entries as Tables<typeof table>,
    );
    setIsCreating(false);
    if (isSuccess && error == null) {
      route(redirectTo);
      return;
    }
    toast.error(error?.message || "Ocurrió un error inesperado");
  };
  return (
    <Form
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
  );
}
