import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { Testimonials } from "@/components/home/Testimonials"
import { CTA } from "@/components/home/CTA"
import { Stats } from "@/components/home/Stats"

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-black">
      {/* Hero Section (Gradient will be handled in AnimatedHero) */}
      <section className="relative overflow-hidden w-full min-h-screen bg-white dark:bg-black">
        <div className="max-w-full mx-auto relative">
          <Hero />
        </div>
      </section>

      {/* Stats Section (Black with grid) */}
      <section className="py-32 w-full relative bg-white dark:bg-black">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Stats />
        </div>
      </section>

      {/* Features Section (Black with grid) */}
      <section className="py-32 w-full relative bg-white dark:bg-black">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Features />
        </div>
      </section>

      {/* Testimonials Section (Black with grid) */}
      <section className="py-32 w-full relative bg-white dark:bg-black">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Testimonials />
        </div>
      </section>

      {/* CTA Section (Black with grid) */}
      <section className="py-32 w-full relative bg-white dark:bg-black">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <CTA />
        </div>
      </section>
    </div>
  )
}
