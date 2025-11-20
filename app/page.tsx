"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Bot, Calendar, Zap, BarChart, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["smarter", "faster", "better", "automated", "AI-powered"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Introducing Revi AI <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular">
              <span className="text-primary">Make your website</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold gradient-text"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="text-foreground">with AI</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Revi helps businesses dramatically improve their websites through intelligent AI enhancements.
              Deploy AI agents that respond instantly to visitors, book appointments automatically, and optimize
              your site 24/7 so you never miss a customer.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" asChild>
              <Link href="/pricing">
                Try Revi Free <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-4" variant="outline" asChild>
              <Link href="/signin">
                Book a Demo <Calendar className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayCardsSection() {
  const reviCards = [
    {
      icon: <Bot className="size-4 text-blue-300" />,
      title: "AI Website Agent",
      description: "Instant customer responses",
      date: "Available 24/7",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Calendar className="size-4 text-purple-300" />,
      title: "Smart Booking",
      description: "Automated appointments",
      date: "Zero manual work",
      iconClassName: "text-purple-500",
      titleClassName: "text-purple-500",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <TrendingUp className="size-4 text-green-300" />,
      title: "AI Optimization",
      description: "Continuous improvements",
      date: "Real-time insights",
      iconClassName: "text-green-500",
      titleClassName: "text-green-500",
      className:
        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <div className="w-full py-20 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Three powerful tools, one platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your website into an AI-powered customer engagement machine
          </p>
        </div>
        <div className="flex justify-center py-10">
          <DisplayCards cards={reviCards} />
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: "AI Website Agents",
      description:
        "Deploy intelligent AI agents that instantly respond to visitors, answer questions, and guide customers through your site. Never miss a lead again with 24/7 automated assistance.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-primary" />,
      title: "AI Appointment Assistant",
      description:
        "Automatically schedule appointments, manage calendars, and send reminders. Your AI assistant handles all the coordination while you focus on serving customers.",
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "AI Optimization Tools",
      description:
        "Get real-time insights and recommendations to improve your website performance. Our AI audits your site continuously and provides actionable improvement suggestions.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-primary" />,
      title: "24/7 Communication",
      description:
        "Keep customers engaged even when your team is unavailable. Automated responses ensure every visitor gets immediate attention and support.",
    },
    {
      icon: <BarChart className="w-10 h-10 text-primary" />,
      title: "Advanced Analytics",
      description:
        "Track visitor behavior, conversion rates, and AI performance. Make data-driven decisions with comprehensive analytics and reporting.",
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and security measures protect your data and your customers. SOC 2 compliant and GDPR ready.",
    },
  ];

  return (
    <div className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI features designed to help your business grow
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="w-full py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your website?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of businesses using Revi to automate customer engagement,
            boost conversions, and never miss an opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              asChild
            >
              <Link href="/pricing">
                Start Free Trial <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/signin">
                Book a Demo <Calendar className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Revi</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered website enhancement platform for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">About</Link></li>
              <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
              <li><Link href="#" className="hover:text-foreground">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Revi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DisplayCardsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
