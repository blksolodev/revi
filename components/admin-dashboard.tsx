'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts'
import { Users, MessageSquare, TrendingUp, Calendar, Clock, Building2 } from 'lucide-react'

// Helper for currency formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

interface User {
  id: string
  first_name: string | null
  last_name: string | null
  business_name: string | null
  created_at: string
}

interface AIMessage {
  id: string
  message: string
  created_at: string
  profiles: {
    first_name: string | null
    last_name: string | null
  } | null
}

interface Organization {
  id: string
  name: string
  slug: string | null
  created_at: string
}

interface AdminDashboardProps {
  users: User[]
  aiMessages: AIMessage[]
  organizations: Organization[]
  totalUserCount: number
  totalMessageCount: number
  totalOrgCount: number
}

type TimePeriod = '24h' | '3d' | '7d' | '2w' | '1y' | '5y' | 'all'

interface TimePeriodOption {
  value: TimePeriod
  label: string
  days: number | null
}

const timePeriodOptions: TimePeriodOption[] = [
  { value: '24h', label: 'Past 24 Hours', days: 1 },
  { value: '3d', label: 'Past 3 Days', days: 3 },
  { value: '7d', label: 'Past 7 Days', days: 7 },
  { value: '2w', label: 'Past 2 Weeks', days: 14 },
  { value: '1y', label: 'Past Year', days: 365 },
  { value: '5y', label: 'Last 5 Years', days: 1825 },
  { value: 'all', label: 'All Time', days: null },
]

interface MetricCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description?: string
  valueClassName?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, description, valueClassName }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-3xl font-bold ${valueClassName}`}>
        {value.toLocaleString()}
      </div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
)

export function AdminDashboard({
  users,
  aiMessages,
  organizations,
  totalUserCount,
  totalMessageCount,
  totalOrgCount,
}: AdminDashboardProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all')

  const filterDataByTimePeriod = <T extends { created_at: string }>(data: T[]): T[] => {
    if (timePeriod === 'all') return data

    const option = timePeriodOptions.find(o => o.value === timePeriod)
    if (!option || option.days === null) return data

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - option.days)

    return data.filter(item => new Date(item.created_at) >= cutoffDate)
  }

  const filteredUsers = useMemo(() => filterDataByTimePeriod(users), [users, timePeriod])
  const filteredMessages = useMemo(() => filterDataByTimePeriod(aiMessages), [aiMessages, timePeriod])
  const filteredOrgs = useMemo(() => filterDataByTimePeriod(organizations), [organizations, timePeriod])

  const userCount = filteredUsers.length
  const messageCount = filteredMessages.length
  const orgCount = filteredOrgs.length
  const conversionRate = userCount > 0 ? (orgCount / userCount) * 100 : 0

  // Generate chart data for user growth
  const userChartData = useMemo(() => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )

    if (sortedUsers.length === 0) return []

    // Group by date
    const groupedByDate: { [key: string]: number } = {}
    sortedUsers.forEach(user => {
      const date = new Date(user.created_at).toLocaleDateString()
      groupedByDate[date] = (groupedByDate[date] || 0) + 1
    })

    let cumulative = 0
    return Object.entries(groupedByDate).map(([date, count]) => {
      cumulative += count
      return { date, count, cumulative }
    })
  }, [filteredUsers])

  // Generate chart data for messages
  const messageChartData = useMemo(() => {
    const sortedMessages = [...filteredMessages].sort((a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )

    if (sortedMessages.length === 0) return []

    // Group by date
    const groupedByDate: { [key: string]: number } = {}
    sortedMessages.forEach(msg => {
      const date = new Date(msg.created_at).toLocaleDateString()
      groupedByDate[date] = (groupedByDate[date] || 0) + 1
    })

    return Object.entries(groupedByDate).map(([date, count]) => ({
      date,
      count,
    }))
  }, [filteredMessages])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor your platform's performance and growth</p>
          </div>
          <Badge className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live
          </Badge>
        </div>

        {/* Time Period Selector */}
        <div className="flex flex-wrap gap-2">
          {timePeriodOptions.map((option) => (
            <Button
              key={option.value}
              variant={timePeriod === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimePeriod(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={userCount}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description={timePeriod === 'all' ? 'All registered users' : `Users in selected period`}
          valueClassName="bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent"
        />
        <MetricCard
          title="AI Messages"
          value={messageCount}
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          description={timePeriod === 'all' ? 'Total inquiries' : `Inquiries in selected period`}
          valueClassName="text-purple-600"
        />
        <MetricCard
          title="Organizations"
          value={orgCount}
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          description={timePeriod === 'all' ? 'Business accounts' : `Businesses in selected period`}
          valueClassName="text-green-600"
        />
        <MetricCard
          title="Conversion Rate"
          value={parseFloat(conversionRate.toFixed(1))}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Users to businesses"
          valueClassName="text-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent" />
              User Growth
            </CardTitle>
            <CardDescription>Cumulative user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgb(30, 58, 138)" />
                      <stop offset="100%" stopColor="rgb(88, 28, 135)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="url(#colorGradient)"
                    strokeWidth={2}
                    name="Total Users"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Message Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Message Activity
            </CardTitle>
            <CardDescription>AI messages received per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="rgb(147, 51, 234)"
                    name="Messages"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest sign-ups to your platform</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y divide-border">
                {filteredUsers.length === 0 ? (
                  <p className="p-4 text-center text-muted-foreground">No users in this period</p>
                ) : (
                  filteredUsers.slice(0, 10).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                            {user.first_name?.[0] || user.business_name?.[0] || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {user.first_name} {user.last_name || user.business_name || 'Anonymous'}
                          </p>
                          {user.business_name && user.first_name && (
                            <p className="text-sm text-muted-foreground">{user.business_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent AI Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Inquiries</CardTitle>
            <CardDescription>Messages from the AI assistant</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y divide-border">
                {filteredMessages.length === 0 ? (
                  <p className="p-4 text-center text-muted-foreground">No messages in this period</p>
                ) : (
                  filteredMessages.slice(0, 10).map((msg) => (
                    <div key={msg.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">
                            {msg.profiles?.first_name || 'Anonymous'} {msg.profiles?.last_name || ''}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6 line-clamp-2">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Organizations */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
          <CardDescription>Business accounts created on your platform</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px]">
            <div className="divide-y divide-border">
              {filteredOrgs.length === 0 ? (
                <p className="p-4 text-center text-muted-foreground">No organizations in this period</p>
              ) : (
                filteredOrgs.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600 dark:text-green-300">{org.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        {org.slug && (
                          <p className="text-sm text-muted-foreground">@{org.slug}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(org.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
