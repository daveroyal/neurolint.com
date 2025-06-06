'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { User, Palette, Key, Server, Settings, Loader2, Bot, Sparkles, Cpu } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

type LLMProvider = 'chatgpt' | 'claude' | 'ollama' | ''

interface Settings {
  llmProvider: LLMProvider
  ollamaEndpoint?: string
  openaiApiKey?: string
  anthropicApiKey?: string
  userSettings?: {
    name?: string
    email?: string
    theme?: 'light' | 'dark' | 'system'
  }
  interface: {
    darkMode: boolean
    notifications: boolean
    autoSave: boolean
    showLineNumbers: boolean
    showMinimap: boolean
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    llmProvider: '',
    ollamaEndpoint: '',
    openaiApiKey: '',
    anthropicApiKey: '',
    userSettings: {
      name: '',
      email: '',
      theme: 'system'
    },
    interface: {
      darkMode: true,
      notifications: true,
      autoSave: true,
      showLineNumbers: true,
      showMinimap: true
    }
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' })
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

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

  const loadSettings = useCallback(async () => {
    setLoading(true)
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
            const meta = user.user_metadata || {}
            const getName = () => (
              (meta.name && typeof meta.name === 'string' && meta.name) ||
              (meta.full_name && typeof meta.full_name === 'string' && meta.full_name) ||
              (meta.username && typeof meta.username === 'string' && meta.username) ||
              ''
            )
            const initialSettings: Settings = {
              llmProvider: '' as LLMProvider,
              ollamaEndpoint: '',
              openaiApiKey: '',
              anthropicApiKey: '',
              userSettings: {
                name: getName(),
                email: user.email || '',
                theme: 'system'
              },
              interface: {
                darkMode: true,
                notifications: true,
                autoSave: true,
                showLineNumbers: true,
                showMinimap: true
              }
            }
            await supabase
              .from('user_settings')
              .upsert({
                user_id: user.id,
                settings: initialSettings
              })
              .select()
              .single()
            setSettings(initialSettings)
          }
          return
        }
        throw error
      }

