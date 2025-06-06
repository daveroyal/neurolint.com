'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Code2, 
  Settings, 
  History, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Lightbulb,
  FolderOpen,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  {
    title: 'Analysis',
    href: '/dashboard',
    icon: Code2,
    description: 'View code analysis'
  },
  {
    title: 'Suggestions',
    href: '/dashboard/suggestions',
    icon: Lightbulb,
    description: 'Code improvement suggestions'
  },
  {
    title: 'Metrics',
    href: '/dashboard/metrics',
    icon: BarChart3,
    description: 'Code quality metrics'
  },
  {
    title: 'History',
    href: '/dashboard/history',
    icon: History,
    description: 'View past analyses'
  },
  {
    title: 'Workspaces',
    href: '/dashboard/workspaces',
    icon: FolderOpen,
    description: 'Manage workspaces'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'Configure preferences'
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/signin')
        return
      }
      setLoading(false)
    }

    checkAuth()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-background text-foreground mt-16">
      {/* Mobile header with menu button */}
      <div className="lg:hidden flex items-center h-12 px-4 border-b border-border bg-muted/50 backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <div className="flex flex-1">
        {/* Sidebar overlay on mobile, static on desktop */}
        <div
          className={cn(
            "fixed left-0 z-40 flex flex-col bg-background/95 backdrop-blur-md border-r border-border transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
            "top-[64px]",
            sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
            isCollapsed && "lg:w-20"
          )}
        >
          <div className="flex-1 flex flex-col py-4 px-3 gap-2 min-h-[calc(100vh-64px)]">
            {/* Explorer Header */}
            <div className="px-3 mb-2 flex items-center justify-between">
              {!isCollapsed ? (
                <>
                  <h2 className="text-xs font-semibold text-muted-foreground tracking-wider">EXPLORER</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors hidden lg:flex"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors lg:hidden"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors hidden lg:flex"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Navigation Items */}
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg transition-all duration-200",
                      "px-3 py-2.5",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      isCollapsed && "justify-center px-2"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={cn(
                      "transition-transform duration-200",
                      isCollapsed ? "h-5 w-5" : "h-5 w-5",
                      isActive && "text-primary"
                    )} />
                    {!isCollapsed && (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="flex-1" />
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden top-[64px] h-[calc(100vh-64px)] transition-opacity duration-300" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-background">
          <div className="h-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 