import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { AdminDashboard } from '@/components/admin-dashboard'

const ADMIN_EMAIL = 'kennyadenusi@icloud.com'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin')
  }

  // Check if user is admin
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect('/')
  }

  // Fetch all users
  const { data: users, count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Fetch all AI messages
  const { data: aiMessages, count: messageCount } = await supabase
    .from('ai_messages')
    .select('*, profiles(first_name, last_name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Fetch all organizations
  const { data: organizations, count: orgCount } = await supabase
    .from('organizations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Revi Admin</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Kenny</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <a href="/">Back to Site</a>
            </Button>
            <form action={signOut}>
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>

      <AdminDashboard
        users={users || []}
        aiMessages={aiMessages || []}
        organizations={organizations || []}
        totalUserCount={userCount || 0}
        totalMessageCount={messageCount || 0}
        totalOrgCount={orgCount || 0}
      />
    </div>
  )
}
