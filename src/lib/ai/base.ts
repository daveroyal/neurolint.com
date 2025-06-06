export interface AnalysisResult {
  security: Issue[]
  performance: Issue[]
  quality: Issue[]
  score: number
}

export interface Issue {
  line: number
  message: string
  severity: 'low' | 'medium' | 'high'
}

export abstract class AIProvider {
  abstract analyze(code: string, language: string): Promise<AnalysisResult>
} 