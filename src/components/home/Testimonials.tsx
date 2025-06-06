"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote: "Neurolint has transformed our code review process. The AI insights are incredibly accurate and save us hours of manual review.",
      author: "Sarah Chen",
      role: "Lead Developer at TechCorp",
      rating: 5
    },
    {
      quote: "The performance optimization suggestions are spot-on. We've seen a 40% improvement in our application's response time.",
      author: "Michael Rodriguez",
      role: "CTO at StartupX",
      rating: 5
    },
    {
      quote: "Security analysis is top-notch. It caught several vulnerabilities that our traditional tools missed.",
      author: "Alex Thompson",
      role: "Security Engineer at SecureCo",
      rating: 5
    }
  ]

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
            Loved by Developers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See what our users have to say about their experience with Neurolint
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/40 dark:bg-black/40 border-gray-200/10 dark:border-white/10 hover:border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">&quot;{testimonial.quote}&quot;</blockquote>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 