      if (data && data.length > 0) {
        // Always use latest user info for name/email unless user has typed something
        const getName = () => {
          const meta = user.user_metadata || {}
          return (
            (meta.name && typeof meta.name === 'string' && meta.name) ||
            (meta.full_name && typeof meta.full_name === 'string' && meta.full_name) ||
            (meta.username && typeof meta.username === 'string' && meta.username) ||
            data[0].settings.userSettings?.name ||
            ''
          )
        }
        setSettings((prev) => ({
          ...data[0].settings,
          userSettings: {
            ...data[0].settings.userSettings,
            name: prev.userSettings?.name?.length ? prev.userSettings.name : getName(),
            email: prev.userSettings?.email?.length ? prev.userSettings.email : (user.email || data[0].settings.userSettings?.email || ''),
          },
          interface: {
            ...prev.interface,
            ...data[0].settings.interface
          }
        }))
      } else {
        const meta = user.user_metadata || {}
        const getName = () => (
          (meta.name && typeof meta.name === 'string' && meta.name) ||
          (meta.full_name && typeof meta.full_name === 'string' && meta.full_name) ||
          (meta.username && typeof meta.username === 'string' && meta.username) ||
          ''
        )
        const initialSettings: Settings = {
          llmProvider: '' as LLMProvider,
          ollamaEndpoint: '',
          openaiApiKey: '',
          anthropicApiKey: '',
          userSettings: {
            name: getName(),
            email: user.email || '',
            theme: 'system'
          },
          interface: {
            darkMode: true,
            notifications: true,
            autoSave: true,
            showLineNumbers: true,
            showMinimap: true
          }
        }
        setSettings(initialSettings)
        await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            settings: initialSettings
          })
          .select()
          .single()
      }
    } catch (err) {
      console.error('Load settings error:', err)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }, [supabase, initializeDatabase])

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const handleSettingChange = async (key: keyof Settings['interface'], value: boolean) => {
    setLoading(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [key]: value,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      setSettings((prev) => ({
        ...prev,
        interface: {
          ...prev.interface,
          [key]: value
        }
      }))
      toast.success('Settings updated successfully')
    } catch (err) {
      console.error('Update settings error:', err)
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Update user profile if name or email changed
      if (settings.userSettings?.name !== user.user_metadata?.name || 
          settings.userSettings?.email !== user.email) {
        const { error: updateError } = await supabase.auth.updateUser({
          email: settings.userSettings?.email,
          data: { name: settings.userSettings?.name }
        })
        if (updateError) throw updateError
      }

      // Only validate API keys if a provider is selected
      if (settings.llmProvider) {
        if (settings.llmProvider === 'chatgpt' && !settings.openaiApiKey) {
          throw new Error('OpenAI API key is required')
        }
        if (settings.llmProvider === 'claude' && !settings.anthropicApiKey) {
          throw new Error('Anthropic API key is required')
        }
        if (settings.llmProvider === 'ollama' && !settings.ollamaEndpoint) {
          throw new Error('Ollama endpoint is required')
        }
      }

      // First try to get existing settings
      const { data: existingSettings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
          .from('user_settings')
          .update({ settings })
          .eq('user_id', user.id)
          .select()
          .single()

        if (error) throw error
      } else {
        // Insert new settings
        const { error } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            settings
          })
          .select()
          .single()

        if (error) throw error
      }

      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save settings')
      console.error('Error saving settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (password.new !== password.confirm) {
      toast.error('New passwords do not match')
      return
    }

    setIsUpdatingPassword(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: password.new
      })

      if (error) throw error
      
      toast.success('Password updated successfully')
      setPassword({ current: '', new: '', confirm: '' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update password')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Delete user settings
      const { error: settingsError } = await supabase
        .from('user_settings')
        .delete()
        .eq('user_id', user.id)

      if (settingsError) throw settingsError

      // Call server-side API to delete user account
      const res = await fetch('/api/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete user')
      }

      // Sign out
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete account')
      console.error('Error deleting account:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="h-full py-6 space-y-6">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="grid gap-6">
            {/* User Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Settings
                </CardTitle>
                <CardDescription>
                  Manage your basic account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={settings.userSettings?.name || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        userSettings: { ...settings.userSettings, name: e.target.value }
                      })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.userSettings?.email || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        userSettings: { ...settings.userSettings, email: e.target.value }
                      })}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>

            {/* Interface Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Interface
                </CardTitle>
                <CardDescription>
                  Customize your interface preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <Switch
                      id="darkMode"
                      checked={settings.interface?.darkMode}
                      onCheckedChange={(checked: boolean) => handleSettingChange('darkMode', checked)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <Switch
                      id="notifications"
                      checked={settings.interface?.notifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('notifications', checked)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoSave">Auto Save</Label>
                    <Switch
                      id="autoSave"
                      checked={settings.interface?.autoSave}
                      onCheckedChange={(checked: boolean) => handleSettingChange('autoSave', checked)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showLineNumbers">Show Line Numbers</Label>
                    <Switch
                      id="showLineNumbers"
                      checked={settings.interface?.showLineNumbers}
                      onCheckedChange={(checked: boolean) => handleSettingChange('showLineNumbers', checked)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showMinimap">Show Minimap</Label>
                    <Switch
                      id="showMinimap"
                      checked={settings.interface?.showMinimap}
                      onCheckedChange={(checked: boolean) => handleSettingChange('showMinimap', checked)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LLM Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  LLM Configuration
                </CardTitle>
                <CardDescription>
                  Choose which language model you want to use for code analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Select LLM Provider</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <Checkbox
                        id="chatgpt"
                        checked={settings.llmProvider === 'chatgpt'}
                        onCheckedChange={(checked: boolean) => {
                          setSettings({
                            ...settings,
                            llmProvider: checked ? 'chatgpt' : ''
                          })
                        }}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="chatgpt"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sparkles className="mb-3 h-6 w-6" />
                        OpenAI
                      </Label>
                    </div>

                    <div>
                      <Checkbox
                        id="claude"
                        checked={settings.llmProvider === 'claude'}
                        onCheckedChange={(checked: boolean) => {
                          setSettings({
                            ...settings,
                            llmProvider: checked ? 'claude' : ''
                          })
                        }}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="claude"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Bot className="mb-3 h-6 w-6" />
                        Anthropic
                      </Label>
                    </div>

                    <div>
                      <Checkbox
                        id="ollama"
                        checked={settings.llmProvider === 'ollama'}
                        onCheckedChange={(checked: boolean) => {
                          setSettings({
                            ...settings,
                            llmProvider: checked ? 'ollama' : ''
                          })
                        }}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="ollama"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Cpu className="mb-3 h-6 w-6" />
                        Ollama
                      </Label>
                    </div>
                  </div>
                </div>

                {settings.llmProvider === 'chatgpt' && (
                  <div className="space-y-2">
                    <Label htmlFor="openai-api-key" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      OpenAI API Key
                    </Label>
                    <Input
                      id="openai-api-key"
                      type="password"
                      placeholder="sk-..."
                      value={settings.openaiApiKey}
                      onChange={(e) => setSettings({ ...settings, openaiApiKey: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Your OpenAI API key. Get it from{' '}
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        OpenAI Platform
                      </a>
                    </p>
                  </div>
                )}

                {settings.llmProvider === 'claude' && (
                  <div className="space-y-2">
                    <Label htmlFor="anthropic-api-key" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Anthropic API Key
                    </Label>
                    <Input
                      id="anthropic-api-key"
                      type="password"
                      placeholder="sk-ant-..."
                      value={settings.anthropicApiKey}
                      onChange={(e) => setSettings({ ...settings, anthropicApiKey: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Your Anthropic API key. Get it from{' '}
                      <a
                        href="https://console.anthropic.com/settings/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Anthropic Console
                      </a>
                    </p>
                  </div>
                )}

                {settings.llmProvider === 'ollama' && (
                  <div className="space-y-2">
                    <Label htmlFor="ollama-endpoint" className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      Ollama Endpoint
                    </Label>
                    <Input
                      id="ollama-endpoint"
                      placeholder="http://localhost:11434"
                      value={settings.ollamaEndpoint}
                      onChange={(e) => setSettings({ ...settings, ollamaEndpoint: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter the URL where your Ollama instance is running.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>

            {/* Password Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Password Management
                </CardTitle>
                <CardDescription>
                  Update your account password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    placeholder="Confirm your new password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleUpdatePassword} 
                  disabled={isUpdatingPassword || !password.current || !password.new || !password.confirm}
                >
                  {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </CardFooter>
            </Card>

            {/* Danger Zone */}
            <Card className="border border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive font-bold text-lg">
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive font-medium mb-2">
                  This action is irreversible.
                </p>
                <p className="text-sm text-destructive/80 mb-4">
                  Permanently delete your account and all associated data. This cannot be undone.
                </p>
                <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => {
                  if (!isDeleting) {
                    setIsDeleteDialogOpen(open)
                    if (!open) {
                      setDeleteConfirm('')
                    }
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeleting}>
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Delete Account'
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">Delete Account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="delete-confirm" className="text-sm font-medium">
                          Type &quot;DELETE&quot; to confirm
                        </Label>
                        <Input
                          id="delete-confirm"
                          placeholder="Type DELETE to confirm"
                          value={deleteConfirm}
                          onChange={(e) => setDeleteConfirm(e.target.value)}
                          disabled={isDeleting}
                          className="h-10"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && deleteConfirm === 'DELETE' && !isDeleting) {
                              setDeleteConfirm('')
                              handleDeleteAccount()
                            }
                          }}
                        />
                        <p className="text-sm text-muted-foreground">
                          This will permanently delete your account and all associated data
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="destructive"
                          onClick={() => { setDeleteConfirm(''); handleDeleteAccount(); }}
                          className="flex-1 h-10"
                          disabled={deleteConfirm !== 'DELETE' || isDeleting}
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Delete Account'
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsDeleteDialogOpen(false)
                            setDeleteConfirm('')
                          }}
                          className="h-10"
                          disabled={isDeleting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
} 