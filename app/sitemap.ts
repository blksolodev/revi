import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import { getAllBlogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const routes = [
    '',
    '/pricing',
    '/work',
    '/testimonials',
    '/signin',
    '/signup',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Blog posts
  const blogPosts = getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
