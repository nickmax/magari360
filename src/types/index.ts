export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  engineSize?: string; // e.g., "2.0L"
  color: string;
  vin?: string;
  description: string;
  features: string[];
  images: { url: string; alt: string; hint?: string }[]; 
  location?: string;
}

export interface VehicleInquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
  vehicleId: string;
  vehicleName: string;
}

export interface ValuationData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin?: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  features?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  // images would be File[] on client, string[] (urls) after upload
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}