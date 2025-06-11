
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: 'Contact Us - Rivent', // Updated title
  description: 'Get in touch with the Rivent team for support or inquiries.', // Updated description
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1 className="text-foreground">Contact Rivent</TypographyH1> {/* Updated text */}
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions or need assistance? We're here to help.
        </TypographyP>
      </header>

      <Card className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-card shadow-xl rounded-xl border-border"> {/* Rivent card style */}
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl text-foreground">Send Us a Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div>
            <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
            <Input id="name" placeholder="Your Name" className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
          </div>
          <div>
            <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
          </div>
          <div>
            <Label htmlFor="subject" className="text-muted-foreground">Subject</Label>
            <Input id="subject" placeholder="Inquiry Subject" className="bg-background border-border focus:border-primary" /> {/* Rivent input style */}
          </div>
          <div>
            <Label htmlFor="message" className="text-muted-foreground">Message</Label>
            <Textarea id="message" placeholder="Your message..." className="min-h-[100px] sm:min-h-[120px] bg-background border-border focus:border-primary" /> {/* Rivent input style */}
          </div>
          <Button className="w-full text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground">Send Message (TBD)</Button> {/* Rivent primary button style */}
           <TypographyP className="text-xs text-center text-muted-foreground">
            This is a visual placeholder. Form submission functionality will be added.
          </TypographyP>
        </CardContent>
      </Card>
    </div>
  );
}
