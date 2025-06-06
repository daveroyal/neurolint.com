import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface AuthCardProps {
  children: ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-xl mx-auto border-border/40 bg-card/90 dark:bg-card/60 backdrop-blur-sm shadow-lg">
      <CardContent className="pt-6 px-6 sm:px-8">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </CardContent>
    </Card>
  )
} 