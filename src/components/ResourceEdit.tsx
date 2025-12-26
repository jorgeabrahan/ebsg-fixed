import { useEffect, useState } from "preact/hooks";
import type { FormDefinition } from "../lib/types/forms";
import type { PublicTable } from "../lib/types/request";
import { ServiceCRUD } from "../services/ServiceCRUD";
import { route } from "preact-router";
import { Form } from "./Form";
import { IconEditPencil } from "../icons/IconEditPencil";
import { UtilGeneral } from "../lib/utils/UtilGeneral";
import { toast } from "sonner";
import type { Tables } from "../lib/types/database.types";
import { isSelectField, isTextAreaField } from "../lib/typeGuards/forms";

export default function ResourceEdit<K extends PublicTable>({
  id,
  table,
  fields,
  redirectTo,
  submitLabel,
  select = "*",
}: {
  id?: string;
  table: K;
  fields: FormDefinition["fields"];
  redirectTo: string;
  submitLabel: string;
  select?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [clonedFields, setClonedFields] =
    useState<FormDefinition["fields"]>(fields);

  // LOAD THE ROW AND POPULATE THE FORM
  useEffect(() => {
    const fetchRow = async (id: string) => {
      const { isSuccess, data } = await ServiceCRUD.readOne<K>(table, {
        select,
        id: Number(id),
      });

      setIsLoading(false);

      if (!isSuccess || !data) {
        route(redirectTo, true);
        return;
      }

      setClonedFields((prevFields) =>
        prevFields.map((field) => {
          const raw = UtilGeneral.safeGet(data, field.name);
          if (raw == null) return field;
          if (
            !isSelectField(field) &&
            !isTextAreaField(field) &&
            field.type === "checkbox"
          ) {
            return {
              ...field,
              checked: !!raw,
            };
          }
          const normalized =
            typeof raw === "string" || typeof raw === "number"
              ? raw
              : String(raw);
          if (
            !isSelectField(field) &&
            !isTextAreaField(field) &&
            field.type === "reference" &&
            field?.table &&
            typeof field?.getReferenceLabel === "function"
          ) {
            const referenceData = data?.[field.table as keyof typeof data];
            const referenceLabel = field.getReferenceLabel(
              referenceData as unknown as Record<string, any>,
            );
            return {
              ...field,
              reference: normalized.toString(),
              value: referenceLabel,
            };
          }
          return {
            ...field,
            value: normalized,
          };
        }),
      );
    };

    if (!id) {
      route(redirectTo, true);
      return;
    }
    fetchRow(id);
  }, [id]);

  const onSubmit = async ({
    sanitizedEntries,
  }: {
    sanitizedEntries: Record<string, any>;
  }) => {
    if (!id) {
      toast.error("ID inválido, no se puede editar este recurso.");
      return;
    }

    const payload = {
      ...sanitizedEntries,
      id: Number(id),
    } as Tables<K>;

    const { isSuccess, error } = await ServiceCRUD.update<K>(table, payload);

    if (isSuccess && !error) {
      route(redirectTo);
      return;
    }

    toast.error(error?.message || "Ocurrió un error inesperado");
  };

  return (
    <Form
      fields={clonedFields}
      onSubmit={onSubmit}
      onCancel={() => route(redirectTo)}
      submitButton={
        <>
          <IconEditPencil />
          <span>{submitLabel}</span>
        </>
      }
      isDisabled={isLoading}
    />
  );
}
