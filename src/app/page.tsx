
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVehicles } from '@/data/mock-vehicles'; 
import Image from 'next/image';
import { ArrowRight, Search, Fuel, Tag, Users, ShieldCheck } from 'lucide-react'; // Replaced Car with Fuel
import { TypographyH1, TypographyP, TypographyH2, TypographyH3 } from '@/components/ui/typography';

export default function HomePage() {
  const featuredVehicles = mockVehicles.slice(0, 3); 

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-center rounded-lg overflow-hidden shadow-xl bg-primary"> {/* bg-primary for Rivent hero */}
        {/* Optional: Add a subtle pattern or gradient overlay if desired, like Rivent */}
        <Image
          src="https://placehold.co/1600x900.png" 
          alt="Collection of modern rental cars"
          fill
          style={{objectFit:"cover"}}
          className="absolute z-0 opacity-20" // Adjusted opacity
          data-ai-hint="modern cars dealership"
          priority
        />
        <div className="relative z-10 p-4 sm:p-8 md:p-12 max-w-xs sm:max-w-md md:max-w-3xl">
          <TypographyH1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground"> {/* Text white for Rivent hero */}
            Find Your Perfect Ride with Rivent
          </TypographyH1>
          <TypographyP className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-primary-foreground/90"> {/* Text light for Rivent hero */}
            Discover top-quality rental cars for any occasion. Easy booking, great prices.
          </TypographyP>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 w-full sm:w-auto bg-white text-primary hover:bg-gray-100"> {/* Rivent primary button style */}
              <Link href="/inventory">
                <Fuel className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Browse Cars
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 w-full sm:w-auto border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"> {/* Rivent secondary button style */}
              <Link href="/sell-your-car"> {/* Changed from /sell-your-car to a more relevant Rivent CTA */}
                <Tag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Become a Partner
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Search (Placeholder - visual like Rivent's) */}
      <section className="py-8 sm:py-12 bg-background rounded-lg shadow-md -mt-12 sm:-mt-16 relative z-20 mx-auto max-w-4xl">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <TypographyH2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-foreground">
            Search for a Car
          </TypographyH2>
          <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-card rounded-lg shadow-lg border">
            <TypographyP className="text-muted-foreground text-sm sm:text-base">
              Advanced search filters (Make, Model, Type, Location, Date) will be here.
            </TypographyP>
            <Button className="mt-4 text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Search Now (TBD)
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section>
        <TypographyH2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8 text-center text-foreground">
          Our Popular Cars
        </TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-lg border bg-card hover:border-primary group">
              <CardHeader className="p-0">
                <div className="relative h-52 sm:h-60 w-full">
                  <Image
                    src={vehicle.images[0].url}
                    alt={vehicle.images[0].alt}
                    fill
                    style={{objectFit:"cover"}}
                    className="transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    data-ai-hint={vehicle.images[0].hint || 'car'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 flex-grow">
                <CardTitle className="font-headline text-lg sm:text-xl mb-2 text-foreground">{vehicle.make} {vehicle.model}</CardTitle>
                <p className="text-primary font-semibold text-lg sm:text-xl mb-2">
                  ${vehicle.price.toLocaleString()} / day {/* Adjusted for rental context */}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">{vehicle.year} &bull; {vehicle.fuelType}</p>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{vehicle.description}</p>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 border-t bg-muted/10 dark:bg-muted/20">
                <Button asChild className="w-full font-semibold text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={`/inventory/${vehicle.id}`}>
                    Rent Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 sm:mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="font-semibold text-sm sm:text-base border-primary text-primary hover:bg-primary/10">
            <Link href="/inventory">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> View All Cars
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works / Benefits Section (Rivent Style) */}
      <section className="py-8 sm:py-12 bg-secondary/30 rounded-lg shadow-md">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <TypographyH2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-foreground">
            Why Choose Rivent?
          </TypographyH2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex flex-col items-center p-4 sm:p-6">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <TypographyH3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 border-b-0 pb-0">Wide Selection</TypographyH3>
              <TypographyP className="text-muted-foreground text-sm sm:text-base">Choose from a diverse fleet of well-maintained vehicles.</TypographyP>
            </div>
            <div className="flex flex-col items-center p-4 sm:p-6">
              <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <TypographyH3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 border-b-0 pb-0">Trusted & Safe</TypographyH3>
              <TypographyP className="text-muted-foreground text-sm sm:text-base">All vehicles are insured and regularly inspected for your safety.</TypographyP>
            </div>
            <div className="flex flex-col items-center p-4 sm:p-6">
              <Tag className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <TypographyH3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 border-b-0 pb-0">Best Prices</TypographyH3>
              <TypographyP className="text-muted-foreground text-sm sm:text-base">Competitive rates and transparent pricing with no hidden fees.</TypographyP>
            </div>
          </div>
        </div>
      </section>
      
       <section className="py-8 sm:py-12 bg-primary/90 rounded-lg shadow-md text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <TypographyH2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
            Become a Rivent Partner
          </TypographyH2>
          <TypographyP className="mb-6 sm:mb-8 max-w-lg sm:max-w-xl mx-auto text-sm sm:text-base text-primary-foreground/90">
            Join Rivent to list your vehicles and reach thousands of potential renters across Kenya.
          </TypographyP>
          <Button asChild size="lg" className="font-semibold text-sm sm:text-base bg-white text-primary hover:bg-gray-100">
            <Link href="/auth/signup?role=dealer">List Your Car</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
