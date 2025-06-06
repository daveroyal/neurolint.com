'use client'

import { useState, useEffect, useCallback } from 'react'
import { CodeEditor } from '@/components/features/CodeEditor'
import { AnalysisResults } from '@/components/features/AnalysisResults'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AnalysisResult } from '@/lib/ai/base'
import { Code2, Loader2, Play, Save, FileDown, FileUp, Trash2, AlertTriangle, Pencil, X } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { getAIProvider } from '@/lib/ai/factory'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSearchParams, useRouter } from 'next/navigation'

interface Workspace {
  id: string
  name: string
  code: string
  language: string
  created_at: string
  updated_at: string
}

interface UserSettings {
  llmProvider: 'chatgpt' | 'claude' | 'ollama'
  ollamaEndpoint: string
  openaiApiKey: string
  anthropicApiKey: string
}

const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`

export default function DashboardPage() {
  const [code, setCode] = useState(sampleCode)
  const [language, setLanguage] = useState('javascript')
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editingName, setEditingName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()

  const initializeDatabase = useCallback(async () => {
    try {
      const response = await fetch('/api/init-db', {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to initialize database')
      }

      toast.success('Database initialized successfully')
      return true
    } catch (err) {
      console.error('Database initialization error:', err)
      toast.error('Failed to initialize database')
      return false
    }
  }, [])

  const loadUserSettings = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // First try to get existing settings
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)

      if (error) {
        if (error.code === '42P01') { // Table doesn't exist
          const initialized = await initializeDatabase()
          if (initialized) {
            // Create initial settings for the user
            const { error: upsertError } = await supabase
              .from('user_settings')
              .upsert({
                user_id: user.id,
                settings: {
                  llmProvider: '' as const,
                  ollamaEndpoint: '',
                  openaiApiKey: '',
                  anthropicApiKey: ''
                }
              })
              .select()
              .single()

            if (upsertError) {
              console.error('Error creating initial settings:', upsertError)
              toast.error('Failed to create initial settings')
            } else {
              // Reload settings after creating them
              await loadUserSettings()
            }
          }
          return
        }
        throw error
      }

      // If we have settings, use them. Otherwise, create new settings
      if (data && data.length > 0) {
        setUserSettings(data[0].settings)
      } else {
        // Create initial settings for the user using upsert
        const { error: upsertError } = await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            settings: {
              llmProvider: '' as const,
              ollamaEndpoint: '',
              openaiApiKey: '',
              anthropicApiKey: ''
            }
          })
          .select()
          .single()

        if (upsertError) {
          console.error('Error creating initial settings:', upsertError)
          toast.error('Failed to create initial settings')
        } else {
          // Reload settings after creating them
          await loadUserSettings()
        }
      }
    } catch (err) {
      console.error('Load settings error:', err)
      toast.error('Failed to load settings')
    }
  }, [supabase, initializeDatabase])

  const loadWorkspaceById = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/workspaces?id=${id}`)
      if (!response.ok) {
        throw new Error('Failed to load workspace')
      }
      const workspace = await response.json()
      loadWorkspace(workspace)
    } catch (err) {
      console.error('Load workspace error:', err)
      toast.error('Failed to load workspace')
    }
  }, [])

  useEffect(() => {
    loadUserSettings()
  }, [loadUserSettings])

  useEffect(() => {
    const workspaceId = searchParams.get('workspace')
    if (workspaceId) {
      loadWorkspaceById(workspaceId)
    }
  }, [searchParams, loadWorkspaceById])

  const handleSaveWorkspace = async () => {
    if (!newWorkspaceName.trim() || isSaving) {
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWorkspaceName.trim(),
          code,
          language
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Save workspace error:', errorData)
        throw new Error(errorData.error || 'Failed to save workspace')
      }

      const data = await response.json()
      setCurrentWorkspace(data)
      setIsSaveDialogOpen(false)
      setNewWorkspaceName('')
      toast.success('Workspace saved successfully')
    } catch (err) {
      console.error('Save workspace error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to save workspace')
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateWorkspace = async () => {
    if (!currentWorkspace) return

    try {
      const response = await fetch(`/api/workspaces?id=${currentWorkspace.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: currentWorkspace.name,
          code,
          language
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Update workspace error:', errorData)
        throw new Error(errorData.error || 'Failed to update workspace')
      }

      const data = await response.json()
      setCurrentWorkspace(data)
      toast.success('Workspace updated successfully')
    } catch (err) {
      console.error('Update workspace error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to update workspace')
    }
  }

  const handleDeleteWorkspace = async (id: string) => {
    try {
      const response = await fetch(`/api/workspaces?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Delete workspace error:', errorData)
        throw new Error(errorData.error || 'Failed to delete workspace')
      }

      if (currentWorkspace?.id === id) {
        setCurrentWorkspace(null)
        setCode(sampleCode)
        setLanguage('javascript')
        router.push('/dashboard')
      }
      toast.success('Workspace deleted successfully')
    } catch (err) {
      console.error('Delete workspace error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete workspace')
    }
  }

  const loadWorkspace = (workspace: Workspace) => {
    setCode(workspace.code)
    setLanguage(workspace.language)
    setCurrentWorkspace(workspace)
  }

  const handleAnalyze = async () => {
    if (!userSettings) {
      toast.error('Please configure your LLM settings first')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const provider = getAIProvider(userSettings)
      const result = await provider.analyze(code, language)
      setResults(result)
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze code')
      toast.error(err instanceof Error ? err.message : 'Failed to analyze code')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateWorkspaceName = async () => {
    if (!currentWorkspace || !editingName.trim() || isUpdatingName) return

    setIsUpdatingName(true)
    try {
      const response = await fetch(`/api/workspaces?id=${currentWorkspace.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingName.trim(),
          code,
          language
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update workspace name')
      }

      const data = await response.json()
      setCurrentWorkspace(data)
      setIsEditingName(false)
      toast.success('Workspace name updated successfully')
    } catch (err) {
      console.error('Update workspace name error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to update workspace name')
    } finally {
      setIsUpdatingName(false)
    }
  }

  const handleNewWorkspace = () => {
    setCurrentWorkspace(null)
    setCode(sampleCode)
    setLanguage('javascript')
    setResults(null)
    router.push('/dashboard')
  }

  return (
    <div className="h-full py-6 flex flex-col min-h-0 bg-background text-foreground">
      {/* Editor Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 rounded-lg border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
            onClick={handleNewWorkspace}
          >
            <FileUp className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">New</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 rounded-lg border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
          >
            <FileDown className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Export</span>
          </Button>
          {currentWorkspace ? (
            <>
              <Button
                onClick={handleUpdateWorkspace}
                className="h-9 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
              >
                <Save className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Save</span>
              </Button>
              <Button
                onClick={() => handleDeleteWorkspace(currentWorkspace.id)}
                variant="destructive"
                className="h-9 rounded-lg"
              >
                <Trash2 className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Delete</span>
              </Button>
            </>
          ) : (
            <Dialog open={isSaveDialogOpen} onOpenChange={(open) => {
              if (!isSaving) {
                setIsSaveDialogOpen(open)
              }
            }}>
              <DialogTrigger asChild>
                <Button className="h-9 rounded-lg bg-primary hover:bg-primary/90 transition-colors">
                  <Save className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Save</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Save Workspace</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Workspace Name</Label>
                    <Input
                      id="name"
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      placeholder="Enter a name for your workspace"
                      className="h-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newWorkspaceName.trim() && !isSaving) {
                          handleSaveWorkspace()
                        }
                      }}
                      disabled={isSaving}
                    />
                    <p className="text-sm text-muted-foreground">
                      This will save your current code and settings
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={handleSaveWorkspace} 
                      className="flex-1 h-10"
                      disabled={!newWorkspaceName.trim() || isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Workspace
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSaveDialogOpen(false)}
                      className="h-10"
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <div className="flex-1" />
          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !userSettings?.llmProvider}
            className="h-9 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="md:mr-2 h-4 w-4 animate-spin" />
                <span className="hidden md:inline">Analyzing...</span>
              </>
            ) : !userSettings?.llmProvider ? (
              <>
                <Play className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Select LLM Provider</span>
              </>
            ) : (
              <>
                <Play className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Analyze</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 gap-6">
        {/* Code Editor */}
        <div className="flex flex-col flex-1 min-w-0 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border shadow-md min-h-[400px] lg:min-h-0">
          <div className="bg-muted/50 backdrop-blur-sm border-b border-border/50 flex items-center p-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-6 w-[120px] text-xs border-none bg-transparent px-2 hover:bg-muted/50">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {currentWorkspace ? (
                isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isUpdatingName) {
                          handleUpdateWorkspaceName()
                        } else if (e.key === 'Escape') {
                          setIsEditingName(false)
                          setEditingName(currentWorkspace.name)
                        }
                      }}
                      className="h-6 text-xs"
                      autoFocus
                      disabled={isUpdatingName}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        setIsEditingName(false)
                        setEditingName(currentWorkspace.name)
                      }}
                      disabled={isUpdatingName}
                    >
                      {isUpdatingName ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="text-xs text-muted-foreground font-medium flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors group"
                    onClick={() => {
                      setIsEditingName(true)
                      setEditingName(currentWorkspace.name)
                    }}
                  >
                    <span className="group-hover:underline">{currentWorkspace.name}</span>
                    <Pencil className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                )
              ) : (
                <div className="text-xs text-muted-foreground font-medium">
                  Untitled Workspace
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0 relative">
            <CodeEditor
              value={code}
              language={language}
              onChange={setCode}
              onCursorChange={setCursorPosition}
              className="absolute inset-0"
            />
          </div>
          <div className="h-9 bg-muted/50 backdrop-blur-sm border-t border-border/50 flex items-center px-4 text-xs text-muted-foreground rounded-b-xl">
            <div className="flex items-center gap-4">
              <span className="font-medium">Ready</span>
              <span className="uppercase font-bold">{language}</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
              <span>Spaces: 2</span>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 flex-1 min-w-0 rounded-xl overflow-hidden shadow-sm min-h-[400px] lg:min-h-0">
          <div className="flex-1 overflow-auto p-4 sm:p-6 h-full">
            {results ? (
              <AnalysisResults results={results} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Code2 className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium text-center">Your analysis results will appear here</p>
                  <p className="text-sm mt-2 text-center max-w-sm">Enter your code and click Analyze to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6">
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-destructive">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
} 