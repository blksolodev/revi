import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { UserDashboard } from '@/components/user-dashboard'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch user's AI messages
  const { data: aiMessages, count: messageCount } = await supabase
    .from('ai_messages')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch user's organizations
  const { data: organizationMembers } = await supabase
    .from('organization_members')
    .select('organizations(*)')
    .eq('user_id', user.id)

  const organizations = organizationMembers?.map((m: any) => m.organizations).filter(Boolean) || []
  const orgCount = organizations.length

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Revi Dashboard</h1>
            <p className="text-sm text-muted-foreground">Your personal workspace</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Back to Site</Link>
            </Button>
            <form action={signOut}>
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>

      <UserDashboard
        user={{
          id: user.id,
          email: user.email || ''
        }}
        profile={profile}
        aiMessages={aiMessages || []}
        organizations={organizations as any}
        messageCount={messageCount || 0}
        orgCount={orgCount}
      />
    </div>
  )
}
