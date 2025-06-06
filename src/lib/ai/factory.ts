import { AIProvider } from './base'
import { OpenAIProvider } from './openai'
import { ClaudeProvider } from './claude'
import { OllamaProvider } from './ollama'

interface UserSettings {
  llmProvider: 'chatgpt' | 'claude' | 'ollama'
  openaiApiKey?: string
  anthropicApiKey?: string
  ollamaEndpoint?: string
}

export function getAIProvider(settings: UserSettings): AIProvider {
  switch (settings.llmProvider) {
    case 'chatgpt':
      if (!settings.openaiApiKey) {
        throw new Error('OpenAI API key is required')
      }
      return new OpenAIProvider(settings.openaiApiKey)
    
    case 'claude':
      if (!settings.anthropicApiKey) {
        throw new Error('Anthropic API key is required')
      }
      return new ClaudeProvider(settings.anthropicApiKey)
    
    case 'ollama':
      if (!settings.ollamaEndpoint) {
        throw new Error('Ollama endpoint is required')
      }
      return new OllamaProvider(settings.ollamaEndpoint)
    
    default:
      throw new Error('Invalid LLM provider')
  }
} 