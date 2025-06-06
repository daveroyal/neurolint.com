import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { OpenAIProvider } from '@/lib/ai/openai'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { code, language } = await request.json()

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user settings to get the API key
    const { data: settingsData, error: settingsError } = await supabase
      .from('user_settings')
      .select('settings')
      .eq('user_id', session.user.id)
      .single()

    if (settingsError || !settingsData?.settings?.openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 400 }
      )
    }

    // TODO: Add rate limiting and usage tracking
    const provider = new OpenAIProvider(settingsData.settings.openaiApiKey)
    const results = await provider.analyze(code, language)

    // Store analysis in history
    await supabase
      .from('analysis_history')
      .insert({
        user_id: session.user.id,
        code,
        language,
        results,
      })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 