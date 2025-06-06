'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Loader2 } from 'lucide-react'

interface Suggestion {
  title: string
  description: string
  code?: string
}

export default function SuggestionsPage() {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null)

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
        const analysisResults = data[0].results
        if (analysisResults.suggestions) {
          setSuggestions(analysisResults.suggestions)
        }
      }
    } catch (err) {
      console.error('Load analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Suggestions</h1>
        <p className="text-muted-foreground">
          View code improvement suggestions from your latest analysis.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Code Suggestions
            </CardTitle>
            <CardDescription>
              Recommendations for improving your code quality and maintainability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : suggestions ? (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border/50 bg-background/50"
                  >
                    <h3 className="font-medium mb-2">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    {suggestion.code && (
                      <pre className="mt-2 p-2 rounded bg-muted/50 text-sm overflow-x-auto">
                        <code>{suggestion.code}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium text-center">No suggestions available</p>
                <p className="text-sm mt-2 text-center max-w-sm">
                  Run a code analysis to get improvement suggestions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 