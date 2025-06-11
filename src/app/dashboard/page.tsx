import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export const metadata = {
  title: 'Dashboard - Magari 360',
  description: 'Manage your vehicles, bookings, and profile on Magari 360.',
};

// This will be a protected route, checking Supabase Auth state.
// For now, it's a placeholder.
export default function DashboardPage() {
  const isAuthenticated = false; // Placeholder for Supabase auth check

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <TypographyH1 className="mb-4">Access Your Dashboard</TypographyH1>
        <TypographyP className="text-lg text-muted-foreground mb-8">
          Please sign in to manage your Magari 360 account.
        </TypographyP>
        <Button asChild size="lg">
          <Link href="/auth/signin">
            <LogIn className="mr-2 h-5 w-5" /> Sign In
          </Link>
        </Button>
      </div>
    );
  }

  // If authenticated, show dashboard content
  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-border">
        <TypographyH1>Dealer Dashboard</TypographyH1>
        <TypographyP className="mt-2 text-lg text-muted-foreground">
          Welcome back! Manage your inventory, bookings, and more.
        </TypographyP>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Summary of your activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP>Analytics and stats will be displayed here.</TypographyP>
            <TypographyP className="text-sm text-muted-foreground mt-2">(BarChart, LineChart, Stats)</TypographyP>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Inventory</CardTitle>
            <CardDescription>View and manage your vehicle listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP>A table or list of vehicles will be here.</TypographyP>
             <Button variant="outline" className="mt-4 w-full">Manage Inventory (Coming Soon)</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Test Drive Bookings</CardTitle>
            <CardDescription>Upcoming and past test drive requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP>Booking management interface here.</TypographyP>
            <Button variant="outline" className="mt-4 w-full">View Bookings (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
       <TypographyP className="text-sm text-center text-muted-foreground pt-4">
            This is a visual placeholder. Full dashboard functionality with Supabase integration is planned.
      </TypographyP>
    </div>
  );
}
