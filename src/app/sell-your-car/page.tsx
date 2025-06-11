import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: 'Sell Your Car - Magari 360',
  description: 'Get a valuation and sell your car through Magari 360.',
};

export default function SellYourCarPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>Sell Your Car with Magari 360</TypographyH1>
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Ready to sell? Provide your vehicle details and let us help you find a buyer.
        </TypographyP>
      </header>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Vehicle Valuation Form</CardTitle>
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
