
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { CarIcon, Search, Tag, UserCircle, LogIn, LogOut, LayoutDashboard, Newspaper, MessageSquare, AlignJustify, XIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';


export const metadata: Metadata = {
  title: 'Magari 360 - Kenyan Car Dealership Platform',
  description: 'Buy, sell, and discover cars in Kenya. Manage your inventory with Magari 360.',
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "", isMobile = false, onClick }) => {
  const baseClasses = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2";
  const mobileClasses = isMobile ? "py-3 px-4 text-base w-full justify-start hover:bg-muted/50 rounded-md" : "";

  const linkContent = (
    <Link href={href} className={cn(baseClasses, mobileClasses, className)} onClick={onClick}>
      {children}
    </Link>
  );

  return isMobile && onClick ? (
    <SheetClose asChild>
      {linkContent}
    </SheetClose>
  ) : linkContent;
};


async function AppHeader() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const navItems = [
    { href: "/inventory", label: "Inventory", icon: <Search className="h-4 w-4" />, alwaysShow: true },
    { href: "/sell-your-car", label: "Sell Your Car", icon: <Tag className="h-4 w-4" /> },
    { href: "/dealer-directory", label: "Dealers", icon: <UserCircle className="h-4 w-4" /> },
    { href: "/blog", label: "Blog", icon: <Newspaper className="h-4 w-4" /> },
    { href: "/contact", label: "Contact Us", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-4 sm:mr-6 flex items-center space-x-2">
          <CarIcon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          <span className="font-bold text-lg sm:text-xl font-headline">
            Magari 360
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-3 lg:space-x-5">
          {navItems.map(item => (
            <NavLink key={item.href} href={item.href} className={cn(!item.alwaysShow && "hidden lg:flex")}>
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <>
              <NavLink href="/dashboard" className="hidden sm:flex">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </NavLink>
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </form>
            </>
          ) : (
            <NavLink href="/auth/signin" className="text-primary hover:text-primary/80">
              <LogIn className="h-4 w-4" /> Sign In
            </NavLink>
          )}
          <ThemeToggleButton />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignJustify className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-4">
                 <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center space-x-2">
                      <CarIcon className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl font-headline">Magari 360</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <XIcon className="h-5 w-5" />
                         <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                <nav className="flex flex-col space-y-2">
                  {navItems.map(item => (
                     <NavLink key={item.href} href={item.href} isMobile={true}>
                        {item.icon} {item.label}
                      </NavLink>
                  ))}
                  <hr className="my-3 border-border"/>
                  {user ? (
                    <>
                     <NavLink href="/dashboard" isMobile={true}>
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </NavLink>
                       <SheetClose asChild>
                        <form action={signOut} className="w-full">
                           <Button type="submit" variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 py-3 px-4 text-base w-full justify-start hover:bg-muted/50 rounded-md">
                            <LogOut className="h-4 w-4" /> Sign Out
                          </Button>
                        </form>
                      </SheetClose>
                    </>
                  ) : (
                    <NavLink href="/auth/signin" isMobile={true} className="text-primary">
                      <LogIn className="h-4 w-4" /> Sign In
                    </NavLink>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-8 text-center text-xs sm:text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
           <CarIcon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
           <p className="font-bold text-md sm:text-lg font-headline text-foreground">Magari 360</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-2 mb-4 text-xs sm:text-sm">
          <Link href="/inventory" className="hover:text-primary">Inventory</Link>
          <Link href="/sell-your-car" className="hover:text-primary">Sell Car</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy (TBD)</Link>
           <Link href="/terms" className="hover:text-primary">Terms of Service (TBD)</Link>
        </div>
        <p className="text-xs">
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col bg-background">
          <AppHeader />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
