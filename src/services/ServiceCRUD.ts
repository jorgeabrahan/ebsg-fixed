import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";
import type {
  CrudResponseTemplate,
  PublicTable,
  ReadWhere,
} from "../lib/types/request";
import type { Database, Tables } from "../lib/types/database.types";

export class ServiceCRUD {
  static async create<K extends PublicTable>(
    table: K,
    item: Tables<K>,
  ): Promise<CrudResponseTemplate<Tables<K>>> {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert(item)
        .select()
        .maybeSingle();
      if (error) throw error;
      return {
        isSuccess: true,
        data: data,
        error: error,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        error: error as PostgrestError | null,
      };
    }
  }

  static async update<K extends PublicTable>(
    table: K,
    item: Database["public"]["Tables"][K]["Update"],
  ): Promise<CrudResponseTemplate<Tables<K>>> {
    try {
      const { id, ...rest } = item;

      const { data, error } = await supabase
        .from(table)
        .update(rest)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (error) throw error;

      return {
        isSuccess: true,
        data: data,
        error: null,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        error: error as PostgrestError,
      };
    }
  }

  static async delete<K extends PublicTable>(
    table: K,
    item: Record<string, any>,
  ) {
    try {
      const { error } = await supabase.from(table).delete().eq("id", item.id);
      if (error) throw error;
      return {
        isSuccess: true,
        data: null,
        error: null,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        error: error as PostgrestError | null,
      };
    }
  }

  static async read<K extends PublicTable>(
    table: K,
    params?: {
      select?: string;
      where?: ReadWhere;
      pagination?: {
        page?: number;
        pageSize?: number;
      };
      search?: {
        columns: string[];
        query: string;
      };
      order?: {
        column: string;
        ascending: boolean;
      };
    },
  ): Promise<CrudResponseTemplate<Tables<K>[]>> {
    try {
      let query = supabase
        .from(table)
        .select(params?.select ?? "*", { count: "exact" })
        .order(params?.order?.column ?? "created_at", {
          ascending: params?.order?.ascending ?? false,
        });

      // WHERE
      if (params?.where?.length) {
        for (const { column, operator, value } of params.where) {
          (query as any)[operator](column, value);
        }
      }

      // PAGINATION
      if (params?.pagination) {
        const page = params.pagination?.page ?? 1;
        const pageSize = params.pagination?.pageSize ?? 10;

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        query = query.range(from, to);
      }

      if (params?.search) {
        const s = params.search;
        // Supabase .or() syntax: "first_name.ilike.%jorge%,last_name.ilike.%jorge%"
        query = query.or(
          s.columns.map((c: string) => `${c}.ilike.%${s.query}%`).join(","),
        );
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return {
        isSuccess: true,
        data: data as Tables<K>[],
        count: count,
        error: null,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        error: error as PostgrestError | null,
      };
    }
  }

  static async readOne<K extends PublicTable>(
    table: K,
    params: {
      select?: string;
      id: Tables<K>["id"];
    },
  ): Promise<CrudResponseTemplate<Tables<K>>> {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(params?.select ?? "*")
        .eq("id", params.id)
        .maybeSingle();
      if (error) throw error;
      return {
        isSuccess: true,
        data: data as Tables<K>,
        error: null,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        error: error as PostgrestError | null,
      };
    }
  }
}
