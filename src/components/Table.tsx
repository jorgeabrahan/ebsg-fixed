import { type ComponentChildren, type TargetedMouseEvent } from "preact";
import { IconMoreHoriz } from "../icons/IconMoreHoriz";
import { COLUMN_FORMATS, MORE_ACTIONS } from "../lib/constants/tables";
import type {
  Column,
  ColumnFormat,
  ContextMenuAction,
} from "../lib/types/tables";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { SimpleContextMenu } from "./SimpleContextMenu";
import { PrimaryButton } from "./PrimaryButton";
import { IconPlus } from "../icons/IconPlusCircle";
import {
  confirmationModalOptions,
  isShowingConfirmationModal,
} from "../stores/confirmationModal";
import { ServiceCRUD } from "../services/ServiceCRUD";
import type { PublicTable } from "../lib/types/request";
import { toast } from "sonner";

const TableCell = ({
  label,
  children,
}: {
  label?: string;
  children: ComponentChildren;
}) => {
  return (
    <div
      className={`flex justify-between ${label ? "items-center md:items-start" : "items-end md:justify-center"} md:flex-col p-4`}
    >
      {label && (
        <span
          className={
            "block md:hidden text-sm md:text-[10px] text-dark-400 mb-1"
          }
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
};

export const Table = ({
  table,
  title,
  columns = [],
  items = [],
  isSelectable = true,
  isDeletable = true,
  onCreate,
  onEdit,
  onReload,
}: {
  table: PublicTable;
  title?: string;
  columns: Column[];
  items: Record<string, any>[];
  isSelectable?: boolean;
  isDeletable?: boolean;
  onCreate?: () => any;
  onEdit?: (id: string) => any;
  onReload: () => Promise<void>;
}) => {
  const refContextMenu = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    itemId: string;
  } | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const isCreatable = onCreate != null;
  const isEditable = onEdit != null;
  const hasActions = isDeletable || isEditable;

  const TABLE_COLUMN_STYLES = {
    gridTemplateColumns: `${isSelectable ? "50px" : ""} ${columns.map((col) => `minmax(${col?.minWidth || "200px"}, ${col?.maxWidth || "1fr"})`).join(" ")} ${hasActions ? "100px" : ""}`,
  };
  const getMoreActions = () => {
    const temp: ContextMenuAction[] = [];
    if (isEditable) temp.push(MORE_ACTIONS.edit);
    if (isDeletable) temp.push(MORE_ACTIONS.delete);
    return temp;
  };
  const formatCellValue = (value: any, format: ColumnFormat) => {
    const isString = typeof value === "string";
    if (format === COLUMN_FORMATS.date && isString) {
      return new Date(value).toDateString();
    }
    return value;
  };
  const onToggleActions = (
    e: TargetedMouseEvent<HTMLButtonElement>,
    item: Record<string, any>,
  ) => {
    if (contextMenu != null && contextMenu.itemId === item.id) {
      setContextMenu(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const contextMenuElement = refContextMenu.current;
    // Dimensiones del viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Dimensiones aproximadas del menú (si no existe aún, usa un tamaño por defecto)
    const menuWidth = contextMenuElement?.offsetWidth;
    const menuHeight = contextMenuElement?.offsetHeight;
    if (!menuWidth || !menuHeight) return;
    const offset = 8;
    // Posición base (por defecto, debajo y a la derecha del botón)
    let x = rect.left + rect.width;
    let y = rect.bottom + offset;

    // Edge avoidance horizontal
    if (x + menuWidth > viewportWidth - 8) {
      x = rect.right - menuWidth; // mostrar hacia la izquierda
    }

    // Edge avoidance vertical
    if (y + menuHeight > viewportHeight - 8) {
      y = rect.top - (menuHeight + offset); // mostrar arriba
    }

    setContextMenu({ x, y, itemId: item.id });
  };
  const onToggleSelectItem = useCallback(
    (itemId: string) => {
      if (!itemId) return;
      if (selectedItems.find((id) => id === itemId)) {
        setSelectedItems((prev) => prev.filter((id) => id !== itemId));
        return;
      }
      setSelectedItems((prev) => [...prev, itemId]);
    },
    [contextMenu, selectedItems],
  );
  const onSelectAllItems = useCallback(() => {
    if (items.length == 0) return;
    if (selectedItems.length > 0 && items.length === selectedItems.length) {
      setSelectedItems([]);
      return;
    }
    setSelectedItems(items.map((item) => item.id));
  }, [items, selectedItems]);
  const askForDeleteConfirmation = (id: string) => {
    confirmationModalOptions.value = {
      title: "Confirmar eliminación",
      body: `¿Estás seguro de que deseas eliminar el elemento con id ${id} de la tabla ${title}?`,
      onConfirm: async () => {
        setIsLoading(true);
        const toastId = toast.loading("Eliminando elemento...");
        const { isSuccess, error } = await ServiceCRUD.delete(table, id);
        if (isSuccess && error == null) {
          console.log("a? ", toastId);
          toast.success(`Elemento con id ${id} eliminado correctamente`, {
            id: toastId,
          });
          await onReload();
        } else {
          toast.error(`Error al eliminar elemento con id ${id}`, {
            id: toastId,
          });
        }
        setIsLoading(false);
      },
    };
    isShowingConfirmationModal.value = true;
  };
  const resetContextMenu = useCallback(() => {
    setContextMenu(null);
  }, [setContextMenu]);
  useEffect(() => {
    window.addEventListener("resize", resetContextMenu);
    window.addEventListener("scroll", resetContextMenu);
    return () => {
      window.removeEventListener("resize", resetContextMenu);
      window.removeEventListener("scroll", resetContextMenu);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Si el menú no está abierto, no hacemos nada
      if (!contextMenu) return;

      const contextMenuElement = refContextMenu.current;
      if (!contextMenuElement) return;
      const target = e.target as HTMLElement;

      // Si el click fue dentro del menú, no lo cerramos
      if (contextMenuElement.contains(target)) return;

      if (target.closest("[data-action-btn]")) return;

      // Cerrar el menú
      setContextMenu(null);
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);
  return (
    <>
      <section>
        {((title != null && title.length > 0) || isCreatable) && (
          <header className={"flex items-center justify-between gap-2 pb-3"}>
            <h2 className="text-3xl font-bold">{title}</h2>
            {isCreatable && (
              <PrimaryButton
                size="lg"
                onClick={() => onCreate()}
                disabled={isLoading}
              >
                <IconPlus size={22} strokeWidth={2} />
                <span>Nuevo</span>
              </PrimaryButton>
            )}
          </header>
        )}
        <div
          className={"overflow-x-auto hide-scrollbar"}
          onScroll={resetContextMenu}
        >
          <div
            className={"hidden md:grid font-semibold"}
            style={TABLE_COLUMN_STYLES}
          >
            {isSelectable && (
              <div className={"px-4 py-2 text-sm border-b border-dark-100"}>
                <input
                  name="selectAll"
                  id="selectAll"
                  type="checkbox"
                  checked={
                    items.length === selectedItems.length && items.length > 0
                  }
                  onChange={onSelectAllItems}
                />
              </div>
            )}
            {columns.map((col) => (
              <h2 className={"px-4 py-2 text-sm border-b border-dark-100"}>
                {col.label}
              </h2>
            ))}
            {hasActions && (
              <h2 className={"px-4 py-2 text-sm border-b border-dark-100"}>
                Acciones
              </h2>
            )}
          </div>
          {items.length === 0 && (
            <p className="text-center py-4">No data available</p>
          )}
          {items.length > 0 &&
            items.map((item, i) => {
              const isItemSelected = selectedItems.find((id) => id === item.id);
              return (
                <div
                  className={`md:grid odd:[&>*]:bg-dark-925`}
                  style={TABLE_COLUMN_STYLES}
                  key={item.id ?? i}
                >
                  {isSelectable && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isItemSelected != null}
                        onChange={() => onToggleSelectItem(item.id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => {
                    const colValue =
                      typeof col.calculatedValue === "function"
                        ? col.calculatedValue(item)
                        : formatCellValue(item[col.id], col.format ?? "text");
                    return (
                      <TableCell key={col.id} label={col.label}>
                        <span className={"block text-sm"}>
                          {String(colValue).length === 0 ? (
                            <i className="text-dark-400">No definido</i>
                          ) : null}
                          {colValue}
                        </span>
                      </TableCell>
                    );
                  })}
                  {hasActions && (
                    <TableCell label="Acciones">
                      <button
                        disabled={isLoading}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleActions(e, item);
                        }}
                        className={`text-lg p-1 rounded-full [&>*]:pointer-events-none text-dark bg-dark-100 border border-dark-200`}
                        data-action-btn
                      >
                        <IconMoreHoriz size={14} strokeWidth={3} />
                      </button>
                    </TableCell>
                  )}
                </div>
              );
            })}
        </div>
        <SimpleContextMenu
          isVisible={contextMenu != null}
          x={contextMenu?.x}
          y={contextMenu?.y}
          reference={refContextMenu}
          actions={getMoreActions()}
          onAction={(actionId) => {
            if (contextMenu == null) return;
            if (actionId === MORE_ACTIONS.edit.id && isEditable) {
              onEdit(contextMenu.itemId);
            }
            if (actionId === MORE_ACTIONS.delete.id && isDeletable) {
              askForDeleteConfirmation(contextMenu.itemId);
            }
          }}
        />
      </section>
    </>
  );
};
