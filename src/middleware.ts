import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
