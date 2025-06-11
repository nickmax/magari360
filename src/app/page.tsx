import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVehicles } from '@/data/mock-vehicles'; // Assuming this will be replaced by Supabase
import Image from 'next/image';
import { ArrowRight, Search, Car, Tag } from 'lucide-react';
import { TypographyH1, TypographyP, TypographyH2 } from '@/components/ui/typography';

export default function HomePage() {
  const featuredVehicles = mockVehicles.slice(0, 3); // Placeholder

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center rounded-lg overflow-hidden shadow-xl bg-card">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Modern cars lined up at a dealership"
          fill
          style={{objectFit:"cover"}}
          className="absolute z-0 opacity-20 dark:opacity-10"
          data-ai-hint="modern cars dealership"
          priority
        />
        <div className="relative z-10 p-6 sm:p-8 md:p-12 bg-background/80 dark:bg-background/70 backdrop-blur-sm rounded-lg shadow-2xl max-w-3xl">
          <TypographyH1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
            Welcome to Magari 360
          </TypographyH1>
          <TypographyP className="mt-4 text-lg sm:text-xl text-muted-foreground">
            Your trusted platform for buying and selling cars in Kenya. Discover top listings and connect with verified dealers.
          </TypographyP>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="font-semibold text-lg px-8 py-6">
              <Link href="/inventory">
                <Car className="mr-2 h-5 w-5" /> Browse Cars
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="font-semibold text-lg px-8 py-6">
              <Link href="/sell-your-car">
                <Tag className="mr-2 h-5 w-5" /> Sell a Car
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Search (Placeholder) */}
      <section className="py-12 bg-secondary/50 rounded-lg shadow-md">
        <div className="container mx-auto px-6 text-center">
          <TypographyH2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground">
            Find Your Perfect Ride
          </TypographyH2>
          {/* Placeholder for Quick Search Form */}
          <div className="max-w-xl mx-auto p-6 bg-background rounded-lg shadow-inner border">
            <TypographyP className="text-muted-foreground">
              Quick search form (Make, Model, Price Range, Fuel Type) will be here.
            </TypographyP>
            <Button className="mt-4">
              <Search className="mr-2 h-5 w-5" /> Search Now (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section>
        <TypographyH2 className="text-3xl font-semibold tracking-tight mb-8 text-center text-foreground">
          Featured Vehicles
        </TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-lg border hover:border-primary">
              <CardHeader className="p-0">
                <div className="relative h-60 w-full group">
                  <Image
                    src={vehicle.images[0].url}
                    alt={vehicle.images[0].alt}
                    fill
                    style={{objectFit:"cover"}}
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={vehicle.images[0].hint || 'car'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2 text-foreground">{vehicle.make} {vehicle.model}</CardTitle>
                <p className="text-primary font-semibold text-lg mb-2">
                  ${vehicle.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-1">{vehicle.year} &bull; {vehicle.mileage.toLocaleString()} miles</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{vehicle.description}</p>
              </CardContent>
              <CardFooter className="p-6 border-t bg-muted/20">
                <Button asChild className="w-full font-semibold">
                  <Link href={`/inventory/${vehicle.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="font-semibold">
            <Link href="/inventory">
              <Search className="mr-2 h-5 w-5" /> View All Inventory
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-12 bg-card rounded-lg shadow-md">
        <div className="container mx-auto px-6 text-center">
          <TypographyH2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground">
            What Our Users Say
          </TypographyH2>
          <TypographyP className="text-muted-foreground">
            Testimonials section (Scrolling cards with Avatar, Rating) will be here.
          </TypographyP>
        </div>
      </section>
      
      {/* CTA Banner (Placeholder) */}
       <section className="py-12 bg-primary/10 rounded-lg shadow-md">
        <div className="container mx-auto px-6 text-center">
          <TypographyH2 className="text-2xl sm:text-3xl font-semibold mb-4 text-primary">
            Are You a Dealer?
          </TypographyH2>
          <TypographyP className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join Magari 360 to showcase your inventory to thousands of potential buyers across Kenya.
          </TypographyP>
          <Button asChild size="lg" className="font-semibold">
            <Link href="/auth/signup?role=dealer">Become a Dealer</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
