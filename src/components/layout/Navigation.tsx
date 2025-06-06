"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Menu, LogOut, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { ModeToggle } from "@/components/theme/ModeToggle"
import { toast } from 'sonner'
import { User } from '@supabase/supabase-js'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const pathname = usePathname()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success('Signed out successfully')
      router.push('/signin')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div className="w-[200px] flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="/neurolint-logo--dark.png"
                  alt="Neurolint Logo"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-8 w-auto block dark:hidden"
                  priority
                />
                <Image
                  src="/neurolint-logo--white.png"
                  alt="Neurolint Logo"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="hidden h-8 w-auto dark:block"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
            <Link 
              href="/product" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/product' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Product
            </Link>
            <Link 
              href="/docs" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/docs' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Docs
            </Link>
            <Link 
              href="/customers" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/customers' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Customers
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/blog' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex w-[200px] justify-end items-center gap-4">
            <ModeToggle />
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/signin">
                      <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4 ml-auto">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border/40 bg-background/40 backdrop-blur-lg supports-[backdrop-filter]:bg-background/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-4"
            >
              <nav className="flex flex-col py-2">
                <Link
                  href="/product"
                  className={`text-sm font-medium transition-colors hover:text-primary w-full px-6 py-3 bg-transparent ${
                    pathname === '/product' ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Product
                </Link>
                <Link
                  href="/docs"
                  className={`text-sm font-medium transition-colors hover:text-primary w-full px-6 py-3 bg-transparent ${
                    pathname === '/docs' ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="/customers"
                  className={`text-sm font-medium transition-colors hover:text-primary w-full px-6 py-3 bg-transparent ${
                    pathname === '/customers' ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Customers
                </Link>
                <Link
                  href="/pricing"
                  className={`text-sm font-medium transition-colors hover:text-primary w-full px-6 py-3 bg-transparent ${
                    pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className={`text-sm font-medium transition-colors hover:text-primary w-full px-6 py-3 bg-transparent ${
                    pathname === '/blog' ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-border/40">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-6 py-3 border-b border-border/40">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback>
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground/80 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary w-full px-6 py-3 bg-transparent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary w-full px-6 py-3 bg-transparent text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary w-full px-6 py-3 bg-transparent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary w-full px-6 py-3 bg-transparent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 