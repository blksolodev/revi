"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const portfolioProjects = [
  {
    title: "Bella's Boutique",
    link: "https://example.com/bellas-boutique",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    title: "Summit Fitness Center",
    link: "https://example.com/summit-fitness",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
  },
  {
    title: "The Green Leaf Cafe",
    link: "https://example.com/green-leaf",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
  },
  {
    title: "TechVision Solutions",
    link: "https://example.com/techvision",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "Luxe Realty Group",
    link: "https://example.com/luxe-realty",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  },
  {
    title: "Artisan Bakery Co.",
    link: "https://example.com/artisan-bakery",
    thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
  },
  {
    title: "Harbor View Marina",
    link: "https://example.com/harbor-view",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  },
  {
    title: "Precision Auto Repair",
    link: "https://example.com/precision-auto",
    thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
  },
  {
    title: "Serenity Spa & Wellness",
    link: "https://example.com/serenity-spa",
    thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
  },
  {
    title: "Mountain Peak Adventures",
    link: "https://example.com/mountain-peak",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
  },
  {
    title: "Urban Threads Apparel",
    link: "https://example.com/urban-threads",
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
  },
  {
    title: "Coastal Dental Care",
    link: "https://example.com/coastal-dental",
    thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
  },
  {
    title: "Skyline Architecture",
    link: "https://example.com/skyline-architecture",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    title: "Fresh Harvest Market",
    link: "https://example.com/fresh-harvest",
    thumbnail: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
  },
  {
    title: "Elite Legal Partners",
    link: "https://example.com/elite-legal",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>

      <HeroParallax products={portfolioProjects} />

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to join them?</h3>
          <p className="mb-6 opacity-90">
            Start your journey to a professional online presence today. Let's build something amazing together.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100" asChild>
            <Link href="/pricing">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
