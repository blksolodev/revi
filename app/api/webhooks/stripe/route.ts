import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';

async function notifyCheckout(session: Stripe.Checkout.Session, subscription?: Stripe.Subscription) {
  const webhookUrl = process.env.NOTIFY_CHECKOUT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const currency = session.currency || 'usd';
    const amount = session.amount_total
      ? (session.amount_total / 100).toFixed(2)
      : '0.00';

    const lines = [
      'New checkout completed:',
      `Plan: ${session.metadata?.plan_id || 'unknown'} (${session.metadata?.billing_cycle || 'unknown'})`,
      `Amount: ${currency.toUpperCase()} ${amount}`,
      `Email: ${session.customer_details?.email || 'unknown'}`,
      `Subscription: ${subscription?.id || (session.subscription as string) || 'n/a'}`,
      `Customer: ${(session.customer as string) || 'n/a'}`,
      `Session: ${session.id}`,
    ];

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') }),
    });
  } catch (err) {
    console.error('Checkout notification failed:', err);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.subscription) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          ) as Stripe.Subscription;

          // Try to find user by ID from metadata, or fallback to email matching
          let userId = session.metadata?.user_id;

          if (!userId && session.customer_details?.email) {
            // Match by email if no user_id in metadata (for Payment Links)
            const { data: authUser, error } = await supabase.auth.admin.listUsers();

            if (authUser?.users) {
              const matchedUser = authUser.users.find(
                u => u.email === session.customer_details?.email
              );
              userId = matchedUser?.id;
            }

            // If still no match, log error
            if (!userId) {
              console.error('Could not match Stripe customer to Supabase user:', {
                email: session.customer_details.email,
                stripeCustomerId: session.customer as string,
              });
            }
          }

          // Extract plan_id from subscription metadata or product name
          const planId = session.metadata?.plan_id ||
                        subscription.items.data[0]?.price.product?.toString() ||
                        'professional'; // Default to professional for now

          // Save subscription to database
          const sub = subscription as any;
          await supabase.from('subscriptions').insert({
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscription.id,
            plan_id: planId,
            billing_cycle: session.metadata?.billing_cycle || 'monthly',
            status: subscription.status,
            current_period_start: new Date((sub.current_period_start || 0) * 1000).toISOString(),
            current_period_end: new Date((sub.current_period_end || 0) * 1000).toISOString(),
          });

          // Log payment
          await supabase.from('payments').insert({
            user_id: userId,
            stripe_payment_intent_id: session.payment_intent as string,
            amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'succeeded',
          });

          // Notify internal channel about the checkout (non-blocking)
          notifyCheckout(session, subscription);
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date((subscription.current_period_start || 0) * 1000).toISOString(),
            current_period_end: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id);

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any;

        if (invoice.subscription && invoice.customer) {
          // Log recurring payment
          await supabase.from('payments').insert({
            stripe_payment_intent_id: invoice.payment_intent as string,
            stripe_customer_id: invoice.customer as string,
            stripe_subscription_id: invoice.subscription as string,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'succeeded',
          });
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;

        // Update subscription status
        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
