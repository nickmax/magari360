
'use client'; // Make it a client component for query param access & form handling

import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation"; // For reading query params
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
// Import React Hook Form and Zod if you were to build the full form
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// Metadata would be handled in a parent server component or page.tsx for server rendering
// export const metadata = {
//   title: 'Book a Test Drive - Magari 360',
//   description: 'Schedule a test drive for your chosen vehicle on Magari 360.',
// };

// Example Zod schema for form validation (if using React Hook Form)
// const formSchema = z.object({
//   fullName: z.string().min(2, "Full name is required"),
//   contactNumber: z.string().min(10, "Valid contact number is required"),
//   email: z.string().email("Invalid email address"),
//   preferredDate: z.date({ required_error: "Preferred date is required"}),
//   preferredTime: z.string({ required_error: "Preferred time slot is required"}),
// });

export default function BookTestDrivePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const vehicleId = searchParams.get('vehicleId');
  const vehicleNameParam = searchParams.get('vehicleName');
  
  const [vehicleName, setVehicleName] = useState("your chosen vehicle");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());


  useEffect(() => {
    if (vehicleNameParam) {
      setVehicleName(decodeURIComponent(vehicleNameParam));
    }
    if (!vehicleId && !vehicleNameParam) {
        toast({
            title: "Vehicle Not Specified",
            description: "Please select a vehicle first to book a test drive.",
            variant: "destructive",
        });
        // Optionally redirect: router.push('/inventory');
    }
  }, [vehicleId, vehicleNameParam, toast]);

  // Placeholder form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form data collection here
    toast({
        title: "Test Drive Request Submitted (Demo)",
        description: `Your request for ${vehicleName} has been sent. We will contact you shortly.`,
    });
    // In a real app, call Supabase action here
  };


  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>Book a Test Drive</TypographyH1>
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Schedule your test drive for the <span className="font-semibold text-primary">{vehicleName}</span>.
        </TypographyP>
      </header>

      <Card className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl">Test Drive Request</CardTitle>
          <CardDescription>Fill in your details and preferred date/time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Your Full Name" required />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" type="tel" placeholder="Your Phone Number" required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Your Email Address" required />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Calendar 
                    mode="single" 
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border p-0 mt-1"
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} // Disable past dates
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time Slot</Label>
                <Select required name="preferredTime">
                  <SelectTrigger id="preferredTime" className="mt-1">
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

            <Button className="w-full text-sm sm:text-base" type="submit">Submit Request</Button>
            <TypographyP className="text-xs text-center text-muted-foreground">
              This is a visual placeholder. Form submission will save to Supabase.
            </TypographyP>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

