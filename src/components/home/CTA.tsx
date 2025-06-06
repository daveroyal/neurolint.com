"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react" // Added Terminal for consistency

export function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
      className="relative rounded-[2rem] p-[1px] sm:p-[1px] lg:p-[1px]
                 bg-gradient-to-br from-gray-50/90 via-blue-50/80 to-white/90 dark:from-gray-950/70 dark:via-blue-950/70 dark:to-black/90 backdrop-blur-xl
                 shadow-md shadow-gray-400/10 dark:shadow-gray-900/20
                 before:absolute before:inset-0 before:rounded-[2rem] before:border before:border-gray-200/40 dark:before:border-gray-600/40 before:pointer-events-none"
    >
      <div className="relative rounded-[2rem] p-6 sm:p-8 lg:p-16">
        {/* Dynamic Gradient Background within CTA */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden rounded-[2rem]">
          <div
            className="absolute inset-0 animate-pulse-slow"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(20, 30, 70, 0.3) 0%, rgba(0,0,0,0) 80%)',
            }}
          />
          {/* Subtle, localized orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/40 dark:to-purple-700/40 rounded-full blur-3xl opacity-80"
            animate={{ scale: [1, 1.1, 1], y: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-tl from-pink-400/20 to-cyan-400/20 dark:from-pink-600/40 dark:to-cyan-700/40 rounded-full blur-3xl opacity-80"
            animate={{ scale: [1.1, 1, 1.1], y: [5, -5, 5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5 z-10">
          <div
            className="absolute inset-0 bg-repeat animate-grid"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)`,
              backgroundSize: '50px 50px', // Smaller grid for CTA
              backgroundPosition: '0 0',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-4 sm:mb-6
                           bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-blue-300 dark:via-cyan-300 dark:to-white
                           drop-shadow-2xl leading-tight">
              Ready to <span className="text-purple-700 dark:text-purple-300">Unleash</span> the Power of AI on Your Code?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white/70 mb-8 sm:mb-10 font-light max-w-2xl mx-auto drop-shadow px-4">
              Join leading innovators who are transforming their development workflow with
              Neurolint&apos;s intelligent code analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-10 py-5 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-105 animate-button-glow [--tw-shadow-color:rgba(70,100,255,0.4)]"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                {/* Subtle radial light effect on hover */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-gray-100/5 hover:bg-gray-100/10 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold px-10 py-5 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <Terminal className="mr-2 h-5 w-5 text-blue-400" /> {/* Changed Zap to Terminal */}
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}