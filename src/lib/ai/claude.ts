import { AIProvider, AnalysisResult } from './base'

export class ClaudeProvider extends AIProvider {
  private apiKey: string

  constructor(apiKey: string) {
    super()
    this.apiKey = apiKey
  }

  async analyze(code: string, language: string): Promise<AnalysisResult> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `Analyze this ${language} code for security, performance, and quality issues. Return the analysis in the following JSON format:
            {
              "security": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
              "performance": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
              "quality": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
              "score": number // Overall score from 0-100
            }

            Here's the code to analyze:
            ${code}`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to analyze code with Claude')
    }

    const data = await response.json()
    return JSON.parse(data.content[0].text)
  }
} 