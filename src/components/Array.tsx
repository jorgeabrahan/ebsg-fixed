import type { ArrayField, ArrayFieldType } from "../lib/types/forms";

type ArrayFieldRendererProps = {
  field: ArrayField;
  value: any[];
  onChange: (value: any[]) => void;
  disabled?: boolean;
};

export function  ArrayFieldRenderer({
  field,
  value,
  onChange,
  disabled,
}: ArrayFieldRendererProps) {
  const items = Array.isArray(value) ? value : [];

  const addItem = () => {
    onChange([...items, ""]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, newValue: any) => {
    const next = [...items];
    next[index] = newValue;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">
        {field.label}
      </label>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 items-center"
        >
          {renderArrayItem(
            field.of,
            item,
            (v) => updateItem(index, v),
            disabled,
          )}

          <button
            type="button"
            onClick={() => removeItem(index)}
            disabled={disabled}
            className="text-red-400 hover:text-red-300"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        disabled={disabled}
        className="text-sm text-blue-400 hover:text-blue-300"
      >
        + Agregar
      </button>
    </div>
  );
}

function renderArrayItem(
  fieldType: ArrayFieldType,
  value: any,
  onChange: (value: any) => void,
  disabled?: boolean,
) {
  switch (fieldType.type) {
  case "date":
    return (
      <input
        type="date"
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.currentTarget.value)
        }
        className="field-base field-base-lg"
      />
    );

  case "select":
    return (
      <select
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.currentTarget.value)
        }
        className="field-base field-base-lg"
      >
        <option value="" />
        {fieldType.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );

  case "text":
    return (
      <input
        type="text"
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.currentTarget.value)
        }
        className="field-base field-base-lg"
      />
    );
}
}
