import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neurolint - AI Code Review Assistant",
  description: "AI-powered code review assistant for developers.",
  metadataBase: new URL('https://neurolint.com'),
  appleWebApp: {
    title: "Neurolint",
  },
  openGraph: {
    images: [
      {
        url: '/neurolint-og.png',
        width: 1200,
        height: 630,
        alt: 'Neurolint - AI Code Review Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/neurolint-og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>
            {children}
          </main>
          <div className="w-full">
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
