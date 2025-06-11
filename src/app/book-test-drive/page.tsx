
'use client'; 

import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";


// Metadata should be defined in a server component or page.tsx for server rendering.
// export const metadata = {
//   title: 'Book a Vehicle - Rivent', // Updated title
//   description: 'Schedule your vehicle rental with Rivent.', // Updated description
// };


export default function BookTestDrivePage() { // Consider renaming to BookVehiclePage for Rivent context
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
            description: "Please select a vehicle first to make a booking.", // Updated text
            variant: "destructive",
        });
    }
  }, [vehicleId, vehicleNameParam, toast]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
        title: "Booking Request Submitted (Demo)", // Updated text
        description: `Your request for ${vehicleName} has been sent. We will contact you shortly.`,
    });
  };


  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1 className="text-foreground">Book Your Vehicle</TypographyH1> {/* Updated text */}
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Schedule your rental for the <span className="font-semibold text-primary">{vehicleName}</span>.
        </TypographyP>
      </header>

      <Card className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-card shadow-xl rounded-xl border-border"> {/* Rivent card style */}
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl text-foreground">Rental Request</CardTitle> {/* Updated text */}
          <CardDescription className="text-muted-foreground">Fill in your details and preferred date/time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-muted-foreground">Full Name</Label>
              <Input id="fullName" placeholder="Your Full Name" required className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
            </div>
            <div>
              <Label htmlFor="contactNumber" className="text-muted-foreground">Contact Number</Label>
              <Input id="contactNumber" type="tel" placeholder="Your Phone Number" required className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
            </div>
            <div>
              <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
              <Input id="email" type="email" placeholder="Your Email Address" required className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
              <div>
                <Label htmlFor="preferredDate" className="text-muted-foreground">Preferred Date</Label>
                <Calendar 
                    mode="single" 
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border p-0 mt-1 bg-background border-border [&_button]:focus:bg-accent/50" // Rivent calendar style
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} 
                />
              </div>
              <div>
                <Label htmlFor="preferredTime" className="text-muted-foreground">Preferred Time Slot</Label>
                <Select required name="preferredTime">
                  <SelectTrigger id="preferredTime" className="mt-1 bg-background border-border focus:border-primary text-foreground"> {/* Rivent select style */}
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border text-popover-foreground"> {/* Rivent select content style */}
                    <SelectItem value="09:00-10:00">09:00 - 10:00</SelectItem>
                    <SelectItem value="10:00-11:00">10:00 - 11:00</SelectItem>
                    <SelectItem value="11:00-12:00">11:00 - 12:00</SelectItem>
                    <SelectItem value="14:00-15:00">14:00 - 15:00</SelectItem>
                    <SelectItem value="15:00-16:00">15:00 - 16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground" type="submit">Submit Request</Button> {/* Rivent primary button style */}
            <TypographyP className="text-xs text-center text-muted-foreground">
              This is a visual placeholder. Form submission will save to Supabase.
            </TypographyP>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
