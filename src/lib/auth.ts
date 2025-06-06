import { createClient } from '@/lib/supabase/client'

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
}

export async function signInWithGitHub(redirectTo: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  })
  if (error) throw error
}

export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient()
  
  // Check if email exists
  const { data: exists, error: checkError } = await supabase
    .rpc('check_email_exists', { email_to_check: email })

  if (checkError) throw checkError
  if (exists) throw new Error('An account with this email already exists')

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${window.location.origin}/api/auth/callback`,
    },
  })
  if (error) throw error
}

export async function resetPassword(email: string, redirectTo: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })
  if (error) throw error
}

export async function updatePassword(password: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({
    password,
  })
  if (error) throw error
} 