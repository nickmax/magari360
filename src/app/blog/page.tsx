
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: 'Blog - Rivent', // Updated title
  description: 'Latest news, tips, and reviews from Rivent.', // Updated description
};

const mockBlogPosts = [
  { id: '1', title: 'Top 5 Road Trip Destinations from Nairobi', date: '2024-07-15', excerpt: 'Discover amazing road trip spots perfect for a weekend getaway with a Rivent rental.', slug: 'top-5-road-trips-nairobi' },
  { id: '2', title: 'Choosing the Right Rental Car for Your Adventure', date: '2024-07-10', excerpt: 'SUV, Sedan, or Compact? Here’s how to pick the best car for your travel needs.', slug: 'choosing-rental-car-guide' },
  { id: '3', title: 'Maximizing Fuel Efficiency on Your Rental Trip', date: '2024-07-05', excerpt: 'Save on fuel costs with these practical tips for drivers in Kenya.', slug: 'fuel-efficiency-rental-kenya' },
];

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1 className="text-foreground">Rivent Blog</TypographyH1> {/* Updated text */}
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Your source for travel insights, rental tips, car reviews, and news in Kenya.
        </TypographyP>
      </header>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-card border border-border group">
            <CardHeader className="p-4 sm:p-5">
              <TypographyP className="text-xs sm:text-sm text-muted-foreground">{post.date}</TypographyP>
              <CardTitle className="mt-1 text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 flex-grow">
              <TypographyP className="text-sm text-muted-foreground">{post.excerpt}</TypographyP>
            </CardContent>
            <CardFooter className="p-4 sm:p-5 border-t border-border bg-muted/30">
              <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                Read More &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <TypographyP className="text-xs sm:text-sm text-center text-muted-foreground pt-4">
        Blog content will be managed via Supabase. This is a placeholder display.
      </TypographyP>
    </div>
  );
}
