import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVehicles } from '@/data/mock-vehicles';
import Image from 'next/image';
import { ArrowRight, Search } from 'lucide-react';

export default function HomePage() {
  const featuredVehicles = mockVehicles.slice(0, 3);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center rounded-lg overflow-hidden shadow-xl">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Luxury cars showcase"
          fill
          style={{objectFit:"cover"}}
          className="absolute z-0 opacity-30 dark:opacity-20"
          data-ai-hint="luxury cars"
          priority
        />
        <div className="relative z-10 p-6 bg-background/80 dark:bg-background/60 backdrop-blur-sm rounded-md shadow-lg">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Find Your <span className="text-primary">Dream Car</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our exclusive collection of luxury and performance vehicles. Unmatched quality, unparalleled service.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/inventory">
                Explore Inventory <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="font-semibold">
              <Link href="/sell-your-car">
                Value Your Trade-In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section>
        <h2 className="font-headline text-3xl font-semibold tracking-tight mb-8 text-center">
          Featured Vehicles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-lg">
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
                <CardTitle className="font-headline text-xl mb-2">{vehicle.make} {vehicle.model}</CardTitle>
                <p className="text-primary font-semibold text-lg mb-2">
                  ${vehicle.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-1">{vehicle.year} &bull; {vehicle.mileage.toLocaleString()} miles</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{vehicle.description}</p>
              </CardContent>
              <CardFooter className="p-6 border-t bg-muted/30">
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

      {/* Call to Action - Contact / Sell */}
      <section className="py-12 bg-card rounded-lg shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-headline text-3xl font-semibold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Whether you're looking to buy your next masterpiece or sell your current vehicle, our team is here to assist you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link href="/contact">Contact Our Experts</Link>
            </Button>
            <Button asChild size="lg" className="font-semibold">
              <Link href="/sell-your-car">Get a Free Valuation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}