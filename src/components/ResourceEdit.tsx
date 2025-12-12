import { useEffect, useState } from "preact/hooks";
import type { FormDefinition } from "../lib/types/forms";
import type { PublicTable } from "../lib/types/request";
import { ServiceCRUD } from "../services/ServiceCRUD";
import { route } from "preact-router";
import { WrapperDelimiter } from "../wrappers/WrapperDelimiter";
import { Form } from "./Form";
import { IconEditPencil } from "../icons/IconEditPencil";
import { UtilGeneral } from "../lib/utils/UtilGeneral";
import { toast } from "sonner";
import type { Tables } from "../lib/types/database.types";

export default function ResourceEdit<K extends PublicTable>({
  id,
  table,
  fields,
  redirectTo,
  submitLabel,
}: {
  id?: string;
  table: K;
  fields: FormDefinition["fields"];
  redirectTo: string;
  submitLabel: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [clonedFields, setClonedFields] =
    useState<FormDefinition["fields"]>(fields);

  // LOAD THE ROW AND POPULATE THE FORM
  useEffect(() => {
    const fetchRow = async (id: string) => {
      const { isSuccess, data } = await ServiceCRUD.readOne<K>(table, {
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

          const normalized =
            typeof raw === "string" || typeof raw === "number"
              ? raw
              : String(raw);

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

  // SUBMIT: UPDATE THE RESOURCE
  const onSubmit = async ({
    sanitizedEntries,
  }: {
    sanitizedEntries: Record<string, any>;
  }) => {
    if (!id) {
      toast.error("ID inválido, no se puede editar este recurso.");
      return;
    }
    console.log(sanitizedEntries);

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
    <WrapperDelimiter>
      <Form
        className="my-10"
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
    </WrapperDelimiter>
  );
}
