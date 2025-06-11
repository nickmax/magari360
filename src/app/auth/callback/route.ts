import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url).toString());
    }
  }

  // return the user to an error page with instructions
  const errorDescription = requestUrl.searchParams.get('error_description');
  const errorMessage = errorDescription ? decodeURIComponent(errorDescription) : 'Sorry, we could not log you in. Please try again.';
  return NextResponse.redirect(new URL(`/auth/signin?error=${encodeURIComponent(errorMessage)}`, request.url).toString());
}
