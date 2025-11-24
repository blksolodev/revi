// EXAMPLE: How to use subscription utilities in your app
// This file is for reference only - adapt these patterns to your needs

import { getUserSubscription, hasSubscriptionAccess, getUserPayments } from '@/lib/subscriptions';
import { redirect } from 'next/navigation';

// Example 1: Protect a route that requires a subscription
export async function ProtectedPage() {
  const subscription = await getUserSubscription();

  if (!subscription) {
    redirect('/pricing'); // Redirect to pricing if no subscription
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Current Plan: {subscription.plan_id}</p>
      <p>Status: {subscription.status}</p>
    </div>
  );
}

// Example 2: Require a specific plan level
export async function EnterprisePage() {
  const hasAccess = await hasSubscriptionAccess('enterprise');

  if (!hasAccess) {
    redirect('/pricing?upgrade=enterprise');
  }

  return <div>Enterprise Features Here</div>;
}

// Example 3: Display subscription info in a dashboard
export async function SubscriptionDashboard() {
  const subscription = await getUserSubscription();
  const payments = await getUserPayments();

  if (!subscription) {
    return <div>No active subscription. <a href="/pricing">Subscribe now</a></div>;
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Current Subscription</h2>
        <div className="space-y-2">
          <p><strong>Plan:</strong> {subscription.plan_id}</p>
          <p><strong>Billing:</strong> {subscription.billing_cycle}</p>
          <p><strong>Status:</strong> {subscription.status}</p>
          <p><strong>Renews on:</strong> {new Date(subscription.current_period_end).toLocaleDateString()}</p>
          {subscription.cancel_at_period_end && (
            <p className="text-red-600">Will cancel at period end</p>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Payment History</h2>
        <div className="space-y-2">
          {payments.map((payment) => (
            <div key={payment.id} className="flex justify-between">
              <span>{new Date(payment.created_at).toLocaleDateString()}</span>
              <span>${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}</span>
              <span className={payment.status === 'succeeded' ? 'text-green-600' : 'text-red-600'}>
                {payment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Example 4: Conditional feature rendering
export async function FeatureWithGating() {
  const hasProAccess = await hasSubscriptionAccess('professional');

  return (
    <div>
      <h2>Basic Feature (Available to all)</h2>
      <p>This is visible to everyone.</p>

      {hasProAccess ? (
        <>
          <h2>Pro Feature</h2>
          <p>This is only visible to Professional and Enterprise users.</p>
        </>
      ) : (
        <div className="border-2 border-dashed p-4">
          <p>Upgrade to Professional to unlock this feature</p>
          <a href="/pricing" className="text-blue-600 underline">
            View Plans
          </a>
        </div>
      )}
    </div>
  );
}

// Example 5: Middleware to protect API routes
export async function protectApiRoute() {
  const subscription = await getUserSubscription();

  if (!subscription) {
    return Response.json(
      { error: 'Subscription required' },
      { status: 403 }
    );
  }

  // Continue with your API logic
  return Response.json({ success: true });
}
