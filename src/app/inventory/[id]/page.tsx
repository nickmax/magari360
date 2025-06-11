
import { mockVehicles } from '@/data/mock-vehicles';
import { VehicleImageGallery } from '@/components/vehicle-image-gallery';
import { VehicleInquiryForm } from '@/components/vehicle-inquiry-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TypographyH1, TypographyH2, TypographyP } from '@/components/ui/typography';
import { CalendarDays, Gauge, Fuel, Palette, Settings2, UserCircle, Phone, Heart, DollarSign, Info, Users, MessageCircle } from 'lucide-react'; // Replaced Gem with Fuel
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
    return { title: 'Vehicle Not Found - Rivent' }; // Updated
  }
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - Rivent`, // Updated
    description: `Details for ${vehicle.make} ${vehicle.model}: ${vehicle.description.substring(0, 150)}... on Rivent.`, // Updated
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
      <header className="pb-4 border-b border-border">
        <TypographyH1 className="mb-1 text-2xl sm:text-3xl lg:text-4xl text-foreground">{vehicleName}</TypographyH1>
        <TypographyP className="text-md sm:text-lg text-muted-foreground">{vehicle.location || 'Location not specified'}</TypographyP>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Image Gallery & Description etc. */}
        <div className="lg:col-span-3 space-y-8">
          <VehicleImageGallery images={vehicle.images} vehicleName={vehicleName} />

          <Card className="bg-card shadow-lg rounded-lg border-border">
            <CardHeader>
              <TypographyH2 className="border-b-0 pb-0 text-xl sm:text-2xl text-foreground">Vehicle Description</TypographyH2>
            </CardHeader>
            <CardContent>
              <TypographyP className="text-sm sm:text-base text-muted-foreground">{vehicle.description}</TypographyP>
            </CardContent>
          </Card>

          {vehicle.features && vehicle.features.length > 0 && (
            <Card className="bg-card shadow-lg rounded-lg border-border">
              <CardHeader>
                <TypographyH2 className="border-b-0 pb-0 text-xl sm:text-2xl text-foreground">Key Features</TypographyH2>
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
          <Card className="sticky top-20 shadow-xl rounded-lg bg-card border-border">
            <CardHeader className="text-center bg-secondary/30 p-4 sm:p-6 rounded-t-lg">
              <TypographyP className="text-xs sm:text-sm text-muted-foreground">Price per day</TypographyP> {/* Updated text */}
              <p className="text-3xl sm:text-4xl font-bold text-primary">${vehicle.price.toLocaleString()}</p>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-6">
              <Button asChild size="lg" className="w-full font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/book-test-drive?vehicleId=${vehicle.id}&vehicleName=${encodeURIComponent(vehicleName)}`}> {/* Changed to book-test-drive for consistency, can be Book Now */}
                  <DollarSign className="mr-2 h-5 w-5" /> Book Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full text-base border-primary text-primary hover:bg-primary/10">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg rounded-lg border-border">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-foreground">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3 sm:w-1/4 text-xs sm:text-sm text-muted-foreground"><CalendarDays className="inline mr-1.5 h-4 w-4"/>Year</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.year}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Users className="inline mr-1.5 h-4 w-4"/>Make</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.make}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Info className="inline mr-1.5 h-4 w-4"/>Model</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Gauge className="inline mr-1.5 h-4 w-4"/>Mileage</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.mileage.toLocaleString()} miles</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Fuel className="inline mr-1.5 h-4 w-4"/>Fuel Type</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.fuelType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Settings2 className="inline mr-1.5 h-4 w-4"/>Transmission</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.transmission}</TableCell>
                  </TableRow>
                  {vehicle.engineSize && (
                    <TableRow>
                      <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Info className="inline mr-1.5 h-4 w-4"/>Engine</TableCell>
                      <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.engineSize}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium text-xs sm:text-sm text-muted-foreground"><Palette className="inline mr-1.5 h-4 w-4"/>Color</TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground">{vehicle.color}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg rounded-lg border-border">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-foreground">Partner Information</CardTitle> {/* Updated text */}
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-border">
                  <AvatarImage src="https://placehold.co/48x48.png?text=P" alt="Partner Logo" data-ai-hint="logo partner" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <TypographyP className="font-semibold text-sm sm:text-base text-foreground">Example Partner Name</TypographyP>
              </div>
              <Button variant="outline" className="w-full text-xs sm:text-sm border-primary text-primary hover:bg-primary/10">
                <UserCircle className="mr-2 h-4 w-4" /> View Partner Profile (TBD)
              </Button>
               <Button variant="outline" className="w-full text-xs sm:text-sm border-primary text-primary hover:bg-primary/10">
                <Phone className="mr-2 h-4 w-4" /> Show Phone (TBD)
              </Button>
            </CardContent>
          </Card>

          <VehicleInquiryForm vehicleId={vehicle.id} vehicleName={vehicleName} />
        </div>
      </div>

      <Separator className="my-8 sm:my-12 border-border" />
      <div>
        <TypographyH2 className="mb-6 text-center text-xl sm:text-2xl text-foreground">Related Cars</TypographyH2>
        <TypographyP className="text-center text-muted-foreground text-sm sm:text-base">
          More vehicles like this one will appear here soon.
        </TypographyP>
      </div>
    </div>
  );
}
