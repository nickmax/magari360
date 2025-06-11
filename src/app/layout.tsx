import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { CarIcon } from 'lucide-react'; 

export const metadata: Metadata = {
  title: 'MagariAI - Your Premier Vehicle Marketplace',
  description: 'Discover, buy, and sell vehicles with MagariAI.',
};

// Header Component 
function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CarIcon className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            MagariAI
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <Link href="/inventory" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Inventory
          </Link>
          <Link href="/sell-your-car" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Sell Your Car
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Contact Us
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}

// Footer Component
function AppFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <CarIcon className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            Built by MagariAI. &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
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
        <Toaster />
      </body>
    </html>
  );
}