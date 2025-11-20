"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-muted rounded-full p-3">
            <XCircle className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            If you encountered any issues or have questions about our pricing,
            feel free to contact our support team. We're here to help!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800"
          >
            <Link href="/pricing">Return to Pricing</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
