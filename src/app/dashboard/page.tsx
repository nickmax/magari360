import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Dashboard - Magari 360',
  description: 'Manage your vehicles, bookings, and profile on Magari 360.',
};

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?message=Please sign in to access the dashboard.');
  }

  // If authenticated, show dashboard content
  // TODO: Fetch user profile to determine role and display dealer/admin/buyer specific dashboard
  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-border">
        <TypographyH1>User Dashboard</TypographyH1>
        <TypographyP className="mt-2 text-lg text-muted-foreground">
          Welcome back, {user.email}! Manage your activities.
        </TypographyP>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards - will be dynamic based on user role */}
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>View and edit your profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP>Profile editing will be available here.</TypographyP>
            <Button variant="outline" className="mt-4 w-full" disabled>Manage Profile (Coming Soon)</Button>
          </CardContent>
        </Card>

        {/* Example: Conditional card for dealers */}
        {/* {userProfile?.role === 'dealer' && ( */}
        <Card>
          <CardHeader>
            <CardTitle>My Inventory</CardTitle>
            <CardDescription>View and manage your vehicle listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP>A table or list of vehicles will be here.</TypographyP>
             <Button variant="outline" className="mt-4 w-full" disabled>Manage Inventory (Coming Soon)</Button>
          </CardContent>
        </Card>
        {/* )} */}
        
        <Card>
          <CardHeader>
            <CardTitle>My Wishlist</CardTitle>
            <CardDescription>Vehicles you've saved.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP>Your saved vehicles will appear here.</TypographyP>
            <Button variant="outline" className="mt-4 w-full" disabled>View Wishlist (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
       <TypographyP className="text-sm text-center text-muted-foreground pt-4">
            This is a visual placeholder. Full dashboard functionality with Supabase integration is planned.
      </TypographyP>
    </div>
  );
}
