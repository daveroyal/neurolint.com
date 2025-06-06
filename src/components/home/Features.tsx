"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Code2 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Security Analysis",
    description: "Detect potential security vulnerabilities and best practices",
    content: "Our AI models analyze your code for common security issues and suggest improvements."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Identify performance bottlenecks and optimization opportunities",
    content: "Get detailed insights into code performance and recommendations for improvement."
  },
  {
    icon: Code2,
    title: "Code Quality",
    description: "Ensure high code quality and maintainability",
    content: "Receive suggestions for improving code readability, maintainability, and adherence to best practices."
  }
]

export function Features() {
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
            Key Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to ensure your code is secure, performant, and maintainable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/40 dark:bg-black/40 border-gray-200/10 dark:border-white/10 hover:border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 