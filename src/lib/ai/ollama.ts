import { AIProvider, AnalysisResult } from './base'

export class OllamaProvider extends AIProvider {
  private endpoint: string

  constructor(endpoint: string) {
    super()
    this.endpoint = endpoint
  }

  async analyze(code: string, language: string): Promise<AnalysisResult> {
    const response = await fetch(`${this.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'codellama',
        prompt: `Analyze this ${language} code for security, performance, and quality issues. Return the analysis in the following JSON format:
        {
          "security": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
          "performance": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
          "quality": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
          "score": number // Overall score from 0-100
        }

        Here's the code to analyze:
        ${code}`,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error('Failed to analyze code with Ollama')
    }

    const data = await response.json()
    return JSON.parse(data.response)
  }
} 