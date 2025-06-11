
'use client';

import { signUp } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypographyP } from '@/components/ui/typography';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export const metadata = {
  title: 'Sign Up - Rivent', // Updated title
  description: 'Create your Rivent account.', // Updated description
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" type="submit" disabled={pending}> {/* Rivent primary button style */}
      {pending ? 'Signing Up...' : 'Sign Up'}
    </Button>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, undefined);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast({ title: 'Sign Up Failed', description: state.error, variant: 'destructive' });
    }
    if (state?.message && !state.error) {
      toast({ title: 'Sign Up Request', description: state.message });
       if (!state.message.includes('check your email')) { 
        router.push('/'); 
      }
    }
  }, [state, toast, router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-md mx-auto bg-card shadow-xl rounded-xl"> {/* Rivent card style */}
        <form action={formAction}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Create an Account</CardTitle>
            <CardDescription className="text-muted-foreground">Join Rivent to start renting or listing cars.</CardDescription> {/* Updated text */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required className="bg-background border-border focus:border-primary"/> {/* Rivent input style */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">Password</Label>
              <Input id="password" name="password" type="password" placeholder="•••••••• (min. 6 characters)" required className="bg-background border-border focus:border-primary"/> {/* Rivent input style */}
            </div>
            <SubmitButton />
            {state?.error && (
              <TypographyP className="text-xs text-center text-destructive pt-2">
                {state.error}
              </TypographyP>
            )}
            {state?.message && !state.error && (
              <TypographyP className="text-xs text-center text-green-600 pt-2">
                {state.message}
              </TypographyP>
            )}
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6 border-t border-border"> {/* Rivent card style */}
          <TypographyP className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </TypographyP>
        </CardFooter>
      </Card>
    </div>
  );
}
