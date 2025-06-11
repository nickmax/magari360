import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"; // Assuming this will be used for date picking
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For time slots

export const metadata = {
  title: 'Book a Test Drive - Magari 360',
  description: 'Schedule a test drive for your chosen vehicle on Magari 360.',
};

export default function BookTestDrivePage() {
  // You would typically get vehicleId and name from query params or state
  const vehicleName = "Example Vehicle (e.g., 2023 Audi R8)"; 

  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>Book a Test Drive</TypographyH1>
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Schedule your test drive for the <span className="font-semibold text-primary">{vehicleName}</span>.
        </TypographyP>
      </header>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Test Drive Request</CardTitle>
          <CardDescription>Fill in your details and preferred date/time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* This is a basic placeholder form. React Hook Form and Supabase integration will be used. */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Your Full Name" />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" type="tel" placeholder="Your Phone Number" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Your Email Address" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Preferred Date</Label>
              {/* Basic Calendar placeholder. Actual implementation will use react-day-picker */}
              <Calendar mode="single" className="rounded-md border p-0" />
              <TypographyP className="text-xs text-muted-foreground mt-1">Date selection functionality to be added.</TypographyP>
            </div>
            <div>
              <Label htmlFor="preferredTime">Preferred Time Slot</Label>
              <Select>
                <SelectTrigger id="preferredTime">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00-10:00">09:00 - 10:00</SelectItem>
                  <SelectItem value="10:00-11:00">10:00 - 11:00</SelectItem>
                  <SelectItem value="11:00-12:00">11:00 - 12:00</SelectItem>
                  <SelectItem value="14:00-15:00">14:00 - 15:00</SelectItem>
                  <SelectItem value="15:00-16:00">15:00 - 16:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full" type="submit">Submit Request (Coming Soon)</Button>
          <TypographyP className="text-xs text-center text-muted-foreground">
            This is a visual placeholder. Form submission will save to Supabase.
          </TypographyP>
        </CardContent>
      </Card>
    </div>
  );
}
