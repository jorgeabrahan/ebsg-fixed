import ResourceList from "../../components/ResourceList";
import { ROUTES } from "../../lib/constants/routes";
import { FINANCE_FEE_TYPES_TABLE_COLUMNS } from "../../lib/constants/tables";
import { WrapperDelimiter } from "../../wrappers/WrapperDelimiter";

export const PageFinanceFeeTypes = () => {
  return (
    <WrapperDelimiter>
      <ResourceList
        table="finance_fee_types"
        title="Tipos de pagos"
        columns={FINANCE_FEE_TYPES_TABLE_COLUMNS}
        redirectCreate={ROUTES.financeFeeTypesNew.path}
        redirectEdit={(id) => ROUTES.financeFeeType.build(id)}
      />
    </WrapperDelimiter>
  );
};
