"use client";

 

import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { MoveRight, Bot, Calendar, Zap, BarChart, Shield, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

import DisplayCards from "@/components/ui/display-cards";

import { Sparkles, TrendingUp } from "lucide-react";

import Link from "next/link";

 

function Hero() {

  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(

    () => ["professional", "custom", "modern", "conversion-focused", "affordable"],

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

            <Button variant="secondary" size="sm" className="gap-4 bg-purple-600 text-white border-0 hover:bg-purple-700">

              Introducing Revi <MoveRight className="w-4 h-4" />

            </Button>

          </div>

          <div className="flex gap-4 flex-col">

            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular">

              <span className="text-purple-600 font-semibold">We build</span>

              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">

                &nbsp;

                {titles.map((title, index) => (

                  <motion.span

                    key={index}

                    className="absolute font-semibold text-purple-600"

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

              <span className="text-foreground">websites</span>

            </h1>

 

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">

              Professional websites designed specifically for small businesses. Get a custom site with built-in growth tools

              like AI chat, automated booking, and analytics—all included to help you attract customers and grow your business online.

            </p>

          </div>

          <div className="flex flex-row gap-3">

            <Button size="lg" className="gap-4 bg-purple-600 hover:bg-purple-700 border-0" asChild>

              <Link href="/pricing">

                Get Your Website <MoveRight className="w-4 h-4" />

              </Link>

            </Button>

            <Button size="lg" className="gap-4" variant="outline" asChild>

              <Link href="/signin">

                See Our Work <Calendar className="w-4 h-4" />

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

      icon: <Sparkles className="size-4 text-blue-900" />,

      title: "Custom Design",

      description: "Tailored to your brand",

      date: "Mobile-responsive",

      iconClassName: "text-purple-600",

      titleClassName: "text-purple-600",

      className:

        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",

    },

    {

      icon: <Zap className="size-4 text-purple-600" />,

      title: "Professional Development",

      description: "Fast & SEO-optimized",

      date: "Built for growth",

      iconClassName: "text-purple-600",

      titleClassName: "text-purple-600",

      className:

        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",

    },

    {

      icon: <TrendingUp className="size-4 text-purple-600" />,

      title: "Growth Features",

      description: "AI chat & analytics",

      date: "Attract more customers",

      iconClassName: "text-purple-600",

      titleClassName: "text-purple-600",

      className:

        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",

    },

  ];

 

  return (

    <div className="w-full py-20 bg-muted/30">

      <div className="container mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-5xl font-bold mb-4">

            Complete website solutions for small businesses

          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">

            Professional websites with built-in growth tools to help you attract customers and grow online

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

      icon: <Sparkles className="w-10 h-10 text-blue-900" />,

      title: "Custom Website Design",

      description:

        "Beautiful, mobile-responsive websites tailored to your brand and business goals. Every site is custom-built to reflect your unique identity and convert visitors into customers.",

    },

    {

      icon: <Zap className="w-10 h-10 text-purple-900" />,

      title: "Fast & SEO-Optimized",

      description:

        "Lightning-fast loading speeds and search engine optimization built in from day one. Get found on Google and provide an exceptional user experience that keeps visitors engaged.",

    },

    {

      icon: <Shield className="w-10 h-10 text-blue-900" />,

      title: "Reliable & Secure",

      description:

        "Professional hosting with 99.9% uptime, automatic backups, and enterprise-grade security. Your website is always online, always secure, and always working for your business.",

    },

    {

      icon: <Bot className="w-10 h-10 text-purple-900" />,

      title: "AI Chat Assistant",

      description:

        "Built-in AI chat that responds to visitors 24/7, answers questions, and qualifies leads automatically. Never miss an opportunity even when you're away from your desk.",

    },

    {

      icon: <Calendar className="w-10 h-10 text-blue-900" />,

      title: "Smart Booking System",

      description:

        "Let customers schedule appointments directly from your website. Automated reminders and calendar management save you time and reduce no-shows.",

    },

    {

      icon: <BarChart className="w-10 h-10 text-purple-900" />,

      title: "Analytics & Insights",

      description:

        "Track visitor behavior, conversion rates, and business metrics. Understand what's working and make data-driven decisions to grow your business online.",

    },

  ];

 

  return (

    <div className="w-full py-20 bg-background">

      <div className="container mx-auto px-4">

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-5xl font-bold mb-4">

            Everything your small business needs online

          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">

            Professional website building with growth tools that help you attract customers and succeed

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

    <div className="w-full py-20 bg-purple-600 text-white">

      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">

            Ready to grow your business online?

          </h2>

          <p className="text-lg md:text-xl mb-8 opacity-90">

            Join small businesses using Revi to establish their online presence, attract more customers,

            and grow with professional websites built specifically for their needs.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button

              size="lg"

              variant="secondary"

              className="gap-2 bg-white text-purple-600 hover:bg-gray-100"

              asChild

            >

              <Link href="/signin">

                Get Your Website <MoveRight className="w-4 h-4" />

              </Link>

            </Button>

            <Button

              size="lg"

              variant="outline"

              className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-purple-600"

              asChild

            >

              <Link href="/pricing">

                See Pricing <Calendar className="w-4 h-4" />

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

              Professional websites for small businesses with built-in growth tools.

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