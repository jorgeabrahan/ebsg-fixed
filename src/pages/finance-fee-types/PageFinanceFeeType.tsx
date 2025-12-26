import ResourceEdit from "../../components/ResourceEdit";
import { FINANCE_FEE_TYPES_EDIT_FIELDS } from "../../lib/constants/forms";
import { ROUTES } from "../../lib/constants/routes";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageFinanceFeeType = ({
  financeFeeTypeId,
}: {
  financeFeeTypeId?: string;
}) => {
  return (
    <WrapperDelimiter>
      <ResourceEdit<"finance_fee_types">
        id={financeFeeTypeId}
        table="finance_fee_types"
        fields={FINANCE_FEE_TYPES_EDIT_FIELDS}
        redirectTo={ROUTES.financeFeeTypes.path}
        submitLabel="Editar tipo de pago"
      />
    </WrapperDelimiter>
  );
};
