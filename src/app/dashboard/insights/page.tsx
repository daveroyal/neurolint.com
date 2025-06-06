'use client'

import { Lightbulb, BarChart } from 'lucide-react'

export default function InsightsPage() {
  return (
    <div className="h-full py-6 flex flex-col min-h-0 bg-background text-foreground">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-border/50 bg-background/50">
          <Lightbulb className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium text-center">Suggestions</p>
          <p className="text-sm mt-2 text-center max-w-sm">Suggestions will appear here after analysis</p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-border/50 bg-background/50">
          <BarChart className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium text-center">Code Metrics</p>
          <p className="text-sm mt-2 text-center max-w-sm">Code metrics will appear here after analysis</p>
        </div>
      </div>
    </div>
  )
} 