import { mockVehicles } from '@/data/mock-vehicles';
import { VehicleImageGallery } from '@/components/vehicle-image-gallery';
import { VehicleInquiryForm } from '@/components/vehicle-inquiry-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TypographyH1, TypographyH2, TypographyP } from '@/components/ui/typography';
import { CalendarDays, Gauge, Gem, Palette, Settings2, UserCircle, Phone, Heart, DollarSign, Info } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    notFound(); // Or return a custom "not found" component
  }

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <div className="space-y-8 lg:space-y-12">
      <header className="pb-4 border-b">
        <TypographyH1 className="mb-1">{vehicleName}</TypographyH1>
        <TypographyP className="text-lg text-muted-foreground">{vehicle.location || 'Location not specified'}</TypographyP>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Dealer Info */}
        <div className="lg:col-span-2 space-y-8">
          <VehicleImageGallery images={vehicle.images} vehicleName={vehicleName} />

          <Card>
            <CardHeader>
              <TypographyH2 className="border-b-0 pb-0">Vehicle Description</TypographyH2>
            </CardHeader>
            <CardContent>
              <TypographyP>{vehicle.description}</TypographyP>
            </CardContent>
          </Card>

          {vehicle.features && vehicle.features.length > 0 && (
            <Card>
              <CardHeader>
                <TypographyH2 className="border-b-0 pb-0">Key Features</TypographyH2>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
                  {vehicle.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Price, Specs, Inquiry */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-20 shadow-xl"> {/* Sticky for desktop */}
            <CardHeader className="text-center">
              <TypographyP className="text-sm text-muted-foreground">Price</TypographyP>
              <p className="text-4xl font-bold text-primary">${vehicle.price.toLocaleString()}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full font-semibold">
                <DollarSign className="mr-2 h-5 w-5" /> Book Test Drive
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium"><CalendarDays className="inline mr-2 h-4 w-4 text-muted-foreground"/>Year</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium"><Info className="inline mr-2 h-4 w-4 text-muted-foreground"/>Make</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium"><Info className="inline mr-2 h-4 w-4 text-muted-foreground"/>Model</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium"><Gauge className="inline mr-2 h-4 w-4 text-muted-foreground"/>Mileage</TableCell>
                    <TableCell>{vehicle.mileage.toLocaleString()} miles</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium"><Gem className="inline mr-2 h-4 w-4 text-muted-foreground"/>Fuel Type</TableCell>
                    <TableCell>{vehicle.fuelType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium"><Settings2 className="inline mr-2 h-4 w-4 text-muted-foreground"/>Transmission</TableCell>
                    <TableCell>{vehicle.transmission}</TableCell>
                  </TableRow>
                  {vehicle.engineSize && (
                    <TableRow>
                      <TableCell className="font-medium"><Info className="inline mr-2 h-4 w-4 text-muted-foreground"/>Engine</TableCell>
                      <TableCell>{vehicle.engineSize}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium"><Palette className="inline mr-2 h-4 w-4 text-muted-foreground"/>Color</TableCell>
                    <TableCell>{vehicle.color}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Placeholder for Dealer Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Dealer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png?text=D" alt="Dealer Logo" data-ai-hint="logo dealer" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <TypographyP className="font-semibold">Example Dealer Name</TypographyP>
              </div>
              <Button variant="outline" className="w-full">
                <UserCircle className="mr-2 h-4 w-4" /> View Dealer Profile (Coming Soon)
              </Button>
               <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" /> Show Phone Number (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <VehicleInquiryForm vehicleId={vehicle.id} vehicleName={vehicleName} />
        </div>
      </div>

      {/* Related Cars Section (Placeholder) */}
      <Separator className="my-12" />
      <div>
        <TypographyH2 className="mb-6 text-center">Related Vehicles</TypographyH2>
        <TypographyP className="text-center text-muted-foreground">
          Carousel with related vehicles will be displayed here.
        </TypographyP>
        {/* Placeholder for Related Cars Carousel */}
      </div>
    </div>
  );
}
