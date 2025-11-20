"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

function PaymentSuccessContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Celebrate with confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    setLoading(false);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-full p-3">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for choosing Revi. Your subscription has been activated.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">What's Next?</h3>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>• Check your email for the confirmation</li>
            <li>• Our team will contact you within 24 hours</li>
            <li>• We'll schedule your project kickoff call</li>
            <li>• Start building your amazing website!</li>
          </ul>
        </div>

        {sessionId && (
          <p className="text-xs text-muted-foreground">
            Session ID: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
