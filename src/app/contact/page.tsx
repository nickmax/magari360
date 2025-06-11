import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: 'Contact Us - Magari 360',
  description: 'Get in touch with the Magari 360 team for support or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>Contact Magari 360</TypographyH1>
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions or need assistance? We're here to help.
        </TypographyP>
      </header>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* This is a basic placeholder form. React Hook Form would be used for a real implementation. */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Your Name" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Inquiry Subject" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
          </div>
          <Button className="w-full">Send Message (Coming Soon)</Button>
           <TypographyP className="text-xs text-center text-muted-foreground">
            This is a visual placeholder. Form submission functionality will be added.
          </TypographyP>
        </CardContent>
      </Card>
    </div>
  );
}
