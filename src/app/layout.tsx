import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster as SonnerToaster } from '@/components/ui/sonner'; // Renamed to avoid conflict
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { CarIcon, Search, Home, Tag, MessageSquare, UserCircle, LogIn, LogOut, LayoutDashboard, Newspaper } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';

export const metadata: Metadata = {
  title: 'Magari 360 - Kenyan Car Dealership Platform',
  description: 'Buy, sell, and discover cars in Kenya. Manage your inventory with Magari 360.',
};

// Header Component
async function AppHeader() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CarIcon className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl font-headline sm:inline-block">
            Magari 360
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-4 lg:space-x-6">
          <Link href="/inventory" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <Search className="inline-block mr-1 h-4 w-4" /> Inventory
          </Link>
          <Link href="/sell-your-car" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <Tag className="inline-block mr-1 h-4 w-4" /> Sell Your Car
          </Link>
          <Link href="/dealer-directory" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <UserCircle className="inline-block mr-1 h-4 w-4" /> Dealers
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <Newspaper className="inline-block mr-1 h-4 w-4" /> Blog
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <MessageSquare className="inline-block mr-1 h-4 w-4" /> Contact Us
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden sm:inline-block">
                <LayoutDashboard className="inline-block mr-1 h-4 w-4" /> Dashboard
              </Link>
              <form action={signOut}>
                <button type="submit" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center">
                  <LogOut className="inline-block mr-1 h-4 w-4" /> Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/auth/signin" className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hidden sm:inline-block">
              <LogIn className="inline-block mr-1 h-4 w-4" /> Sign In
            </Link>
          )}
          <ThemeToggleButton />
          {/* Mobile Menu Trigger can be added here */}
        </div>
      </div>
    </header>
  );
}

// Footer Component
function AppFooter() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
           <CarIcon className="h-8 w-8 text-primary" />
           <p className="font-bold text-lg font-headline text-foreground">Magari 360</p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/inventory" className="hover:text-primary">Inventory</Link>
          <Link href="/sell-your-car" className="hover:text-primary">Sell Car</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy (TBD)</Link>
           <Link href="/terms" className="hover:text-primary">Terms of Service (TBD)</Link>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Magari 360. All rights reserved. Platform for Kenyan car dealerships.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col bg-background">
          <AppHeader />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <AppFooter />
        </div>
        <SonnerToaster />
        <RadixToaster />
      </body>
    </html>
  );
}
