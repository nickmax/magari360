import { VehicleList } from '@/components/inventory/vehicle-list';

export const metadata = {
  title: 'Vehicle Inventory - MagariAI',
  description: 'Browse our curated selection of luxury and performance vehicles.',
};

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Our Vehicle Inventory
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our curated selection of high-quality vehicles. Use the filters to find exactly what you're looking for.
        </p>
      </header>
      <VehicleList />
    </div>
  );
}