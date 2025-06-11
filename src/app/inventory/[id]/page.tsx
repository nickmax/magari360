
import { mockVehicles } from '@/data/mock-vehicles';
import { VehicleImageGallery } from '@/components/vehicle-image-gallery';
import { VehicleInquiryForm } from '@/components/vehicle-inquiry-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TypographyH1, TypographyH2, TypographyP } from '@/components/ui/typography';
import { CalendarDays, Gauge, Gem, Palette, Settings2, UserCircle, Phone, Heart, DollarSign, Info, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VehicleDetailsPageProps {
  params: { id: string };
}

// In a real app, this would fetch data from Supabase
async function getVehicleData(id: string) {
  const vehicle = mockVehicles.find(v => v.id === id);
  return vehicle;
}

export async function generateMetadata({ params }: VehicleDetailsPageProps) {
  const vehicle = await getVehicleData(params.id);
  if (!vehicle) {
    return { title: 'Vehicle Not Found - Magari 360' };
  }
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - Magari 360`,
    description: `Details for ${vehicle.make} ${vehicle.model}: ${vehicle.description.substring(0, 150)}...`,
  };
}

export default async function VehicleDetailsPage({ params }: VehicleDetailsPageProps) {
  const vehicle = await getVehicleData(params.id);

  if (!vehicle) {
    notFound(); 
  }

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <div className="space-y-8 lg:space-y-12">
      <header className="pb-4 border-b">
        <TypographyH1 className="mb-1 text-2xl sm:text-3xl lg:text-4xl">{vehicleName}</TypographyH1>
        <TypographyP className="text-md sm:text-lg text-muted-foreground">{vehicle.location || 'Location not specified'}</TypographyP>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Image Gallery & Description etc. */}
        <div className="lg:col-span-3 space-y-8">
          <VehicleImageGallery images={vehicle.images} vehicleName={vehicleName} />

          <Card>
            <CardHeader>
              <TypographyH2 className="border-b-0 pb-0 text-xl sm:text-2xl">Vehicle Description</TypographyH2>
            </CardHeader>
            <CardContent>
              <TypographyP className="text-sm sm:text-base">{vehicle.description}</TypographyP>
            </CardContent>
          </Card>

          {vehicle.features && vehicle.features.length > 0 && (
            <Card>
              <CardHeader>
                <TypographyH2 className="border-b-0 pb-0 text-xl sm:text-2xl">Key Features</TypographyH2>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base text-muted-foreground">
                  {vehicle.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Price, Specs, Inquiry */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="sticky top-20 shadow-xl rounded-lg">
            <CardHeader className="text-center bg-muted/30 dark:bg-muted/20 p-4 sm:p-6 rounded-t-lg">
              <TypographyP className="text-xs sm:text-sm text-muted-foreground">Price</TypographyP>
              <p className="text-3xl sm:text-4xl font-bold text-primary">${vehicle.price.toLocaleString()}</p>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-6">
              <Button asChild size="lg" className="w-full font-semibold text-base">
                <Link href={`/book-test-drive?vehicleId=${vehicle.id}&vehicleName=${encodeURIComponent(vehicleName)}`}>
                  <DollarSign className="mr-2 h-5 w-5" /> Book Test Drive
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full text-base">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3 sm:w-1/4 text-xs sm:text-sm"><CalendarDays className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Year</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.year}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm"><Users className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Make</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.make}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm"><Info className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Model</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm"><Gauge className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Mileage</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.mileage.toLocaleString()} miles</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm"><Gem className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Fuel Type</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.fuelType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm"><Settings2 className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Transmission</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.transmission}</TableCell>
                  </TableRow>
                  {vehicle.engineSize && (
                    <TableRow>
                      <TableCell className="font-medium text-xs sm:text-sm"><Info className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Engine</TableCell>
                      <TableCell className="text-xs sm:text-sm">{vehicle.engineSize}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm"><Palette className="inline mr-1.5 h-4 w-4 text-muted-foreground"/>Color</TableCell>
                    <TableCell className="text-xs sm:text-sm">{vehicle.color}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Dealer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border">
                  <AvatarImage src="https://placehold.co/48x48.png?text=D" alt="Dealer Logo" data-ai-hint="logo dealer" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <TypographyP className="font-semibold text-sm sm:text-base">Example Dealer Name</TypographyP>
              </div>
              <Button variant="outline" className="w-full text-xs sm:text-sm">
                <UserCircle className="mr-2 h-4 w-4" /> View Dealer Profile (TBD)
              </Button>
               <Button variant="outline" className="w-full text-xs sm:text-sm">
                <Phone className="mr-2 h-4 w-4" /> Show Phone (TBD)
              </Button>
            </CardContent>
          </Card>

          <VehicleInquiryForm vehicleId={vehicle.id} vehicleName={vehicleName} />
        </div>
      </div>

      <Separator className="my-8 sm:my-12" />
      <div>
        <TypographyH2 className="mb-6 text-center text-xl sm:text-2xl">Related Vehicles</TypographyH2>
        <TypographyP className="text-center text-muted-foreground text-sm sm:text-base">
          {/* Placeholder for Related Cars Carousel - e.g. <RelatedVehiclesCarousel currentVehicleId={vehicle.id} /> */}
          More vehicles like this one will appear here soon.
        </TypographyP>
      </div>
    </div>
  );
}

