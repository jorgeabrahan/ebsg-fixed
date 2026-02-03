import { supabase } from "../config/supabase";

export async function insertMany(
  table: string,
  rows: Record<string, any>[],
) {
  if (!Array.isArray(rows) || rows.length === 0) return;

  const { error } = await supabase
    .from(table)
    .insert(rows);

  if (error) {
    throw error;
  }
}
