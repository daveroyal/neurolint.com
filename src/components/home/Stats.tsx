"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Cpu, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const stats = [
  {
    icon: Brain,
    title: "99.8%",
    description: "AI Accuracy",
    content: "Our advanced AI models provide highly accurate code analysis and recommendations."
  },
  {
    icon: Zap,
    title: "<25ms",
    description: "Response Time",
    content: "Lightning-fast analysis with minimal latency for instant feedback."
  },
  {
    icon: Cpu,
    title: "15+",
    description: "Languages",
    content: "Support for all major programming languages and frameworks."
  },
  {
    icon: Shield,
    title: "100%",
    description: "Secure",
    content: "Enterprise-grade security with end-to-end encryption and data protection."
  }
]

export function Stats() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            Performance Metrics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Industry-leading performance and reliability metrics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/40 dark:bg-black/40 border-gray-200/10 dark:border-white/10 hover:border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center">
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {stat.title}
                      </CardTitle>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                        {stat.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 sm:mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 dark:bg-white/5 rounded-2xl py-8 sm:py-12 px-6 sm:px-8 backdrop-blur-sm border border-gray-200/10 dark:border-white/10">
              <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-8">Trusted by engineering teams worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                {[
                  { name: "Vercel", logo: "/vercel-logo--dark.png" },
                  { name: "Supabase", logo: "/supabase-logo--dark.png" },
                  { name: "Railway", logo: "/railway-logo--dark.png" },
                  { name: "PlanetScale", logo: "/planetscale-logo--dark.png" }
                ].map((company, index) => (
                  <motion.div
                    key={company.name}
                    className="relative h-8 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-full w-auto dark:invert opacity-60 dark:opacity-40"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 