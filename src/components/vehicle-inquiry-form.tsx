
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { VehicleInquiry } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional().refine(value => !value || /^\+?[1-9]\d{1,14}$/.test(value) || value === "", {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters." }),
});

interface VehicleInquiryFormProps {
  vehicleId: string;
  vehicleName: string;
}

export function VehicleInquiryForm({ vehicleId, vehicleName }: VehicleInquiryFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `I'm interested in the ${vehicleName} (ID: ${vehicleId}). Could you please provide more information?`,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const inquiryData: VehicleInquiry = {
      ...values,
      vehicleId,
      vehicleName,
      createdAt: new Date().toISOString(), // Added createdAt
    };
    console.log("Vehicle Inquiry Submitted:", inquiryData); 
    toast({
      title: "Inquiry Sent!",
      description: `Thank you for your interest in the ${vehicleName}. We'll be in touch shortly.`,
      variant: "default",
    });
    form.reset({ // Reset with default message including potentially updated vehicleName
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in the ${vehicleName} (ID: ${vehicleId}). Could you please provide more information?`,
    });
  }

  return (
    <Card className="bg-card shadow-lg rounded-lg border-border"> {/* Rivent card style */}
      <CardHeader>
        <CardTitle className="font-headline text-xl sm:text-2xl text-foreground">Inquire About This Vehicle</CardTitle>
        <CardDescription className="text-muted-foreground">Questions? We're here to help.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+254 700 123456" {...field} className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`I'm interested in the ${vehicleName}...`}
                      className="min-h-[120px] bg-background border-border focus:border-primary" /* Rivent textarea style */
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}> {/* Rivent primary button style */}
              {form.formState.isSubmitting ? "Sending..." : "Send Inquiry"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
