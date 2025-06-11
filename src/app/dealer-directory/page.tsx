
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: 'Partner Directory - Rivent', // Updated title
  description: 'Find verified car rental partners across Kenya on Rivent.', // Updated description
};

const mockDealers = [ // Renaming to mockPartners for Rivent context
  { id: '1', name: 'Nairobi Premier Rentals', logoUrl: 'https://placehold.co/100x100.png?text=NPR', location: 'Nairobi', rating: 4.5, specialties: ['Luxury', 'SUV'], slug: 'nairobi-premier-rentals' },
  { id: '2', name: 'Mombasa Wheels Hub', logoUrl: 'https://placehold.co/100x100.png?text=MWH', location: 'Mombasa', rating: 4.2, specialties: ['Sedan', 'Economy'], slug: 'mombasa-wheels-hub' },
  { id: '3', name: 'Kisumu Drive Connect', logoUrl: 'https://placehold.co/100x100.png?text=KDC', location: 'Kisumu', rating: 4.8, specialties: ['4x4', 'Group Travel'], slug: 'kisumu-drive-connect' },
];

export default function PartnerDirectoryPage() { // Renamed function and page
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1 className="text-foreground">Find a Trusted Partner</TypographyH1> {/* Updated text */}
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our directory of verified car rental partners across Kenya.
        </TypographyP>
      </header>

      <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
        <TypographyP className="text-center text-muted-foreground text-sm sm:text-base">Partner search filters (County, Name, Rating) will be implemented here.</TypographyP>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDealers.map((dealer) => (
          <Card key={dealer.id} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-card border border-border group">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-border group-hover:border-primary transition-colors">
                <AvatarImage src={dealer.logoUrl} alt={`${dealer.name} logo`} data-ai-hint="logo placeholder" />
                <AvatarFallback>{dealer.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                  <Link href={`/dealer/${dealer.slug}`}> {/* Keep slug for now, can be /partner/ later */}
                    {dealer.name}
                  </Link>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground">{dealer.location}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <Badge variant="outline" className="text-xs sm:text-sm border-primary/50 text-primary">{`Rating: ${dealer.rating} / 5`}</Badge>
              </div>
              <div className="space-x-1 text-center sm:text-left">
                {dealer.specialties.map(spec => <Badge key={spec} variant="secondary" className="text-xs bg-primary/10 text-primary">{spec}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t border-border bg-muted/30">
              <Link href={`/dealer/${dealer.slug}`} className="text-xs sm:text-sm font-medium text-primary hover:underline w-full text-center">
                View Profile & Cars &rarr; {/* Updated text */}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
       <TypographyP className="text-xs sm:text-sm text-center text-muted-foreground pt-4">
        Partner data will be managed via Supabase. This is a placeholder display.
      </TypographyP>
    </div>
  );
}
