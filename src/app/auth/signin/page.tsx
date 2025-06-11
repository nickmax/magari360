import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export const metadata = {
  title: 'Sign In - Magari 360',
  description: 'Access your Magari 360 account or sign up.',
};

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In to Magari 360</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {/* This is a basic placeholder form. Supabase Auth UI or custom logic will be here. */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full" type="submit">Sign In (Coming Soon)</Button>
          <TypographyP className="text-xs text-center text-muted-foreground pt-2">
            This is a visual placeholder. Authentication via Supabase will be implemented.
          </TypographyP>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <TypographyP className="text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </TypographyP>
           <TypographyP className="text-sm">
            <Link href="/auth/forgot-password" className="font-medium text-xs text-muted-foreground hover:text-primary hover:underline">
              Forgot Password?
            </Link>
          </TypographyP>
        </CardFooter>
      </Card>
    </div>
  );
}
