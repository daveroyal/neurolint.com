'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { signUp, signInWithGitHub } from '@/lib/auth'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signUp(email, password, name)
      router.push('/signin?message=Check your email to confirm your account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubSignUp = async () => {
    try {
      await signInWithGitHub(`${window.location.origin}/api/auth/callback`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to start using neurolint"
    >
      <AuthCard>
        <AuthForm
          onSubmit={handleSignUp}
          submitText="Create Account"
          loading={loading}
          error={error}
          showGitHub
          onGitHubClick={handleGitHubSignUp}
          footer={
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-9"
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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