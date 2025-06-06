import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/product" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/customers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/neurolint-logo--dark.png"
                alt="neurolint"
                width={150}
                height={24}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src="/neurolint-logo--white.png"
                alt="neurolint"
                width="0"
                height="0"
                sizes="100vw"
                className="h-6 w-auto hidden dark:block"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} neurolint. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 