'use client'

import { Component } from '@/components/ui/sign-in-card-2'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ADMIN_EMAIL = 'kennyadenusi@icloud.com'

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleAdminLogin = async (email: string, password: string) => {
    setError('')

    // Check if email matches admin email
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('Unauthorized: Admin access only')
      alert('Unauthorized: This is an admin-only area')
      return
    }

    // Check if password matches
    if (password !== 'blksolodev') {
      setError('Invalid password')
      alert('Authentication failed: Invalid password')
      return
    }

    // Authenticate with Supabase
    const { signInWithPassword } = await import('@/app/actions/auth')
    const result = await signInWithPassword(email, password)

    if (result?.error) {
      setError(result.error)
      alert('Authentication failed: ' + result.error)
    } else {
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    }
  }

  return (
    <div>
      <Component onSubmit={handleAdminLogin} />
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}
