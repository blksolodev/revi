-- Allow service role to insert stripe customer data
-- This is needed for the checkout API to create customer records
CREATE POLICY "Service role can insert stripe customers"
  ON stripe_customers FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role to insert subscriptions
-- This is needed for webhooks to create subscription records
CREATE POLICY "Service role can insert subscriptions"
  ON subscriptions FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role to update subscriptions
-- This is needed for webhooks to update subscription status
CREATE POLICY "Service role can update subscriptions"
  ON subscriptions FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow service role to insert payments
-- This is needed for webhooks to log payments
CREATE POLICY "Service role can insert payments"
  ON payments FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Optional: Allow authenticated users to insert their own customer records
-- This provides a fallback if using client-side Supabase
CREATE POLICY "Users can insert their own stripe customer data"
  ON stripe_customers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
