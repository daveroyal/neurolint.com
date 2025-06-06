import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center pt-38 pb-28 overflow-hidden w-full bg-[#3B82F6]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto text-center mb-12 px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{title}</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl mx-auto">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </section>
    </div>
  )
} 