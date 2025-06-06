'use client'

import { useState, useEffect } from 'react'
import { Folder, Plus, Trash2, Loader2, Pencil, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Workspace {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentWorkspaceId = searchParams.get('workspace')

  useEffect(() => {
    loadWorkspaces()
  }, [])

  const loadWorkspaces = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/workspaces')
      if (!response.ok) {
        throw new Error('Failed to load workspaces')
      }
      const data = await response.json()
      setWorkspaces(data)
    } catch (err) {
      console.error('Load workspaces error:', err)
      toast.error('Failed to load workspaces')
    } finally {
      setLoading(false)
    }
  }

  const handleLoadWorkspace = async (workspace: Workspace) => {
    setLoadingId(workspace.id)
    try {
      // Navigate to the dashboard with the workspace ID
      router.push(`/dashboard?workspace=${workspace.id}`)
    } catch (err) {
      console.error('Load workspace error:', err)
      toast.error('Failed to load workspace')
    } finally {
      setLoadingId(null)
    }
  }

  const handleDeleteWorkspace = async (id: string) => {
    setDeletingId(id)
    // Optimistically remove the workspace
    setWorkspaces(prev => prev.filter(w => w.id !== id))
    
    try {
      const response = await fetch(`/api/workspaces?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete workspace')
      }

      toast.success('Workspace deleted successfully')
    } catch (err) {
      console.error('Delete workspace error:', err)
      toast.error('Failed to delete workspace')
      // Revert the optimistic update on error
      await loadWorkspaces()
    } finally {
      setDeletingId(null)
    }
  }

  const handleCreateWorkspace = async () => {
    setCreating(true)
    const tempId = `temp-${Date.now()}`
    const newWorkspace = {
      id: tempId,
      name: 'New Workspace',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    // Optimistically add the workspace
    setWorkspaces(prev => [newWorkspace, ...prev])
    
    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Workspace',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create workspace')
      }

      const data = await response.json()
      // Replace the temporary workspace with the real one
      setWorkspaces(prev => prev.map(w => w.id === tempId ? data : w))
      toast.success('Workspace created successfully')
    } catch (err) {
      console.error('Create workspace error:', err)
      toast.error('Failed to create workspace')
      // Remove the temporary workspace on error
      setWorkspaces(prev => prev.filter(w => w.id !== tempId))
    } finally {
      setCreating(false)
    }
  }

  const handleUpdateWorkspaceName = async (id: string) => {
    if (!editingName.trim()) return

    const workspace = workspaces.find(w => w.id === id)
    if (!workspace) return

    // Optimistically update the workspace name
    setWorkspaces(prev => prev.map(w => 
      w.id === id ? { ...w, name: editingName.trim() } : w
    ))
    setEditingId(null)

    try {
      const response = await fetch(`/api/workspaces?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingName.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update workspace name')
      }

      toast.success('Workspace name updated successfully')
    } catch (err) {
      console.error('Update workspace name error:', err)
      toast.error('Failed to update workspace name')
      // Revert the optimistic update on error
      setWorkspaces(prev => prev.map(w => 
        w.id === id ? { ...w, name: workspace.name } : w
      ))
    }
  }

  return (
    <div className="h-full py-6 flex flex-col min-h-0 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Workspaces</h1>
        <Button 
          onClick={handleCreateWorkspace} 
          disabled={creating}
        >
          {creating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              New Workspace
            </>
          )}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : workspaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className={cn(
                "group p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/50 transition-colors",
                currentWorkspaceId === workspace.id && "border-primary/50 bg-primary/5"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Folder className={cn(
                    "h-4 w-4 flex-shrink-0",
                    currentWorkspaceId === workspace.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  {editingId === workspace.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateWorkspaceName(workspace.id)
                          } else if (e.key === 'Escape') {
                            setEditingId(null)
                            setEditingName('')
                          }
                        }}
                        className="h-7 text-sm"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingId(null)
                          setEditingName('')
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <span 
                      className={cn(
                        "font-medium truncate cursor-pointer hover:text-primary transition-colors",
                        currentWorkspaceId === workspace.id && "text-primary"
                      )}
                      onClick={() => {
                        setEditingId(workspace.id)
                        setEditingName(workspace.name)
                      }}
                    >
                      {workspace.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setEditingId(workspace.id)
                      setEditingName(workspace.name)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteWorkspace(workspace.id)}
                    disabled={deletingId === workspace.id}
                  >
                    {deletingId === workspace.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-destructive" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last updated {format(new Date(workspace.updated_at), 'MMM d, yyyy h:mm a')}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleLoadWorkspace(workspace)}
                  disabled={loadingId === workspace.id}
                >
                  {loadingId === workspace.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Open
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <div className="flex flex-col items-center">
            <Folder className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium text-center">No workspaces</p>
            <p className="text-sm mt-2 text-center max-w-sm">Create a workspace to get started</p>
          </div>
        </div>
      )}
    </div>
  )
} 