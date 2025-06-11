
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  let cookieStore: ReturnType<typeof cookies> | { get: any; set: any; remove: any; };
  try {
    cookieStore = cookies();
  } catch (e: any) {
    console.error(
      "Supabase server client: Failed to call cookies() from next/headers. " +
      "This client should ideally only be used within Server Components, Route Handlers, or Server Actions during a request. " +
      "Error: " + e.message
    );
    // Fallback to a dummy store to prevent immediate crashes if createServerClient requires a store.
    // The actual Supabase operations requiring cookies will likely fail or not persist.
    cookieStore = {
      get: (name: string) => {
        console.warn(`Supabase server client: Attempted to get cookie "${name}" using dummy store (cookies() call failed).`);
        return undefined;
      },
      set: (name: string, value: string, options: CookieOptions) => {
        console.warn(`Supabase server client: Attempted to set cookie "${name}" using dummy store (cookies() call failed).`);
      },
      remove: (name: string, options: CookieOptions) => {
        console.warn(`Supabase server client: Attempted to remove cookie "${name}" using dummy store (cookies() call failed).`);
      },
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    supabaseUrl === 'your-supabase-url' || 
    supabaseUrl.trim() === '' || 
    supabaseUrl.toLowerCase() === 'undefined' || 
    !supabaseAnonKey ||
    supabaseAnonKey === 'your-supabase-anon-key' || 
    supabaseAnonKey.trim() === '' || 
    supabaseAnonKey.toLowerCase() === 'undefined'
  ) {
    throw new Error(
      'Supabase URL and/or Anon Key are not configured correctly, are placeholders, empty, or the string "undefined". ' +
      'Please update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. ' +
      'You can find these in your Supabase project dashboard under Project Settings > API. The URL must be a valid format (e.g., https://project-ref.supabase.co).'
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        if (!cookieStore || typeof cookieStore.get !== 'function') {
          console.warn(`Supabase server client: cookieStore.get is not a function or cookieStore is invalid when trying to get "${name}".`);
          return undefined;
        }
        try {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        } catch (error: any) {
          console.error(`Supabase server client: Error calling cookieStore.get("${name}"): ${error.message}`);
          return undefined;
        }
      },
      set(name: string, value: string, options: CookieOptions) {
        if (!cookieStore || typeof cookieStore.set !== 'function') {
          console.warn(`Supabase server client: cookieStore.set is not a function or cookieStore is invalid when trying to set "${name}".`);
          return;
        }
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error: any) {
          // This error is often expected and ignorable in Server Components if middleware handles session refresh.
          // console.warn(`Supabase server client: Error calling cookieStore.set("${name}") (often ignorable): ${error.message}`);
        }
      },
      remove(name: string, options: CookieOptions) {
        if (!cookieStore || typeof cookieStore.set !== 'function') { 
          console.warn(`Supabase server client: cookieStore.set (for remove) is not a function or cookieStore is invalid when trying to remove "${name}".`);
          return;
        }
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch (error: any) {
          // This error is often expected and ignorable in Server Components if middleware handles session refresh.
          // console.warn(`Supabase server client: Error calling cookieStore.set (for removing "${name}") (often ignorable): ${error.message}`);
        }
      },
    },
  });
}
