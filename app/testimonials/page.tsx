"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    text: "Revi transformed our website overnight. The AI agent handles customer inquiries 24/7, and we've seen a 40% increase in qualified leads. Best investment we've made!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Mitchell",
    role: "CEO, TechStart Solutions",
  },
  {
    text: "The AI appointment booking is incredible. It automatically schedules meetings, sends reminders, and integrates perfectly with our calendar. We've saved 15 hours per week.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "James Chen",
    role: "Operations Director, MedCare Clinic",
  },
  {
    text: "As a small business owner, Revi gave me enterprise-level AI capabilities at an affordable price. The customer support is outstanding and setup was painless.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Rodriguez",
    role: "Founder, Artisan Bakery Co.",
  },
  {
    text: "The real-time optimization suggestions helped us improve our conversion rate by 35%. Revi's AI continuously learns and adapts to our customers' behavior.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Michael Thompson",
    role: "Marketing Manager, E-Shop Plus",
  },
  {
    text: "We deployed Revi across all our websites and the results are amazing. Response times dropped from hours to seconds, and customer satisfaction scores increased significantly.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Jessica Park",
    role: "VP of Customer Success, CloudBase",
  },
  {
    text: "The analytics dashboard gives us insights we never had before. We can see exactly how the AI is performing and make data-driven decisions to improve our website.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Amanda Foster",
    role: "Head of Digital, Retail Innovations",
  },
  {
    text: "Revi's AI understands context and provides personalized responses. Our customers think they're talking to a real person. It's incredible how natural the conversations are.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "David Kumar",
    role: "CTO, FinanceHub",
  },
  {
    text: "Integration was seamless and the team was supportive every step of the way. Within a week, we were seeing measurable improvements in customer engagement.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Lisa Wang",
    role: "Director of IT, Global Services Inc",
  },
  {
    text: "The ROI has been fantastic. We've reduced customer service costs while improving response quality. Revi pays for itself many times over.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Robert Martinez",
    role: "CFO, Growth Ventures",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>

      <section className="bg-background my-10 relative">
        <div className="container z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <div className="flex justify-center">
              <div className="border-2 py-1 px-4 rounded-lg bg-purple-600 text-white border-transparent">Testimonials</div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
              Loved by businesses worldwide
            </h2>
            <p className="text-center mt-5 opacity-75">
              See how Revi is helping businesses transform their websites and boost customer engagement with AI.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto bg-purple-600 text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Join thousands of happy customers</h3>
          <p className="mb-6 opacity-90">
            Start your free trial today and see why businesses choose Revi for their AI needs.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
            <Link href="/pricing">
              Get Started Free
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
