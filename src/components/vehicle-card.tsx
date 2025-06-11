import type { Vehicle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Gauge, Gem, Palette, Settings2 } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full rounded-lg border group hover:border-primary">
      <CardHeader className="p-0">
        <Link href={`/inventory/${vehicle.id}`} className="block relative h-60 w-full overflow-hidden">
          <Image
            src={vehicle.images[0]?.url || 'https://placehold.co/600x400.png'}
            alt={vehicle.images[0]?.alt || `${vehicle.make} ${vehicle.model}`}
            fill
            style={{objectFit:"cover"}}
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={vehicle.images[0]?.hint || 'car'}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <CardTitle className="font-headline text-lg sm:text-xl mb-2 leading-tight">
          <Link href={`/inventory/${vehicle.id}`} className="hover:text-primary transition-colors">
            {vehicle.make} {vehicle.model}
          </Link>
        </CardTitle>
        <p className="text-primary font-bold text-xl sm:text-2xl mb-3">
          ${vehicle.price.toLocaleString()}
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-secondary flex-shrink-0" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-secondary flex-shrink-0" />
            <span>{vehicle.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center gap-2">
            <Gem className="h-4 w-4 text-secondary flex-shrink-0" />
            <span>{vehicle.fuelType}</span>
          </div>
           <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-secondary flex-shrink-0" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-secondary flex-shrink-0" />
            <span>{vehicle.color}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 border-t bg-muted/30">
        <Button asChild className="w-full font-medium">
          <Link href={`/inventory/${vehicle.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  