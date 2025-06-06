import { AIProvider, AnalysisResult } from './base'

export class OpenAIProvider extends AIProvider {
  private apiKey: string

  constructor(apiKey: string) {
    super()
    this.apiKey = apiKey
  }

  async analyze(code: string, language: string): Promise<AnalysisResult> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a code analysis expert. Analyze the following ${language} code for security, performance, and quality issues. Return the analysis in the following JSON format:
            {
              "security": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
              "performance": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
              "quality": [{ "line": number, "message": string, "severity": "low" | "medium" | "high" }],
              "score": number // Overall score from 0-100
            }`
          },
          {
            role: 'user',
            content: code
          }
        ],
        temperature: 0.1
      })
    })

    if (!response.ok) {
      throw new Error('Failed to analyze code with OpenAI')
    }

    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  }
} 