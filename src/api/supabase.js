console.log("Checking Supabase connection...");
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

async function checkSupabaseConnection() {
  try {

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Supabase connection error:", error);
      return false;
    }

    console.log("✅ Supabase connection successful");
    return true;
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
    return false;
  }
}

checkSupabaseConnection();