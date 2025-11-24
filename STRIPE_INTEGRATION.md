# Stripe + Supabase Integration Guide

## 🏗️ Architecture Overview

```
┌─────────────────┐
│   Next.js App   │
└────────┬────────┘
         │
    ┌────┴─────────────────────────────┐
    │                                  │
    ▼                                  ▼
┌─────────────┐              ┌──────────────────┐
│   Supabase  │◄─────────────┤  Stripe Webhook  │
│  Database   │              │     Handler      │
└─────────────┘              └──────────────────┘
    ▲                                  ▲
    │                                  │
    │                         ┌────────┴────────┐
    │                         │  Stripe Events  │
    └─────────────────────────┤  (Payments)     │
                             └─────────────────┘
```

## 📊 Database Tables

### `stripe_customers`
Links Supabase users to Stripe customers
- `user_id` → References auth.users
- `stripe_customer_id` → Stripe customer ID

### `subscriptions`
Tracks subscription details
- `user_id` → Who owns the subscription
- `stripe_subscription_id` → Stripe subscription ID
- `plan_id` → starter, professional, enterprise
- `billing_cycle` → monthly, upfront
- `status` → active, past_due, canceled, etc.
- `current_period_start/end` → Billing period

### `payments`
Payment transaction log
- `user_id` → Who made the payment
- `stripe_payment_intent_id` → Stripe payment ID
- `amount` → Amount in cents
- `status` → succeeded, failed

## 🔄 Payment Flow

1. **User initiates checkout**
   ```typescript
   POST /api/checkout
   { planId: 'professional', billingCycle: 'monthly' }
   ```

2. **API creates Stripe session**
   - Creates/retrieves customer in Supabase
   - Creates checkout session in Stripe
   - Returns session URL

3. **User completes payment**
   - Redirected to Stripe checkout
   - Enters payment details
   - Completes payment

4. **Stripe sends webhooks**
   - `checkout.session.completed` → Create subscription & payment
   - `customer.subscription.updated` → Update subscription status
   - `invoice.payment_succeeded` → Log recurring payment
   - `invoice.payment_failed` → Mark subscription as past_due

5. **Data saved to Supabase**
   - Subscription record created/updated
   - Payment logged
   - User can access premium features

## 🔧 Setup Instructions

### 1. Environment Variables

```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Run Database Migrations

```sql
-- Run these in Supabase SQL Editor
supabase/migrations/20240101000000_create_stripe_tables.sql
supabase/migrations/20240102000000_add_api_insert_policies.sql
```

### 3. Configure Stripe Webhook

URL: `https://yourdomain.com/api/webhooks/stripe`

Events to listen for:
- ✅ checkout.session.completed
- ✅ customer.subscription.updated
- ✅ customer.subscription.deleted
- ✅ invoice.payment_succeeded
- ✅ invoice.payment_failed

## 🧪 Testing

### Local Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test checkout flow
stripe trigger checkout.session.completed
```

### Test Credit Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

## 💻 Usage in Your App

```typescript
import { getUserSubscription, hasSubscriptionAccess } from '@/lib/subscriptions';

// Check if user has a subscription
const subscription = await getUserSubscription();

// Check if user has access to specific features
const hasProAccess = await hasSubscriptionAccess('professional');

// Protect a route
if (!subscription) {
  redirect('/pricing');
}
```

See [lib/examples/subscription-usage.tsx](lib/examples/subscription-usage.tsx) for more examples.

## 🚨 Common Issues

### "Failed to create checkout session"
- ❌ Missing `STRIPE_SECRET_KEY` in `.env.local`
- ✅ Add your secret key and restart server

### Webhook signature verification failed
- ❌ Wrong `STRIPE_WEBHOOK_SECRET`
- ✅ Copy the signing secret from Stripe Dashboard → Webhooks

### RLS policy error when inserting
- ❌ Missing service role policies
- ✅ Run the `20240102000000_add_api_insert_policies.sql` migration

### Customer not linked to user
- ❌ User not authenticated during checkout
- ✅ Ensure user is logged in before initiating checkout

## 📚 Useful Links

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
- [Stripe API Keys](https://dashboard.stripe.com/apikeys)
- [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
- [Supabase Dashboard](https://app.supabase.com)

## 🔐 Security Checklist

- [ ] Use TEST keys in development
- [ ] Never commit `.env.local` to git
- [ ] Verify webhook signatures
- [ ] Enable RLS on all tables
- [ ] Use HTTPS for webhook endpoints in production
- [ ] Rotate keys if compromised
