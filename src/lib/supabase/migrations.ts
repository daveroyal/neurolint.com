import { createClient } from './client'

export async function initializeDatabase() {
  const supabase = createClient()

  // Drop existing table if it exists
  const { error: dropTableError } = await supabase
    .from('user_settings')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records

  if (dropTableError) {
    console.error('Error dropping user_settings table:', dropTableError)
    throw dropTableError
  }

  // Create user_settings table
  const { error: createTableError } = await supabase
    .from('user_settings')
    .insert({
      settings: {
        llmProvider: '',
        ollamaEndpoint: '',
        openaiApiKey: '',
        anthropicApiKey: ''
      }
    })
    .select()
    .single()

  if (createTableError) {
    console.error('Error creating user_settings table:', createTableError)
    throw createTableError
  }
} 