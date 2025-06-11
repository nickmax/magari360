
import { VehicleList } from '@/components/inventory/vehicle-list';
import { TypographyH1, TypographyP } from '@/components/ui/typography';

export const metadata = {
  title: 'Our Cars - Rivent', // Updated title
  description: 'Browse our curated selection of rental vehicles on Rivent.', // Updated description
};

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1 className="text-foreground">
          Our Car Fleet
        </TypographyH1> {/* Updated text */}
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our selection of quality vehicles. Use the filters to find exactly what you need for your next trip.
        </TypographyP>
      </header>
      <VehicleList />
    </div>
  );
}
