
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVehicles } from '@/data/mock-vehicles'; 
import Image from 'next/image';
import { ArrowRight, Search, Car, Tag } from 'lucide-react';
import { TypographyH1, TypographyP, TypographyH2 } from '@/components/ui/typography';

export default function HomePage() {
  const featuredVehicles = mockVehicles.slice(0, 3); 

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center text-center rounded-lg overflow-hidden shadow-xl bg-card">
        <Image
          src="https://placehold.co/1600x800.png" 
          alt="Modern cars lined up at a dealership"
          fill
          style={{objectFit:"cover"}}
          className="absolute z-0 opacity-20 dark:opacity-10"
          data-ai-hint="modern cars dealership"
          priority
        />
        <div className="relative z-10 p-4 sm:p-8 md:p-12 bg-background/80 dark:bg-background/70 backdrop-blur-sm rounded-lg shadow-2xl max-w-xs sm:max-w-md md:max-w-3xl">
          <TypographyH1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Welcome to Magari 360
          </TypographyH1>
          <TypographyP className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">
            Your trusted platform for buying and selling cars in Kenya. Discover top listings and connect with verified dealers.
          </TypographyP>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 w-full sm:w-auto">
              <Link href="/inventory">
                <Car className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Browse Cars
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 w-full sm:w-auto">
              <Link href="/sell-your-car">
                <Tag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Sell a Car
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Search (Placeholder) */}
      <section className="py-8 sm:py-12 bg-secondary/50 rounded-lg shadow-md">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <TypographyH2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-foreground">
            Find Your Perfect Ride
          </TypographyH2>
          <div className="max-w-lg sm:max-w-xl mx-auto p-4 sm:p-6 bg-background rounded-lg shadow-inner border">
            <TypographyP className="text-muted-foreground text-sm sm:text-base">
              Quick search form (Make, Model, Price Range, Fuel Type) will be here.
            </TypographyP>
            <Button className="mt-4 text-sm sm:text-base">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Search Now (TBD)
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section>
        <TypographyH2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8 text-center text-foreground">
          Featured Vehicles
        </TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-lg border hover:border-primary">
              <CardHeader className="p-0">
                <div className="relative h-52 sm:h-60 w-full group">
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
                  ${vehicle.price.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">{vehicle.year} &bull; {vehicle.mileage.toLocaleString()} miles</p>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{vehicle.description}</p>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 border-t bg-muted/20 dark:bg-muted/10">
                <Button asChild className="w-full font-semibold text-sm sm:text-base">
                  <Link href={`/inventory/${vehicle.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 sm:mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="font-semibold text-sm sm:text-base">
            <Link href="/inventory">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> View All Inventory
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-8 sm:py-12 bg-card rounded-lg shadow-md">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <TypographyH2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-foreground">
            What Our Users Say
          </TypographyH2>
          <TypographyP className="text-muted-foreground text-sm sm:text-base">
            Testimonials section (Scrolling cards with Avatar, Rating) will be here.
          </TypographyP>
        </div>
      </section>
      
       <section className="py-8 sm:py-12 bg-primary/10 rounded-lg shadow-md">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <TypographyH2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-primary">
            Are You a Dealer?
          </TypographyH2>
          <TypographyP className="text-muted-foreground mb-6 sm:mb-8 max-w-lg sm:max-w-xl mx-auto text-sm sm:text-base">
            Join Magari 360 to showcase your inventory to thousands of potential buyers across Kenya.
          </TypographyP>
          <Button asChild size="lg" className="font-semibold text-sm sm:text-base">
            <Link href="/auth/signup?role=dealer">Become a Dealer</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

