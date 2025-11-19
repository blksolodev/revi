"use client";

import { Pricing } from "@/components/ui/pricing";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviPlans = [
  {
    name: "STARTER",
    price: "49",
    yearlyPrice: "39",
    period: "per month",
    features: [
      "1 AI Website Agent",
      "Basic appointment scheduling",
      "Up to 500 monthly conversations",
      "Email support",
      "Basic analytics dashboard",
      "Website optimization suggestions",
    ],
    description: "Perfect for small businesses getting started with AI",
    buttonText: "Start Free Trial",
    href: "/signin",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "149",
    yearlyPrice: "119",
    period: "per month",
    features: [
      "3 AI Website Agents",
      "Advanced appointment scheduling",
      "Up to 2,000 monthly conversations",
      "Priority support",
      "Advanced analytics & reporting",
      "Custom AI training",
      "Integration with CRM tools",
      "Multi-language support",
    ],
    description: "Ideal for growing businesses scaling their online presence",
    buttonText: "Get Started",
    href: "/signin",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "399",
    yearlyPrice: "319",
    period: "per month",
    features: [
      "Unlimited AI Website Agents",
      "Enterprise appointment system",
      "Unlimited conversations",
      "Dedicated account manager",
      "Custom AI models",
      "Advanced security features",
      "API access",
      "White-label options",
      "SLA agreement",
      "Custom integrations",
    ],
    description: "For large organizations with custom needs",
    buttonText: "Contact Sales",
    href: "/signin",
    isPopular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
      <Pricing
        plans={reviPlans}
        title="Choose the perfect plan for your business"
        description="All plans include core AI features, customer support, and regular updates.
Start with a 14-day free trial, no credit card required."
      />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto bg-muted/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-6">
            We offer tailored plans for enterprises with specific requirements.
            Contact our sales team to discuss your needs.
          </p>
          <Button size="lg" asChild>
            <Link href="/signin">
              Contact Sales
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
