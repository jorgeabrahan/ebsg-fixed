import { Signal, signal } from "@preact/signals";
import type { User } from "@supabase/supabase-js";

export const user: Signal<null | User> = signal(null);
export const isLoadingUser = signal(false);
