"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Vehicle } from '@/types';
import { VehicleCard } from '@/components/vehicle-card';
import { VehicleFilters, type Filters } from './vehicle-filters';
import { mockVehicles } from '@/data/mock-vehicles'; 
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const initialFilters: Filters = {
  searchTerm: '',
  make: '',
  model: '',
  minPrice: '',
  maxPrice: '',
};

export function VehicleList() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const allMakes = useMemo(() => [...new Set(mockVehicles.map(v => v.make))].sort(), []);
  // For models, this is simplified. In a real app, models would be fetched based on selected make.
  const allModels = useMemo(() => [...new Set(mockVehicles.map(v => v.model))].sort(), []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      const searchTermMatch = filters.searchTerm.toLowerCase() === '' ||
        vehicle.make.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        vehicle.year.toString().includes(filters.searchTerm) ||
        vehicle.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (vehicle.features && vehicle.features.some(f => f.toLowerCase().includes(filters.searchTerm.toLowerCase())));

      const makeMatch = filters.make === '' || vehicle.make === filters.make;
      
      let modelMatch = true;
      if (filters.make && filters.model) { // Only filter by model if a make is also selected
        modelMatch = vehicle.model === filters.model;
      } else if (!filters.make && filters.model) { // If only model is selected, match any vehicle with that model
         modelMatch = vehicle.model === filters.model;
      }


      const minPrice = parseFloat(filters.minPrice);
      const maxPrice = parseFloat(filters.maxPrice);

      const priceMatch = 
        (isNaN(minPrice) || filters.minPrice === "" || vehicle.price >= minPrice) &&
        (isNaN(maxPrice) || filters.maxPrice === "" || vehicle.price <= maxPrice);

      return searchTermMatch && makeMatch && modelMatch && priceMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <div>
      <VehicleFilters
        filters={filters}
        setFilters={setFilters}
        allMakes={allMakes}
        allModels={allModels} 
        onResetFilters={resetFilters}
      />
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {paginatedVehicles.length} of {filteredVehicles.length} vehicles.
        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
      </div>
      {paginatedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"> {/* Changed to 3 columns for better card display */}
          {paginatedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 min-h-[300px] flex flex-col justify-center items-center bg-card rounded-lg shadow">
          <h3 className="font-headline text-2xl text-foreground">No vehicles match your criteria.</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or view all vehicles.</p>
          <Button onClick={resetFilters} variant="link" className="mt-4">Clear Filters</Button>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-10">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            // Display only a few page numbers if many pages
            .filter(pageNumber => totalPages <= 5 || Math.abs(pageNumber - currentPage) < 2 || pageNumber === 1 || pageNumber === totalPages)
            .map((pageNumber, index, arr) => (
            <div key={pageNumber} className="flex items-center">
            {index > 0 && arr[index-1] !== pageNumber -1 && pageNumber !== 2 && pageNumber !== currentPage +1 && pageNumber !== totalPages && <span className="mx-1 text-muted-foreground">...</span> }
            <Button 
              variant={currentPage === pageNumber ? "default" : "outline"} 
              onClick={() => handlePageChange(pageNumber)}
              className="h-9 w-9 p-0"
              aria-label={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </Button>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}