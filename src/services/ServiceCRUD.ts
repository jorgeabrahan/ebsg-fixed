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
    },
  ): Promise<CrudResponseTemplate<Tables<K>[]>> {
    try {
      let query = supabase
        .from(table)
        .select(params?.select ?? "*")
        .order("created_at", { ascending: false });

      if (params?.where && Array.isArray(params.where)) {
        for (const condition of params.where) {
          const { column, operator, value } = condition;

          // Encadenar correctamente la llamada del método:
          // eq → query.eq(column, value)
          // in → query.in(column, value)
          (query as any)[operator](column, value);
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      return {
        isSuccess: true,
        data: data as Tables<K>[],
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
