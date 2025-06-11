"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export interface Filters {
  searchTerm: string;
  make: string;
  model: string; 
  minPrice: string;
  maxPrice: string;
}

interface VehicleFiltersProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  allMakes: string[];
  allModels: string[]; 
  onResetFilters: () => void;
}

export function VehicleFilters({ filters, setFilters, allMakes, allModels, onResetFilters }: VehicleFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [name]: value, ...(name === 'make' && { model: '' }) })); // Reset model if make changes
  };
  
  const priceRanges = [
    { label: "Any Price", min: "", max: "" },
    { label: "Under $50,000", min: "0", max: "49999" },
    { label: "$50,000 - $99,999", min: "50000", max: "99999" },
    { label: "$100,000 - $149,999", min: "100000", max: "149999" },
    { label: "$150,000 - $199,999", min: "150000", max: "199999" },
    { label: "Over $200,000", min: "200000", max: "" },
  ];

  // In a real app, models would be dynamically filtered based on selected make from a comprehensive list
  const currentModels = filters.make ? allModels.filter(model => model.toLowerCase().startsWith(filters.make.toLowerCase().substring(0,2)) || allModels.length < 20) : allModels;


  return (
    <div className="mb-8 p-4 sm:p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        <div className="xl:col-span-1">
          <label htmlFor="searchTerm" className="block text-sm font-medium text-muted-foreground mb-1">Keyword Search</label>
          <div className="relative">
            <Input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="e.g., Audi R8, SUV..."
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-muted-foreground mb-1">Make</label>
          <Select name="make" value={filters.make} onValueChange={handleSelectChange('make')}>
            <SelectTrigger>
              <SelectValue placeholder="Any Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Make</SelectItem>
              {allMakes.map(make => <SelectItem key={make} value={make}>{make}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-muted-foreground mb-1">Model</label>
          <Select name="model" value={filters.model} onValueChange={handleSelectChange('model')} disabled={!filters.make && currentModels.length > 10 && currentModels.length !== allModels.length}>
            <SelectTrigger>
              <SelectValue placeholder="Any Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Model</SelectItem>
              {currentModels.map(model => <SelectItem key={model} value={model}>{model}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-muted-foreground mb-1">Price Range</label>
           <Select 
            value={filters.minPrice && filters.maxPrice ? `${filters.minPrice}-${filters.maxPrice}` : ""}
            onValueChange={(value) => {
              const [min, max] = value.split('-');
              setFilters(prev => ({ ...prev, minPrice: min || "", maxPrice: max || "" }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map(range => (
                <SelectItem key={range.label} value={`${range.min}-${range.max}`}>{range.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={onResetFilters} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
