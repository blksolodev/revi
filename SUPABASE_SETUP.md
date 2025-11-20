# Supabase Authentication Setup Guide

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Your Revi website project

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in your project details:
   - Name: revi-website (or your preferred name)
   - Database Password: Choose a secure password
   - Region: Choose closest to your users
4. Click "Create new project"

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: https://xxxxxxxxxxxxx.supabase.co)
   - **Anon/Public Key** (anon key)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the migration

This will create:
- `profiles` table for user data
- `organizations` table for business accounts
- `organization_members` table for team membership
- `ai_messages` table for AI assistant messages
- Row Level Security (RLS) policies
- Triggers for automatic profile creation

## Step 5: Configure Google OAuth (Optional)

To enable "Sign in with Google":

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Find **Google** and click to expand
3. Toggle "Enable Sign in with Google"
4. You'll need to:
   - Create a Google Cloud Project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     ```
     https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
     http://localhost:3000/auth/callback (for local development)
     ```
5. Copy the Client ID and Client Secret to Supabase

Detailed Google OAuth setup: https://supabase.com/docs/guides/auth/social-login/auth-google

## Step 6: Configure Email Authentication

Email authentication is enabled by default in Supabase.

### Email Templates (Optional Customization)

1. Go to **Authentication** → **Email Templates**
2. Customize the "Magic Link" template if desired
3. You can add your branding and custom messaging

### Email Rate Limiting

For production, consider:
- Setting up a custom SMTP provider (SendGrid, AWS SES, etc.)
- Go to **Settings** → **Auth** → **SMTP Settings**

## Step 7: Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set your Site URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Add Redirect URLs:
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```

## Step 8: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/signin

3. Test authentication:
   - **Email Sign-in**: Enter an email → Check your inbox for the 6-digit code
   - **Google Sign-in**: Click the Google button → Authorize with Google

## Step 9: Verify Database

After successful sign-in, check your Supabase database:

1. Go to **Table Editor**
2. Check the `profiles` table - you should see your user profile
3. Check **Authentication** → **Users** to see authenticated users

## Troubleshooting

### "Invalid API Key" Error
- Double-check your `.env.local` file
- Ensure you're using the **anon/public** key, not the service role key
- Restart your dev server after changing environment variables

### Email Not Receiving Code
- Check your spam folder
- Verify email is configured in Supabase Auth settings
- For production, set up custom SMTP

### Google OAuth Not Working
- Verify redirect URLs match exactly
- Check that Google OAuth is enabled in Supabase
- Ensure your Google Cloud project has the correct credentials

### Database Permissions Error
- Verify the schema.sql ran successfully
- Check that RLS policies are enabled
- Ensure your user is authenticated

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables to your hosting platform
2. Update Supabase Site URL to your production domain
3. Update Redirect URLs to include production domain
4. Consider setting up custom SMTP for email delivery
5. Enable email confirmations if desired (Auth → Settings)

## Security Best Practices

1. **Never commit `.env.local`** to version control (already in .gitignore)
2. Use different Supabase projects for development and production
3. Enable RLS on all tables (already done in schema)
4. Regularly rotate your service role key (if you use it)
5. Monitor authentication logs in Supabase dashboard

## Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
