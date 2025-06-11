

import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: 'Blog - Magari 360',
  description: 'Latest news, tips, and reviews from Magari 360.',
};

const mockBlogPosts = [
  { id: '1', title: 'Top 5 SUVs for Kenyan Roads in 2024', date: '2024-07-15', excerpt: 'Discover the best SUVs that combine durability, comfort, and performance for the unique driving conditions in Kenya.', slug: 'top-5-suvs-kenya-2024' },
  { id: '2', title: 'A Buyer\'s Guide to Importing Cars to Kenya', date: '2024-07-10', excerpt: 'Navigating the car importation process can be complex. Here\'s what you need to know.', slug: 'importing-cars-kenya-guide' },
  { id: '3', title: 'Fuel Efficiency Tips for Kenyan Drivers', date: '2024-07-05', excerpt: 'Save on fuel costs with these practical tips tailored for drivers in Kenya.', slug: 'fuel-efficiency-tips-kenya' },
];

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-6 border-b border-border">
        <TypographyH1>Magari 360 Blog</TypographyH1>
        <TypographyP className="mt-3 max-w-xl sm:max-w-2xl mx-auto text-lg text-muted-foreground">
          Your source for automotive insights, buying tips, reviews, and news in Kenya.
        </TypographyP>
      </header>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="p-4 sm:p-5">
              <TypographyP className="text-xs sm:text-sm text-muted-foreground">{post.date}</TypographyP>
              <CardTitle className="mt-1 text-lg sm:text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 flex-grow">
              <TypographyP className="text-sm text-muted-foreground">{post.excerpt}</TypographyP>
            </CardContent>
            <CardFooter className="p-4 sm:p-5 border-t bg-muted/10">
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

