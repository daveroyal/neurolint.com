'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/auth/AuthForm'
import { signInWithPassword, signInWithGitHub } from '@/lib/auth'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const messageParam = searchParams.get('message')
    if (messageParam) {
      setMessage(decodeURIComponent(messageParam))
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signInWithPassword(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub(`${window.location.origin}/auth/callback`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="w-full space-y-8">
      {message && (
        <Alert className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {message}
          </AlertDescription>
        </Alert>
      )}
      <AuthCard>
        <AuthForm
          onSubmit={handleSignIn}
          submitText="Sign In"
          loading={loading}
          error={error}
          showGitHub
          onGitHubClick={handleGitHubSignIn}
          footer={
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium text-primary hover:text-primary/90 transition-colors"
              >
                Sign up
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
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:text-primary/90 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </AuthForm>
      </AuthCard>
    </div>
  )
}

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <Suspense fallback={
        <div className="w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-lg text-muted-foreground">
              Loading...
            </p>
          </div>
        </div>
      }>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  )
} 