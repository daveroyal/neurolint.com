import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

interface AuthFormProps {
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  submitText: string
  loading?: boolean
  error?: string | null
  showGitHub?: boolean
  onGitHubClick?: () => void
  footer?: ReactNode
}

export function AuthForm({
  children,
  onSubmit,
  submitText,
  loading,
  error,
  showGitHub = false,
  onGitHubClick,
  footer
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full">
      <div className="space-y-4">
        {children}
      </div>
      {error && (
        <p className="text-sm text-destructive max-w-md">{error}</p>
      )}
      <Button 
        type="submit" 
        className="w-full h-9 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" 
        disabled={loading}
      >
        {loading ? 'Loading...' : submitText}
      </Button>
      {showGitHub && onGitHubClick && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/90 dark:bg-card/60 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-9"
            onClick={onGitHubClick}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </>
      )}
      {footer && (
        <div className="max-w-md mx-auto">
          {footer}
        </div>
      )}
    </form>
  )
} 