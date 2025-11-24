import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = genMeta({
  title: 'Blog - Web Development Tips & Insights',
  description: 'Expert insights on website development, web design trends, SEO tips, and digital marketing strategies from the Revi team. Learn how to grow your business online.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Web Development Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Tips, insights, and best practices for building successful websites
            </p>
          </header>

          <div className="grid gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-900 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-900 hover:underline font-semibold"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
