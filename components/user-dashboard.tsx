'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  MessageSquare,
  Building2,
  Mail,
  User,
  Calendar,
  Settings,
  Activity,
  TrendingUp,
  FileText,
  ExternalLink
} from 'lucide-react'

interface Profile {
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
}

interface Organization {
  id: string
  name: string
  slug: string | null
}

interface UserDashboardProps {
  user: {
    id: string
    email: string
  }
  profile: Profile | null
  aiMessages: AIMessage[]
  organizations: Organization[]
  messageCount: number
  orgCount: number
}

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
        {value}
      </div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
)

export function UserDashboard({
  user,
  profile,
  aiMessages,
  organizations,
  messageCount,
  orgCount
}: UserDashboardProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [firstName, setFirstName] = useState(profile?.first_name || '')
  const [lastName, setLastName] = useState(profile?.last_name || '')
  const [businessName, setBusinessName] = useState(profile?.business_name || '')

  const handleSaveProfile = async () => {
    // TODO: Implement profile update
    setIsEditingProfile(false)
  }

  const quickActions = [
    {
      title: 'Send Message',
      description: 'Chat with our AI assistant',
      icon: <MessageSquare className="h-5 w-5" />,
      href: '/chat',
      color: 'bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent'
    },
    {
      title: 'Create Organization',
      description: 'Set up your business account',
      icon: <Building2 className="h-5 w-5" />,
      href: '/organizations/new',
      color: 'text-green-600'
    },
    {
      title: 'Schedule Call',
      description: 'Book a consultation with us',
      icon: <Calendar className="h-5 w-5" />,
      href: '/signin',
      color: 'text-purple-600'
    },
    {
      title: 'Documentation',
      description: 'Learn how to use Revi',
      icon: <FileText className="h-5 w-5" />,
      href: '/docs',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}!
            </h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your account</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Activity className="h-3 w-3" />
            Active
          </Badge>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="AI Messages"
          value={messageCount}
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          description="Total inquiries sent"
          valueClassName="bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent"
        />
        <MetricCard
          title="Organizations"
          value={orgCount}
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          description="Business accounts"
          valueClassName="text-green-600"
        />
        <MetricCard
          title="Account Age"
          value={Math.floor((new Date().getTime() - new Date(profile?.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24))}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          description="Days as member"
          valueClassName="text-purple-600"
        />
        <MetricCard
          title="Profile Status"
          value={profile?.first_name && profile?.last_name ? 100 : 50}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Profile completion"
          valueClassName="text-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={action.color}>{action.icon}</div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-base">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </div>
            <Button
              variant={isEditingProfile ? "default" : "outline"}
              size="sm"
              onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
            >
              {isEditingProfile ? "Save" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(value) => setFirstName(value)}
                  disabled={!isEditingProfile}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(value) => setLastName(value)}
                  disabled={!isEditingProfile}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name (Optional)</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(value) => setBusinessName(value)}
                disabled={!isEditingProfile}
                placeholder="Your Company Inc."
              />
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>User ID:</strong> {user.id}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Member since:</strong> {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent" />
              Recent AI Messages
            </CardTitle>
            <CardDescription>Your latest interactions with our AI</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              <div className="divide-y divide-border">
                {aiMessages.length === 0 ? (
                  <p className="p-4 text-center text-muted-foreground">No messages yet</p>
                ) : (
                  aiMessages.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent" />
                          <span className="text-sm font-medium">AI Inquiry</span>
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
      {organizations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              Your Organizations
            </CardTitle>
            <CardDescription>Business accounts you're associated with</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {organizations.map((org) => (
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
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
