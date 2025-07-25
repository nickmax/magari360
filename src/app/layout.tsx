
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { CircleDot, Search, Tag, UserCircle, LogIn, LogOut, LayoutDashboard, Newspaper, MessageSquare, AlignJustify, X as XIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';


export const metadata: Metadata = {
  title: 'Rivent - Your Car Rental Platform',
  description: 'Discover, book, and manage car rentals with Rivent.',
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children, className, onClick }, ref) => {
    return (
      <Link href={href} className={className} onClick={onClick} ref={ref}>
        <span className="flex items-center gap-2">
          {children}
        </span>
      </Link>
    );
  }
);
NavLink.displayName = 'NavLink';


async function AppHeader() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const navItems = [
    { href: "/inventory", label: "Inventory", icon: <Search className="h-4 w-4" />, alwaysShow: true, className: "" },
    { href: "/sell-your-car", label: "List Your Car", icon: <Tag className="h-4 w-4" />, className: "hidden lg:flex" },
    { href: "/dealer-directory", label: "Partners", icon: <UserCircle className="h-4 w-4" />, className: "hidden lg:flex" },
    { href: "/blog", label: "Blog", icon: <Newspaper className="h-4 w-4" />, className: "hidden lg:flex" },
    { href: "/contact", label: "Contact Us", icon: <MessageSquare className="h-4 w-4" />, className: "hidden lg:flex" },
  ];
  
  const baseNavClasses = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2";
  const mobileLinkClasses = "py-3 px-4 text-base w-full justify-start hover:bg-muted/50 rounded-md";


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-4 sm:mr-6 flex items-center space-x-2">
          <CircleDot className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          <span className="font-bold text-lg sm:text-xl font-headline text-foreground">
            Rivent
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-3 lg:space-x-5">
          {navItems.map(item => (
            <NavLink key={item.href} href={item.href} className={cn(baseNavClasses, item.className)}>
               {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <>
              <Button asChild variant="default" size="sm" className="hidden sm:flex bg-foreground text-background hover:bg-foreground/90">
                <Link href="/dashboard">
                  <span className="flex items-center">
                    <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                  </span>
                </Link>
              </Button>
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" title="Sign Out">
                  <LogOut className="h-5 w-5" />
                   <span className="sr-only">Sign Out</span>
                </Button>
              </form>
            </>
          ) : (
             <Button asChild variant="default" size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                <Link href="/auth/signin">
                  <span className="flex items-center">
                    <LogIn className="h-4 w-4 mr-0 sm:mr-2" /> <span className="hidden sm:inline">Sign In</span>
                  </span>
                </Link>
              </Button>
          )}
          <ThemeToggleButton />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="flex items-center justify-center">
                    <AlignJustify className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-4 bg-background">
                 <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center space-x-2">
                      <CircleDot className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl font-headline text-foreground">Rivent</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                         <span className="flex items-center justify-center">
                            <XIcon className="h-5 w-5" />
                            <span className="sr-only">Close menu</span>
                         </span>
                      </Button>
                    </SheetClose>
                  </div>
                <nav className="flex flex-col space-y-2">
                  {navItems.map(item => (
                     <SheetClose asChild key={item.href + '-nav-item'}>
                        <Link href={item.href} className={cn(baseNavClasses, mobileLinkClasses)}>
                            <span className="flex items-center gap-2">
                                {item.icon} {item.label}
                            </span>
                        </Link>
                      </SheetClose>
                  ))}
                  <hr className="my-3 border-border"/>
                  {user ? (
                    <>
                     <SheetClose asChild key="dashboard-mobile-link">
                        <Link href="/dashboard" className={cn(baseNavClasses, mobileLinkClasses)}>
                            <span className="flex items-center gap-2">
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </span>
                        </Link>
                      </SheetClose>
                       <form action={signOut} className="w-full">
                           <SheetClose asChild>
                                <Button type="submit" variant="ghost" className={cn(baseNavClasses, mobileLinkClasses, "text-muted-foreground hover:text-primary w-full justify-start")}>
                                  <span className="flex items-center gap-2">
                                    <LogOut className="h-4 w-4" /> Sign Out
                                  </span>
                                </Button>
                            </SheetClose>
                        </form>
                    </>
                  ) : (
                    <SheetClose asChild key="signin-mobile-link">
                        <Link href="/auth/signin" className={cn(baseNavClasses, mobileLinkClasses, "text-primary")}>
                          <span className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" /> Sign In
                          </span>
                        </Link>
                    </SheetClose>
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
    <footer className="border-t bg-black text-slate-400">
      <div className="container py-8 text-center text-xs sm:text-sm">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
           <CircleDot className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
           <p className="font-bold text-md sm:text-lg font-headline text-white">Rivent</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-2 mb-4 text-xs sm:text-sm">
          <Link href="/inventory" className="hover:text-primary">Inventory</Link>
          <Link href="/sell-your-car" className="hover:text-primary">List Your Car</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy (TBD)</Link>
           <Link href="/terms" className="hover:text-primary">Terms of Service (TBD)</Link>
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Rivent. All rights reserved. Your trusted car rental platform.
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
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
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
