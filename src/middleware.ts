
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr'; // Added createServerClient here

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClientMiddleware(request);

  // Refresh session if expired - important to do before checking if user is logged in
  const { data: { session } } = await supabase.auth.getSession();

  const { data: { user } } = await supabase.auth.getUser();

  // Define protected routes
  const protectedRoutes = ['/dashboard']; // Add other routes like '/admin', '/dealer-dashboard/inventory/add' etc.
  const { pathname } = request.nextUrl;

  // If user is not logged in and tries to access a protected route, redirect to signin
  if (!user && protectedRoutes.some(route => pathname.startsWith(route))) {
    const redirectUrl = new URL('/auth/signin', request.url);
    redirectUrl.searchParams.set('message', 'Please sign in to access this page.');
    if (pathname !== '/') { // Add next param if not trying to access root
        redirectUrl.searchParams.set('next', pathname);
    }
    return NextResponse.redirect(redirectUrl);
  }

  // If user is logged in and tries to access auth pages (signin, signup), redirect to dashboard or home
  if (user && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return response;
}

// Helper function to create Supabase client within middleware
function createClientMiddleware(request: NextRequest) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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
    // Throw an error that will be caught by Next.js and displayed,
    // indicating the problem is with environment variable configuration.
    // This error will be more specific than a generic "Invalid URL" from the Supabase client itself.
    throw new Error(
      'MIDDLEWARE ERROR: Supabase URL and/or Anon Key are not configured correctly, are placeholders, empty, or the string "undefined". ' +
      'Please update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. ' +
      'You can find these in your Supabase project dashboard under Project Settings > API. The URL must be a valid format (e.g., https://project-ref.supabase.co).'
    );
  }


  const supabase = createServerClient(
    supabaseUrl!, // Use the validated supabaseUrl
    supabaseAnonKey!, // Use the validated supabaseAnonKey
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  return { supabase, response };
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

