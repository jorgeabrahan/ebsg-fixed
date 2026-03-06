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
  onBeforeCreate,
  onAfterCreate,
}: {
  table: K;
  fields: FormDefinition["fields"];
  redirectTo: string;
  submitLabel: string;
  onBeforeCreate?: (
    entries: Record<string, any>,
  ) => Record<string, any> | [Record<string, any>, boolean];
  onAfterCreate?: (
    created: Tables<K>,
    rawEntries: Record<string, any>,
  ) => Promise<void>;
}) {
  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async ({
    sanitizedEntries,
  }: {
    sanitizedEntries: Record<string, any>;
  }) => {

    let entries: Record<string, any> = sanitizedEntries;
    let shouldSubmit = true;

    try {
      if (onBeforeCreate) {
        const result = onBeforeCreate(sanitizedEntries);

        if (Array.isArray(result)) {
          const [processedEntries, submit] = result;

          entries = processedEntries;
          shouldSubmit = submit;
        } else {
          entries = result;
        }
      }
    } catch (e: any) {
      toast.error(e?.message || "Error al preparar los datos");
      return;
    }

    if (!shouldSubmit) return;

    setIsCreating(true);

    const { isSuccess, data, error } = await ServiceCRUD.create<K>(
      table,
      entries as Tables<K>,
    );

    if (!isSuccess || !data) {
      setIsCreating(false);
      toast.error(error?.message || "Ocurrió un error inesperado");
      return;
    }

    try {
      if (onAfterCreate) {
        await onAfterCreate(data, sanitizedEntries);
      }

      route(redirectTo);
    } catch (e: any) {
      toast.error(e?.message || "Error al procesar datos relacionados");
    } finally {
      setIsCreating(false);
    }
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