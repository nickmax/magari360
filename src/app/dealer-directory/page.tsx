
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: 'Dealer Directory - Magari 360',
  description: 'Find verified car dealers across Kenya on Magari 360.',
};

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
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our directory of verified car dealerships across Kenya.
        </TypographyP>
      </header>

      <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
        <TypographyP className="text-center text-muted-foreground text-sm sm:text-base">Dealer search filters (County, Name, Rating) will be implemented here.</TypographyP>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDealers.map((dealer) => (
          <Card key={dealer.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border">
                <AvatarImage src={dealer.logoUrl} alt={`${dealer.name} logo`} data-ai-hint="logo placeholder" />
                <AvatarFallback>{dealer.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-lg sm:text-xl">
                  <Link href={`/dealer/${dealer.slug}`} className="hover:text-primary transition-colors">
                    {dealer.name}
                  </Link>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">{dealer.location}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <Badge variant="outline" className="text-xs sm:text-sm">Rating: {dealer.rating} / 5</Badge>
              </div>
              <div className="space-x-1 text-center sm:text-left">
                {dealer.specialties.map(spec => <Badge key={spec} variant="secondary" className="text-xs">{spec}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/10">
              <Link href={`/dealer/${dealer.slug}`} className="text-xs sm:text-sm font-medium text-primary hover:underline w-full text-center">
                View Profile & Inventory &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
       <TypographyP className="text-xs sm:text-sm text-center text-muted-foreground pt-4">
        Dealer data will be managed via Supabase. This is a placeholder display.
      </TypographyP>
    </div>
  );
}

