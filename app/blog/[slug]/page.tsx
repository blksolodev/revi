import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { generateMetadata as genMeta, generateBreadcrumbSchema } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  return genMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-background">
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
              </Button>
            </div>

            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <span>•</span>
                <span>By {post.author}</span>
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <footer className="mt-12 pt-8 border-t">
              <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Build Your Website?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get a professionally built website with affordable monthly maintenance
                </p>
                <Button asChild size="lg">
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </>
  );
}
