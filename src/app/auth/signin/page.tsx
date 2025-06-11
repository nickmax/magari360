
'use client';

import { signIn } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypographyP } from '@/components/ui/typography';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const metadata = {
  title: 'Sign In - Magari 360',
  description: 'Access your Magari 360 account.',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? 'Signing In...' : 'Sign In'}
    </Button>
  );
}

export default function SignInPage({ searchParams }: { searchParams: { message?: string; error?: string } }) {
  const [state, formAction] = useFormState(signIn, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.message) {
      toast({ title: 'Info', description: searchParams.message });
    }
    if (searchParams.error) {
      toast({ title: 'Error', description: searchParams.error, variant: 'destructive' });
    }
    if (state?.error) {
      toast({ title: 'Sign In Failed', description: state.error, variant: 'destructive' });
    }
  }, [searchParams, state, toast]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-md mx-auto">
        <form action={formAction}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In to Magari 360</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <SubmitButton />
            {state?.error && (
              <TypographyP className="text-xs text-center text-destructive pt-2">
                {state.error}
              </TypographyP>
            )}
             {searchParams.message && !searchParams.error && (
              <TypographyP className="text-xs text-center text-green-600 pt-2">
                {searchParams.message}
              </TypographyP>
            )}
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
          <TypographyP className="text-sm">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </TypographyP>
          <TypographyP className="text-sm">
            <Link href="/auth/forgot-password" className="font-medium text-xs text-muted-foreground hover:text-primary hover:underline">
              Forgot Password? (TBD)
            </Link>
          </TypographyP>
        </CardFooter>
      </Card>
    </div>
  );
}

