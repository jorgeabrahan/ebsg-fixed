import { useEffect, useState } from "preact/hooks";
import type { PublicTable, ReadWhere } from "../lib/types/request";
import type { Tables } from "../lib/types/database.types";
import { ServiceCRUD } from "../services/ServiceCRUD";
import { Table } from "./Table";
import { toast } from "sonner";
import { route } from "preact-router";
import type { Column } from "../lib/types/tables";

export default function ResourceList<K extends PublicTable>({
  table,
  columns,
  title,
  redirectCreate,
  redirectEdit,
  select = "*",
  where = [],
  order = { column: "created_at", ascending: false },
}: {
  table: K;
  columns: Column[];
  title?: string;
  redirectCreate?: string;
  redirectEdit?: (id: number | string) => string;
  select?: string;
  where?: ReadWhere;
  order?: {
    column: string;
    ascending: boolean;
  };
}) {
  const [items, setItems] = useState<Tables<K>[]>([]);
  const fetchItems = async () => {
    const { isSuccess, data, error } = await ServiceCRUD.read<K>(table, {
      select,
      where,
      order,
    });

    if (isSuccess && data) {
      setItems(data);
    } else {
      toast.error(error?.message || "Ocurrió un error inesperado");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [table, select, JSON.stringify(where), order.column, order.ascending]);

  return (
    <Table
      title={title}
      table={table}
      columns={columns}
      items={items}
      onCreate={redirectCreate ? () => route(redirectCreate) : undefined}
      onEdit={
        redirectEdit ? (itemId) => route(redirectEdit(itemId)) : undefined
      }
      onReload={fetchItems}
    />
  );
}
