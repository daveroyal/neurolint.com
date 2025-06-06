'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { resetPassword } from '@/lib/auth'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await resetPassword(email, `${window.location.origin}/reset-password`)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <AuthCard>
        {success ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check your spam folder.
            </p>
            <Button
              variant="outline"
              className="w-full h-9"
              onClick={() => router.push('/signin')}
            >
              Return to sign in
            </Button>
          </div>
        ) : (
          <AuthForm
            onSubmit={handleResetPassword}
            submitText="Send reset link"
            loading={loading}
            error={error}
            footer={
              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link 
                  href="/signin" 
                  className="font-medium text-primary hover:text-primary/90 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            }
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9"
              />
            </div>
          </AuthForm>
        )}
      </AuthCard>
    </AuthLayout>
  )
} 