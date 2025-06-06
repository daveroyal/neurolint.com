'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Loader2 } from 'lucide-react'

interface CodeMetrics {
  complexity: number
  maintainability: number
  testCoverage: number
  codeDuplication: number
  documentation: number
}

export default function MetricsPage() {
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState<CodeMetrics | null>(null)

  useEffect(() => {
    loadLatestAnalysis()
  }, [])

  const loadLatestAnalysis = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/analyses?limit=1')
      if (!response.ok) {
        throw new Error('Failed to load latest analysis')
      }
      const data = await response.json()
      if (data.length > 0) {
        // Extract metrics from analysis results
        const analysisResults = data[0].results
        if (analysisResults.metrics) {
          setMetrics(analysisResults.metrics)
        }
      }
    } catch (err) {
      console.error('Load analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-green-500'
    if (value >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getMetricLabel = (value: number) => {
    if (value >= 80) return 'Good'
    if (value >= 60) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="h-full py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Code Metrics</h1>
        <p className="text-muted-foreground">
          View code quality metrics from your latest analysis.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Quality Metrics
            </CardTitle>
            <CardDescription>
              Key metrics that indicate the quality and maintainability of your code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : metrics ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <h3 className="text-sm font-medium mb-2">Code Complexity</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${getMetricColor(metrics.complexity)}`}>
                      {metrics.complexity}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getMetricLabel(metrics.complexity)}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <h3 className="text-sm font-medium mb-2">Maintainability</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${getMetricColor(metrics.maintainability)}`}>
                      {metrics.maintainability}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getMetricLabel(metrics.maintainability)}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <h3 className="text-sm font-medium mb-2">Test Coverage</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${getMetricColor(metrics.testCoverage)}`}>
                      {metrics.testCoverage}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getMetricLabel(metrics.testCoverage)}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <h3 className="text-sm font-medium mb-2">Code Duplication</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${getMetricColor(100 - metrics.codeDuplication)}`}>
                      {100 - metrics.codeDuplication}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getMetricLabel(100 - metrics.codeDuplication)}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <h3 className="text-sm font-medium mb-2">Documentation</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${getMetricColor(metrics.documentation)}`}>
                      {metrics.documentation}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getMetricLabel(metrics.documentation)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium text-center">No metrics available</p>
                <p className="text-sm mt-2 text-center max-w-sm">
                  Run a code analysis to get quality metrics
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 