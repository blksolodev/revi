import { createClient } from '@/lib/supabase/server';

export interface UserSubscription {
  id: string;
  plan_id: 'starter' | 'professional' | 'enterprise';
  billing_cycle: 'monthly' | 'upfront';
  status: 'active' | 'past_due' | 'canceled' | 'incomplete' | 'trialing';
  current_period_end: string;
  cancel_at_period_end: boolean;
}

/**
 * Get the current user's active subscription
 * @returns The active subscription or null if none exists
 */
export async function getUserSubscription(): Promise<UserSubscription | null> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing', 'past_due'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;

  return data as UserSubscription;
}

/**
 * Check if user has an active subscription to a specific plan or higher
 * @param requiredPlan The minimum plan level required
 * @returns true if user has required access
 */
export async function hasSubscriptionAccess(
  requiredPlan: 'starter' | 'professional' | 'enterprise'
): Promise<boolean> {
  const subscription = await getUserSubscription();
  if (!subscription) return false;

  const planHierarchy = ['starter', 'professional', 'enterprise'];
  const userPlanLevel = planHierarchy.indexOf(subscription.plan_id);
  const requiredPlanLevel = planHierarchy.indexOf(requiredPlan);

  return userPlanLevel >= requiredPlanLevel && subscription.status === 'active';
}

/**
 * Get all payment history for the current user
 */
export async function getUserPayments() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return data || [];
}

/**
 * Check if user's subscription is expiring soon (within 7 days)
 */
export async function isSubscriptionExpiringSoon(): Promise<boolean> {
  const subscription = await getUserSubscription();
  if (!subscription || subscription.status !== 'active') return false;

  const expiryDate = new Date(subscription.current_period_end);
  const daysUntilExpiry = Math.floor(
    (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
}
