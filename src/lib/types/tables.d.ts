import type { ComponentType } from "preact";
import type { COLUMN_FORMATS } from "../constants/tables";

export type ColumnFormat = keyof typeof COLUMN_FORMATS;

export type Column = {
  label: string;
  id: string;
  calculatedValue?: (item: Record<string, any>) => string;
  format?: ColumnFormat;
  minWidth?: string;
  maxWidth?: string;
};

export type ContextMenuAction = {
  id: string;
  label: string;
  icon: ComponentType<{ size: number; strokeWidth: number }>;
};
