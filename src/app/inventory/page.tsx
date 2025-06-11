
import { VehicleList } from '@/components/inventory/vehicle-list';
import { TypographyH1, TypographyP } from '@/components/ui/typography';

export const metadata = {
  title: 'Vehicle Inventory - Magari 360',
  description: 'Browse our curated selection of luxury and performance vehicles on Magari 360.',
};

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>
          Our Vehicle Inventory
        </TypographyH1>
        <TypographyP className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our curated selection of high-quality vehicles. Use the filters to find exactly what you're looking for.
        </TypographyP>
      </header>
      <VehicleList />
    </div>
  );
}
