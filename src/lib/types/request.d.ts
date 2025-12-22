import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "./database.types";

type PublicTable = keyof Database["public"]["Tables"];

export type CrudResponseTemplate<T> = {
  isSuccess: boolean;
  data: T | null;
  error: PostgrestError | null;
  count?: number | null;
};

export type ReadWhere = {
  column: keyof Tables<K> & string;
  operator:
    | "eq"
    | "gt"
    | "lt"
    | "gte"
    | "lte"
    | "like"
    | "ilike"
    | "is"
    | "in"
    | "neq";
  value: string | string[] | null;
}[];
