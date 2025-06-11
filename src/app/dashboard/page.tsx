
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Dashboard - Rivent', // Updated title
  description: 'Manage your rentals, bookings, and profile on Rivent.', // Updated description
};

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?message=Please sign in to access the dashboard.');
  }

  // If authenticated, show dashboard content
  // TODO: Fetch user profile to determine role and display partner/admin/renter specific dashboard
  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-border">
        <TypographyH1 className="text-foreground">User Dashboard</TypographyH1>
        <TypographyP className="mt-2 text-lg text-muted-foreground">
          Welcome back, {user.email}! Manage your activities on Rivent. {/* Updated text */}
        </TypographyP>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards - will be dynamic based on user role */}
        <Card className="bg-card shadow-lg rounded-lg border-border">
          <CardHeader>
            <CardTitle className="text-foreground">My Profile</CardTitle>
            <CardDescription className="text-muted-foreground">View and edit your profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP className="text-muted-foreground">Profile editing will be available here.</TypographyP>
            <Button variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary/10" disabled>Manage Profile (Coming Soon)</Button>
          </CardContent>
        </Card>

        {/* Example: Conditional card for partners */}
        {/* {userProfile?.role === 'partner' && ( */}
        <Card className="bg-card shadow-lg rounded-lg border-border">
          <CardHeader>
            <CardTitle className="text-foreground">My Listings</CardTitle>
            <CardDescription className="text-muted-foreground">View and manage your vehicle listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP className="text-muted-foreground">A table or list of vehicles will be here.</TypographyP>
             <Button variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary/10" disabled>Manage Listings (Coming Soon)</Button>
          </CardContent>
        </Card>
        {/* )} */}
        
        <Card className="bg-card shadow-lg rounded-lg border-border">
          <CardHeader>
            <CardTitle className="text-foreground">My Bookings</CardTitle>
            <CardDescription className="text-muted-foreground">Vehicles you've booked.</CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyP className="text-muted-foreground">Your booked vehicles will appear here.</TypographyP>
            <Button variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary/10" disabled>View Bookings (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
       <TypographyP className="text-sm text-center text-muted-foreground pt-4">
            This is a visual placeholder. Full dashboard functionality with Supabase integration is planned.
      </TypographyP>
    </div>
  );
}
