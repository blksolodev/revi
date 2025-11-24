import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { planId, billingCycle } = await request.json();

    // Define your pricing
    const pricing = {
      starter: {
        setup: billingCycle === 'upfront' ? 134910 : 149900, // $1,349.10 vs $1,499 (in cents)
        monthly: billingCycle === 'upfront' ? 5292 : 4900, // $52.92 vs $49 annual prepay
      },
      professional: {
        setup: billingCycle === 'upfront' ? 404910 : 449900,
        monthly: billingCycle === 'upfront' ? 13392 : 14900,
      },
      enterprise: {
        setup: billingCycle === 'upfront' ? 697410 : 774900,
        monthly: billingCycle === 'upfront' ? 26892 : 29900,
      },
    };

    const plan = pricing[planId as keyof typeof pricing];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Create or retrieve customer
    let customerId: string | undefined;

    if (user) {
      // Check if customer already exists in Supabase
      const { data: existingCustomer } = await supabase
        .from('stripe_customers')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();

      if (existingCustomer?.stripe_customer_id) {
        customerId = existingCustomer.stripe_customer_id;
      } else {
        // Create new Stripe customer tied to the Supabase user
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            supabase_user_id: user.id,
          },
        });
        customerId = customer.id;

        // Save to Supabase (RLS must allow this)
        await supabase.from('stripe_customers').insert({
          user_id: user.id,
          stripe_customer_id: customerId,
        });
      }
    }

    // Create line items
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan - Setup Fee`,
            description: 'One-time setup and development fee',
          },
          unit_amount: plan.setup,
        },
        quantity: 1,
      },
    ];

    // Add subscription item for monthly billing
    if (billingCycle === 'monthly') {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan - Monthly Maintenance`,
            description: 'Monthly maintenance and support',
          },
          unit_amount: plan.monthly,
          recurring: {
            interval: 'month',
          },
        } as any,
        quantity: 1,
      });
    } else {
      // Annual prepayment
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan - Annual Maintenance`,
            description: 'Annual maintenance and support (10% savings)',
          },
          unit_amount: plan.monthly * 12,
          recurring: {
            interval: 'year',
          },
        } as any,
        quantity: 1,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      ...(customerId ? { customer: customerId } : {}),
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      metadata: {
        ...(user ? { user_id: user.id } : {}),
        plan_id: planId,
        billing_cycle: billingCycle,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
