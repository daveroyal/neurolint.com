'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { updatePassword } from '@/lib/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await updatePassword(password)
      router.push('/signin?message=Your password has been reset successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Enter your new password below"
    >
      <AuthCard>
        <AuthForm
          onSubmit={handleResetPassword}
          submitText="Reset Password"
          loading={loading}
          error={error}
        >
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-9"
            />
          </div>
        </AuthForm>
      </AuthCard>
    </AuthLayout>
  )
} 