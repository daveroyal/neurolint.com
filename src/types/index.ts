export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription: 'free' | 'pro' | 'enterprise'
  usage_count: number
  created_at: string
}

export interface AnalysisHistory {
  id: string
  user_id: string
  code: string
  language: string
  results: AnalysisResult
  created_at: string
}

export interface AnalysisResult {
  security: Issue[]
  performance: Issue[]
  quality: Issue[]
  score: number
}

export interface Issue {
  line: number
  message: string
  severity: 'low' | 'medium' | 'high'
}

export interface SubscriptionTier {
  name: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: 'default' | 'outline'
} 