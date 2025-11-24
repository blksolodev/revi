"use client";

import { Pricing } from "@/components/ui/pricing";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";

const reviPlans = [
  {
    name: "STARTER",
    price: "1499",
    yearlyPrice: "1349",
    period: "setup + $49/mo",
    features: [
      "5-page custom website",
      "Mobile-responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "2-week delivery",
      "Then $49/month maintenance:",
      "→ Hosting & security",
      "→ Regular backups",
      "→ Monthly updates",
      "→ Email support",
    ],
    description: "Perfect for small businesses and startups",
    buttonText: "Get Started",
    href: "https://buy.stripe.com/6oU14n2WK0zI4a72Yr3ZK01", // Starter payment link
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "3749",
    yearlyPrice: "3374",
    period: "setup + $149/mo",
    features: [
      "10-page custom website",
      "Advanced animations",
      "E-commerce (up to 50 products)",
      "AI chatbot integration",
      "CMS integration",
      "3-week delivery",
      "Then $149/month maintenance:",
      "→ Everything in Starter",
      "→ Priority support",
      "→ SEO monitoring",
      "→ Analytics reports",
    ],
    description: "Ideal for growing businesses with advanced needs",
    buttonText: "Get Started",
    href: "https://buy.stripe.com/6oU9ATgNAbemayv2Yr3ZK00", // Professional payment link
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "7749",
    yearlyPrice: "6974",
    period: "setup + $299/mo",
    features: [
      "Unlimited pages",
      "Custom web application",
      "Full e-commerce solution",
      "Advanced AI integration",
      "Custom API development",
      "Dedicated project manager",
      "Priority development",
      "Then $299/month maintenance:",
      "→ Everything in Professional",
      "→ 24/7 priority support",
      "→ Unlimited updates",
      "→ SLA guarantee",
    ],
    description: "For large organizations with complex requirements",
    buttonText: "Get Started",
    href: "https://buy.stripe.com/4gM6oH68WaaicGD6aD3ZK02", // Enterprise payment link
    isPopular: false,
  },
];

const testimonialsColumn1 = [
  {
    text: "Revi transformed our online presence completely. The website they built not only looks stunning but has increased our conversion rate by 40%.",
    image: "https://i.pravatar.cc/150?img=5",
    name: "Sarah Johnson",
    role: "",
  },
  {
    text: "Working with Revi was seamless from start to finish. They delivered our e-commerce site ahead of schedule.",
    image: "https://i.pravatar.cc/150?img=12",
    name: "Michael Chen",
    role: "",
  },
  {
    text: "The attention to detail and quality of work exceeded our expectations. Our site loads incredibly fast and looks perfect on every device.",
    image: "https://i.pravatar.cc/150?img=9",
    name: "Emily Rodriguez",
    role: "",
  },
];

const testimonialsColumn2 = [
  {
    text: "The AI chatbot integration has been a game-changer for our customer support. Response times dropped by 60% and customer satisfaction is at an all-time high.",
    image: "https://i.pravatar.cc/150?img=33",
    name: "David Park",
    role: "",
  },
  {
    text: "Their professional package was worth every penny. The custom animations and design really make our brand stand out from competitors.",
    image: "https://i.pravatar.cc/150?img=16",
    name: "Lisa Thompson",
    role: "",
  },
  {
    text: "Monthly maintenance is so affordable and they're always quick to help. Our website has been running perfectly for over a year now.",
    image: "https://i.pravatar.cc/150?img=13",
    name: "James Wilson",
    role: "",
  },
];

const testimonialsColumn3 = [
  {
    text: "Best investment we made for our business. The SEO optimization alone has tripled our organic traffic in just 6 months.",
    image: "https://i.pravatar.cc/150?img=20",
    name: "Maria Garcia",
    role: "",
  },
  {
    text: "Their enterprise package gave us everything we needed. The custom API development integrated perfectly with our existing systems.",
    image: "https://i.pravatar.cc/150?img=15",
    name: "Robert Chang",
    role: "",
  },
  {
    text: "Fast, professional, and always available. They turned our vision into reality and delivered ahead of the deadline.",
    image: "https://i.pravatar.cc/150?img=32",
    name: "Amanda Foster",
    role: "",
  },
];

function TestimonialsSection() {
  return (
    <div className="w-full py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by growing businesses
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our clients have to say about working with Revi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto h-[500px] overflow-hidden">
          <TestimonialsColumn testimonials={testimonialsColumn1} duration={15} />
          <TestimonialsColumn
            testimonials={testimonialsColumn2}
            duration={19}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={testimonialsColumn3}
            duration={17}
            className="hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background relative py-8">
      <div className="absolute top-8 left-8 z-10">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-center">
        <Pricing
          plans={reviPlans}
          title="Choose the perfect package for your business"
          description="One-time setup fee with affordable monthly maintenance.
Get a professionally built website, then keep it running smoothly with ongoing support."
        />
      </div>
      <TestimonialsSection />
    </main>
  );
}
