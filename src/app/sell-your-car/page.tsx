
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: 'List Your Car - Rivent', // Updated title
  description: 'Partner with Rivent and list your car for rentals.', // Updated description
};

export default function SellYourCarPage() { // Consider renaming to ListYourCarPage for Rivent
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1 className="text-foreground">List Your Car with Rivent</TypographyH1> {/* Updated text */}
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Ready to earn from your car? Provide your vehicle details and let us help you find renters.
        </TypographyP>
      </header>

      <Card className="max-w-2xl mx-auto bg-card shadow-xl rounded-xl border-border"> {/* Rivent card style */}
        <CardHeader>
          <CardTitle className="text-foreground">Vehicle Listing Form</CardTitle> {/* Updated text */}
        </CardHeader>
        <CardContent>
          <TypographyP className="text-muted-foreground">
            The detailed form for vehicle submission (Make, Model, Year, Mileage, VIN, Condition, Features, Contact Info, Image Upload) will be implemented here.
          </TypographyP>
          {/* Placeholder for Valuation Submission Form */}
        </CardContent>
      </Card>
    </div>
  );
}
