import { useEffect, useState } from "preact/hooks";
import type { PublicTable, ReadWhere } from "../lib/types/request";
import type { Tables } from "../lib/types/database.types";
import { ServiceCRUD } from "../services/ServiceCRUD";
import { Table } from "./Table";
import { toast } from "sonner";
import { route } from "preact-router";
import type { Column } from "../lib/types/tables";
import { Pagination } from "flowbite-react";
import { Select } from "./Select";

export default function ResourceList<K extends PublicTable>({
  table,
  columns,
  title,
  redirectCreate,
  redirectEdit,
  select = "*",
  where = [],
  order = { column: "created_at", ascending: false },
  pageSize = 20,
  sortableColumns = [],
  selectionEnabled = false,
  onSelectionChange,
  headerActions,
  hideTitle = false
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
  pageSize?: number;
  sortableColumns?: { value: string; label: string }[];
  selectionEnabled?: boolean;
  onSelectionChange?: (ids: string[], items: Record<string, any>[]) => void;
  headerActions?: preact.ComponentChildren;
  hideTitle?: boolean;
}) {
  const [items, setItems] = useState<Tables<K>[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const [orderBy, setOrderBy] = useState(order.column);
  const [ascending, setAscending] = useState(order.ascending);

  const fetchItems = async () => {
    const { isSuccess, data, error, count } = await ServiceCRUD.read<K>(table, {
      select,
      where,
      pagination: { page, pageSize },
      order: {
        column: orderBy,
        ascending,
      },
    });

    if (isSuccess && data) {
      setItems(data);
      setTotalCount(count ?? 0);
    } else {
      toast.error(error?.message || "Ocurrió un error inesperado");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [
    table,
    select,
    JSON.stringify(where),
    orderBy,
    ascending,
    page,
    pageSize,
  ]);
  return (
    <>
      {sortableColumns.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6 md:mb-3">
          <Select
            id={`orderBy${table}`}
            name={`orderBy${table}`}
            label="Ordenar por"
            value={orderBy}
            handleValueChange={(value) => {
              setPage(1);
              setOrderBy(value);
            }}
            options={sortableColumns}
            variant="md"
          />
          <Select
            id={`orderBy${table}`}
            name={`orderBy${table}`}
            label=""
            value={ascending ? "asc" : "desc"}
            handleValueChange={(value) => {
              setPage(1);
              setAscending(value === "asc");
            }}
            options={[
              {
                label: "Ascendente",
                value: "asc",
              },
              {
                label: "Descendente",
                value: "desc",
              },
            ]}
            variant="md"
          />
        </div>
      )}

      <Table
        title={title}
        hideTitle={hideTitle}
        headerActions={headerActions}
        table={table}
        columns={columns}
        items={items}
        onCreate={redirectCreate ? () => route(redirectCreate) : undefined}
        onEdit={
          redirectEdit ? (itemId) => route(redirectEdit(itemId)) : undefined
        }
        onReload={fetchItems}
        isSelectable={selectionEnabled}
        onSelectionChange={onSelectionChange}
      />

      {totalPages > 1 && (
        <div className="flex justify-end overflow-x-auto mt-4">
          <Pagination
            className={
              "[&_button]:bg-dark-925 [&_button]:enabled:hover:bg-dark-900 [&_button]:border-none [&_li[aria-current]>button]:bg-dark-900"
            }
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div>
      )}
    </>
  );
}
