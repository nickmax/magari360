'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();
  
  // Determine the origin for the email redirect link
  // In a real app, you'd get this from headers or environment variables
  const origin = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9002' 
    : 'https://your-production-url.com';


  const { error: signUpError, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }
  
  if (data.session) {
     // User is already signed in (e.g. autoVerify on)
    revalidatePath('/', 'layout');
    redirect('/');
  }


  // If email confirmation is required, data.user will exist but data.session will be null.
  if (data.user && !data.session) {
     return { message: 'Please check your email to confirm your account.' };
  }


  return { message: 'Sign up successful. Redirecting...' };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/auth/signin');
}

export async function verifyOtp(token: string, type: EmailOtpType) {
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({ token, type });
  if (error) {
    redirect(`/auth/signin?error=${encodeURIComponent(error.message)}`);
  }
  redirect('/');
}
