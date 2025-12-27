import type { ComponentProps, TargetedInputEvent } from "preact";
import type { PublicTable, ReadWhere } from "../lib/types/request";
import { useEffect, useRef, useState } from "preact/hooks";
import type { Tables } from "../lib/types/database.types";
import { useDebounce } from "@uidotdev/usehooks";
import { ServiceCRUD } from "../services/ServiceCRUD";
import { route } from "preact-router";
import { UtilGeneral } from "../lib/utils/UtilGeneral";
import { IconList } from "../icons/IconList";
import { IconEditPencil } from "../icons/IconEditPencil";

export const Input = ({
  label,
  className,
  validationErrors,
  reference,
  isDisabledByDefault,
  table,
  select = "*",
  where,
  getReferenceLabel,
  referenceListPath,
  searchColumns = ["first_name", "last_name"],
  getReferenceEditPath,
  orderColumn = "created_at",
  orderAscending = false,
  handleValueChange,
  ...props
}: {
  label?: string;
  className?: string;
  reference?: string;
  isDisabledByDefault?: boolean;
  validationErrors?: {
    inputName: string;
    isSuccess: boolean;
    error?: string;
  }[];
  table?: PublicTable;
  select?: string;
  where?: ReadWhere;
  getReferenceLabel?: (item: Record<string, any>) => string;
  referenceListPath?: string;
  searchColumns?: string[];
  getReferenceEditPath?: (itemId: string) => string;
  orderColumn?: string;
  orderAscending?: boolean;
  handleValueChange: (value: string | boolean) => void;
} & ComponentProps<"input">) => {
  const [showReferenceList, setShowReferenceList] = useState(false);

  const [referenceList, setReferenceList] = useState<
    Partial<Tables<PublicTable>>[]
  >([]);

  const [cachedBaseList, setCachedBaseList] = useState<
    Partial<Tables<PublicTable>>[]
  >([]);

  const [referenceListCount, setReferenceListCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedReference, setSelectedReference] = useState<{
    label: string;
    reference: string;
  } | null>(null);

  const [highlightIndex, setHighlightIndex] = useState(-1);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const refInput = useRef<HTMLInputElement>(null);
  const refHiddenInput = useRef<HTMLInputElement>(null);
  const refReferenceList = useRef<HTMLDivElement>(null);

  const isReference = props?.type === "reference";
  const isSelector = props?.type === "checkbox" || props?.type === "radio";

  const inputError = validationErrors?.find(
    (err) => err.inputName === props?.name,
  );

  const showError =
    inputError != null && !inputError.isSuccess && !!inputError.error?.length;

  const applyDisabledStyle =
    props?.disabled || isLoading || isDisabledByDefault;

  // --------------------
  // LOAD PAGE
  // --------------------
  const loadPage = async (pageToLoad: number) => {
    if (!table) return;

    setIsLoading(true);
    const { data, count, isSuccess } = await ServiceCRUD.read(table, {
      select,
      where,
      pagination: { page: pageToLoad, pageSize: 10 },
      order: {
        column: orderColumn,
        ascending: orderAscending,
      },
    });
    setIsLoading(false);

    if (!isSuccess || !data) return;

    setReferenceList((prev) => [...prev, ...data]);
    setCachedBaseList((prev) => [...prev, ...data]);

    if (count != null) setReferenceListCount(count);
  };

  const loadMore = async () => {
    if (debouncedSearchQuery.length > 0) return;
    const next = page + 1;
    setPage(next);
    await loadPage(next);
  };

  // --------------------
  // SELECT REFERENCE (CENTRAL)
  // --------------------
  const selectReference = (i: Partial<Tables<PublicTable>>) => {
    if (!refInput.current || !refHiddenInput.current) return;

    const itemLabel = getReferenceLabel?.(i as Record<string, string>) || i.id;

    const selected = {
      label: itemLabel?.toString() ?? "",
      reference: i.id?.toString() ?? "",
    };

    refInput.current.value = selected.label;
    refHiddenInput.current.value = selected.reference;

    setSelectedReference(selected);

    setSearchQuery("");
    setReferenceList(cachedBaseList);
    setHighlightIndex(-1);
    setShowReferenceList(false);
    handleValueChange(selected.reference);
  };

  // --------------------
  // FOCUS
  // --------------------
  const onFocus = async () => {
    if (!isReference || !table) return;
    setShowReferenceList(true);

    if (referenceList.length === 0) {
      setPage(1);
      await loadPage(1);
    }
  };

  // --------------------
  // BLUR
  // --------------------
  const onBlur = (e: FocusEvent) => {
    if (!isReference || !table) return;

    if (refReferenceList.current?.contains(e.relatedTarget as Node)) return;

    const labelInput = e.target as HTMLInputElement;

    if (
      selectedReference &&
      labelInput &&
      labelInput.value !== selectedReference.label
    ) {
      labelInput.value = selectedReference.label;
    }

    setShowReferenceList(false);
  };

  // --------------------
  // INPUT
  // --------------------
  const onInput = (event: TargetedInputEvent<HTMLInputElement>) => {
    if (!isReference || !table) return;
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  // --------------------
  // SEARCH EFFECT FIX
  // --------------------
  useEffect(() => {
    if (!isReference || !table) return;

    const cleaned = debouncedSearchQuery.trim();

    if (cleaned.length === 0) {
      setReferenceList(cachedBaseList);
      return;
    }

    const normalized = UtilGeneral.normalizeSearchQuery(cleaned);

    const search = async () => {
      setIsLoading(true);

      const { data, isSuccess } = await ServiceCRUD.read(table, {
        select,
        where,
        search: {
          columns: searchColumns,
          query: normalized,
        },
        order: {
          column: orderColumn,
          ascending: orderAscending,
        },
      });

      setIsLoading(false);

      if (!isSuccess || !data) return;

      setHighlightIndex(-1);
      setReferenceList(data);
    };

    search();
  }, [debouncedSearchQuery]);

  // --------------------
  // KEYBOARD UX
  // --------------------
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isReference || !showReferenceList) return;

    if (e.key === "Escape") {
      setShowReferenceList(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev + 1 >= referenceList.length ? 0 : prev + 1,
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev - 1 < 0 ? referenceList.length - 1 : prev - 1,
      );
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (highlightIndex < 0) return;
      const item = referenceList[highlightIndex];
      if (!item) return;
      selectReference(item);
    }
  };

  useEffect(() => {
    if (!refInput.current) return;
    const el = refInput.current;

    el.addEventListener("keydown", handleKeyDown as any);
    return () => el.removeEventListener("keydown", handleKeyDown as any);
  }, [referenceList, highlightIndex, showReferenceList]);
  useEffect(() => {
    if (
      !reference ||
      reference.trim().length === 0 ||
      !props?.value ||
      String(props?.value).trim().length === 0
    )
      return;

    // Si YA tenemos un label correcto, no lo vuelvas a pisar
    if (selectedReference?.reference === reference) return;

    setSelectedReference({
      label: String(props?.value),
      reference,
    });

    handleValueChange(reference);
  }, [reference, props?.value]);

  return (
    <div>
      <div
        className={`${className} ${
          applyDisabledStyle
            ? "[&_*:is(label,input)]:brightness-50 [&_*:is(label,input)]:cursor-not-allowed [&_*:is(label,input)]:pointer-events-none"
            : ""
        } ${isSelector ? "flex items-center gap-1" : ""} relative`}
      >
        <label
          className={`${
            isSelector
              ? "order-1"
              : "absolute -top-3 left-3 bg-neutral-800 rounded-sm"
          } px-1.5 font-semibold z-10`}
          htmlFor={isReference ? `${props?.id}_label` : props?.id}
        >
          {label}
        </label>

        <div className="flex items-stretch gap-1.5">
          <input
            className="field-base"
            autoComplete="off"
            {...props}
            id={isReference ? `${props?.id}_label` : props?.id}
            name={isReference ? `${props?.name}_label` : props?.name}
            type={isReference ? "text" : props?.type}
            {...(isSelector
              ? { checked: Boolean(props.value) }
              : {
                  value: isReference
                    ? (selectedReference?.label ?? props.value ?? "")
                    : (props.value ?? ""),
                })}
            onChange={(e) => {
              if (isReference) return;

              if (isSelector) {
                const checked = (e.target as HTMLInputElement).checked;
                handleValueChange(checked);
                return;
              }

              props.onChange?.(e);
              handleValueChange((e.target as HTMLInputElement).value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={onInput}
            readOnly={isLoading || isDisabledByDefault}
            ref={refInput}
          />

          {isReference && referenceListPath && (
            <button
              className="px-3 bg-neutral-800 rounded-sm border-2 border-neutral-400 focus:border-neutral-300"
              onClick={() => route(referenceListPath)}
              type="button"
              title="Abrir lista"
            >
              <IconList />
            </button>
          )}
          {isReference &&
            typeof getReferenceEditPath === "function" &&
            selectedReference?.reference && (
              <button
                className="px-3 bg-neutral-800 rounded-sm border-2 border-neutral-400 focus:border-neutral-300"
                onClick={() =>
                  route(getReferenceEditPath(selectedReference?.reference))
                }
                type="button"
                title="Abrir registro"
              >
                <IconEditPencil />
              </button>
            )}
        </div>

        {isReference && (
          <>
            <input
              type="hidden"
              id={props?.id}
              name={props?.name}
              value={selectedReference?.reference ?? reference ?? ""}
              ref={refHiddenInput}
            />

            <div
              ref={refReferenceList}
              className={`${
                !showReferenceList && "hidden"
              } absolute top-full left-0 w-full z-30 bg-dark-925 p-2 max-w-[400px] max-h-[250px] overflow-y-auto`}
            >
              {referenceList.length === 0 && (
                <p className="px-3 py-2 font-semibold">No hay elementos</p>
              )}

              {referenceList.map((i, idx) => {
                const itemLabel =
                  getReferenceLabel?.(i as Record<string, string>) || i.id;

                const isSelected =
                  selectedReference?.reference === i.id?.toString();

                const isHighlighted = idx === highlightIndex;

                return (
                  <button
                    key={i.id}
                    type="button"
                    className={`px-3 py-2 w-full text-left transition-colors duration-200
                      ${isSelected ? "bg-dark/30" : ""}
                      ${isHighlighted ? "bg-dark/50" : ""}`}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onClick={() => selectReference(i)}
                  >
                    {itemLabel}
                  </button>
                );
              })}

              {referenceListCount > referenceList.length &&
                debouncedSearchQuery.length === 0 && (
                  <button
                    type="button"
                    className="px-3 py-2 w-full font-semibold underline"
                    onClick={loadMore}
                  >
                    Cargar más
                  </button>
                )}
            </div>
          </>
        )}
      </div>

      {showError && (
        <div className="text-red-300 font-semibold text-sm mt-1">
          {inputError.error}
        </div>
      )}
    </div>
  );
};
