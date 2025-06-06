"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Brain, Terminal } from "lucide-react"

export function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div
          className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent opacity-80 animate-pulse-slow"
        />
        {/* Single Subtle Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl opacity-70"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center relative z-30">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-800/50 dark:to-purple-800/50 backdrop-blur-md shadow-lg shadow-blue-500/10"
        >
          <Brain className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-gray-800 dark:text-white tracking-wide">
            Powered by <span className="font-semibold text-blue-600 dark:text-blue-300">AI Intelligence</span>
          </span>
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.1] text-gray-900 dark:text-white"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Code Smarter
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 dark:from-purple-300 dark:to-fuchsia-300 bg-clip-text text-transparent">
            Ship Faster
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 font-medium"
        >
          Leverage cutting-edge AI to analyze, optimize, and future-proof your codebase with clarity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-105"
            aria-label="Start Free Analysis"
          >
            <span className="relative z-10 flex items-center">
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-gray-100/10 hover:bg-gray-100/20 dark:bg-gray-800/10 dark:hover:bg-gray-800/20 text-gray-900 dark:text-white font-semibold px-8 py-4 rounded-lg backdrop-blur-md transition-all duration-300 hover:scale-105"
            aria-label="Explore Features"
          >
            <Terminal className="mr-2 h-5 w-5 text-blue-400" />
            Explore Features
          </Button>
        </motion.div>
      </div>
    </div>
  )
}