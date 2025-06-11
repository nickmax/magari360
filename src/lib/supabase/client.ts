
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    supabaseUrl === 'your-supabase-url' || // Check for placeholder
    supabaseUrl.trim() === '' || // Check for empty string
    supabaseUrl.toLowerCase() === 'undefined' || // Check for string "undefined"
    !supabaseAnonKey ||
    supabaseAnonKey === 'your-supabase-anon-key' || // Check for placeholder
    supabaseAnonKey.trim() === '' || // Check for empty string
    supabaseAnonKey.toLowerCase() === 'undefined' // Check for string "undefined"
  ) {
    throw new Error(
      'Supabase URL and/or Anon Key are not configured correctly, are placeholders, empty, or the string "undefined". ' +
      'Please update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. ' +
      'You can find these in your Supabase project dashboard under Project Settings > API. The URL must be a valid format (e.g., https://project-ref.supabase.co).'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
