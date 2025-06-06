import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnalysisResult, Issue } from '@/lib/ai/base'
import { AlertCircle, Zap, Code2 } from 'lucide-react'

interface AnalysisResultsProps {
  results: AnalysisResult
  className?: string
}

const severityColors = {
  low: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  high: 'bg-red-500/10 text-red-500 border-red-500/20',
}

const categoryIcons = {
  security: AlertCircle,
  performance: Zap,
  quality: Code2,
}

function IssueList({ issues, title, category }: { issues: Issue[]; title: string; category: keyof typeof categoryIcons }) {
  const Icon = categoryIcons[category]
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {issues.length === 0 ? (
        <p className="text-sm text-muted-foreground">No issues found</p>
      ) : (
        <div className="space-y-3">
          {issues.map((issue, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 rounded-lg border bg-card/50"
            >
              <Badge
                variant="secondary"
                className={`${severityColors[issue.severity]} border`}
              >
                {issue.severity}
              </Badge>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Line {issue.line}:</span> {issue.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function AnalysisResults({ results, className }: AnalysisResultsProps) {
  const scoreColor = results.score >= 80 
    ? 'text-green-500' 
    : results.score >= 60 
    ? 'text-yellow-500' 
    : 'text-red-500'

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${scoreColor}`}>{results.score}</span>
              <span className="text-muted-foreground">/ 100</span>
            </div>
            <div className="space-y-8">
              <IssueList issues={results.security} title="Security Issues" category="security" />
              <IssueList issues={results.performance} title="Performance Issues" category="performance" />
              <IssueList issues={results.quality} title="Quality Issues" category="quality" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 