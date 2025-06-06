'use client'

import { useState, useEffect } from 'react'
import { History, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { AnalysisResult } from '@/lib/ai/base'

interface SavedAnalysis {
  id: string
  code: string
  language: string
  results: AnalysisResult
  created_at: string
}

export default function HistoryPage() {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  useEffect(() => {
    loadAnalyses()
  }, [])

  const loadAnalyses = async () => {
    setLoadingHistory(true)
    try {
      const response = await fetch('/api/analyses')
      if (!response.ok) {
        throw new Error('Failed to load analyses')
      }
      const data = await response.json()
      setSavedAnalyses(data)
    } catch (err) {
      console.error('Load analyses error:', err)
      toast.error('Failed to load analysis history')
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleDeleteAnalysis = async (id: string) => {
    try {
      const response = await fetch(`/api/analyses?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete analysis')
      }

      await loadAnalyses()
      toast.success('Analysis deleted successfully')
    } catch (err) {
      console.error('Delete analysis error:', err)
      toast.error('Failed to delete analysis')
    }
  }

  const loadAnalysis = (analysis: SavedAnalysis) => {
    // TODO: Implement loading analysis into editor
    console.log('Loading analysis:', analysis)
  }

  return (
    <div className="h-full py-6 flex flex-col min-h-0 bg-background text-foreground">
      {loadingHistory ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : savedAnalyses.length > 0 ? (
        <div className="space-y-4">
          {savedAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer group"
              onClick={() => loadAnalysis(analysis)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {format(new Date(analysis.created_at), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteAnalysis(analysis.id)
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="uppercase font-medium">{analysis.language}</span>
                <span className="mx-2">•</span>
                <span className="line-clamp-1">{analysis.code}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <div className="flex flex-col items-center">
            <History className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium text-center">No analysis history</p>
            <p className="text-sm mt-2 text-center max-w-sm">Your analysis history will appear here</p>
          </div>
        </div>
      )}
    </div>
  )
} 