import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  headers: { "cities-db": "cities-bucket-list" },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
  options
);
