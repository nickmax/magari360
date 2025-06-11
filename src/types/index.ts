
export type UserRole = 'buyer' | 'dealer' | 'admin';

export interface UserProfile {
  id: string; // Corresponds to Supabase Auth user ID
  role: UserRole;
  fullName?: string;
  avatarUrl?: string;
  phone?: string;
  // Dealer-specific fields
  dealerName?: string;
  dealerLogoUrl?: string;
  dealerBio?: string;
  dealerLocation?: string; // Or more structured address
  dealerWorkingHours?: string; // Or structured
  dealerRating?: number;
  dealerSpecialties?: string[];
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string; // UUID
  dealerId: string; // FK to UserProfile.id (where role is 'dealer')
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  bodyType?: string; // e.g., SUV, Sedan, Hatchback, Truck
  engineSize?: string; // e.g., "2.0L"
  color: string;
  registrationYear?: number;
  condition?: 'New' | 'Used' | 'Reconditioned';
  vin?: string;
  description: string;
  features: string[]; // Array of feature strings
  images: { url: string; alt: string; hint?: string }[]; // Array of image objects, URL from Supabase Storage
  location?: string; // General location, dealer location can be default
  status: 'available' | 'sold' | 'pending'; // For inventory management
  viewCount?: number;
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface VehicleInquiry {
  id?: string; // UUID
  vehicleId: string; // FK to Vehicle.id
  userId?: string; // FK to UserProfile.id (if logged in user)
  name: string; // Visitor name if not logged in
  email: string; // Visitor email
  phone?: string;
  message: string;
  status?: 'unread' | 'read' | 'replied';
  // Timestamps
  createdAt: string;
}

export interface TestDriveBooking {
  id?: string; // UUID
  vehicleId: string; // FK to Vehicle.id
  dealerId: string; // FK to UserProfile.id (dealer)
  userId: string; // FK to UserProfile.id (buyer)
  fullName: string; // From UserProfile or form
  contactNumber: string;
  email: string;
  preferredDate: string; // ISO Date string
  preferredTime: string; // e.g., "09:00-10:00"
  status: 'pending' | 'approved' | 'declined' | 'completed' | 'cancelled';
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id?: string; // UUID
  userId: string; // FK to UserProfile.id
  vehicleId: string; // FK to Vehicle.id
  // Timestamps
  createdAt: string;
}

export interface DealerReview {
  id?: string; // UUID
  dealerId: string; // FK to UserProfile.id (dealer)
  userId: string; // FK to UserProfile.id (buyer)
  rating: number; // 1-5
  comment?: string;
  // Timestamps
  createdAt: string;
}

export interface BlogPost {
  id?: string; // UUID
  authorId: string; // FK to UserProfile.id (admin or designated writer)
  title: string;
  slug: string;
  content: string; // Markdown or HTML
  excerpt?: string;
  tags?: string[];
  category?: 'Buying Tips' | 'Reviews' | 'News' | 'Maintenance';
  imageUrl?: string; // From Supabase Storage
  status: 'draft' | 'published';
  // Timestamps
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
}

export interface ContactFormData {
  id?: string; // UUID
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  // Timestamps
  createdAt: string;
}

// For finance calculator, not stored in DB directly but used for client-side logic
export interface FinanceCalculatorParams {
  price: number;
  deposit: number;
  durationMonths: number;
  interestRateAnnual: number; // percentage
}
