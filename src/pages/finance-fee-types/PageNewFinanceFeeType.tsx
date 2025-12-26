import ResourceCreate from "../../components/ResourceCreate";
import { FINANCE_FEE_TYPES_BASE_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageNewFinanceFeeType = () => {
  const onBeforeCreate = (
    entries: Record<string, any>,
  ): [Record<string, any>, boolean] => {
    const rawName = entries?.name ?? "";
    const code = rawName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, "_")
      .toUpperCase();

    return [
      {
        ...entries,
        code,
      },
      true,
    ];
  };

  return (
    <WrapperDelimiter>
      <ResourceCreate<"finance_fee_types">
        table="finance_fee_types"
        fields={FINANCE_FEE_TYPES_BASE_FIELDS}
        redirectTo={ROUTES.financeFeeTypes.path}
        onBeforeCreate={onBeforeCreate}
        submitLabel="Agregar tipo de pago"
      />
    </WrapperDelimiter>
  );
};
