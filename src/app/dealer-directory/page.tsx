import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: 'Dealer Directory - Magari 360',
  description: 'Find verified car dealers across Kenya on Magari 360.',
};

// Placeholder dealer data
const mockDealers = [
  { id: '1', name: 'Nairobi Premier Motors', logoUrl: 'https://placehold.co/100x100.png?text=NPM', location: 'Nairobi', rating: 4.5, specialties: ['Luxury', 'SUV'], slug: 'nairobi-premier-motors' },
  { id: '2', name: 'Mombasa Auto Hub', logoUrl: 'https://placehold.co/100x100.png?text=MAH', location: 'Mombasa', rating: 4.2, specialties: ['Sedan', 'Used'], slug: 'mombasa-auto-hub' },
  { id: '3', name: 'Kisumu Car Connect', logoUrl: 'https://placehold.co/100x100.png?text=KCC', location: 'Kisumu', rating: 4.8, specialties: ['Trucks', 'Commercial'], slug: 'kisumu-car-connect' },
];

export default function DealerDirectoryPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>Find a Trusted Dealer</TypographyH1>
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our directory of verified car dealerships across Kenya.
        </TypographyP>
      </header>

      {/* Filters for county, name, rating will go here */}
      <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
        <TypographyP className="text-center text-muted-foreground">Dealer search filters (County, Name, Rating) will be implemented here.</TypographyP>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDealers.map((dealer) => (
          <Card key={dealer.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={dealer.logoUrl} alt={`${dealer.name} logo`} data-ai-hint="logo placeholder" />
                <AvatarFallback>{dealer.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>
                  <Link href={`/dealer/${dealer.slug}`} className="hover:text-primary transition-colors">
                    {dealer.name}
                  </Link>
                </CardTitle>
                <CardDescription>{dealer.location}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center mb-2">
                <Badge variant="outline">Rating: {dealer.rating} / 5</Badge>
              </div>
              <div className="space-x-1">
                {dealer.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Link href={`/dealer/${dealer.slug}`} className="text-sm font-medium text-primary hover:underline w-full text-center">
                View Profile & Inventory &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
       <TypographyP className="text-sm text-center text-muted-foreground pt-4">
        Dealer data will be managed via Supabase. This is a placeholder display.
      </TypographyP>
    </div>
  );
}
