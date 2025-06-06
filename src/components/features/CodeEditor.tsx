import { Editor, OnMount } from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface CodeEditorProps {
  value: string
  language?: string
  onChange?: (value: string) => void
  onCursorChange?: (position: { line: number; column: number }) => void
  readOnly?: boolean
  height?: string | number
  className?: string
}

interface CursorPositionChangedEvent {
  position: {
    lineNumber: number
    column: number
  }
}

export function CodeEditor({
  value,
  language = 'typescript',
  onChange,
  onCursorChange,
  readOnly = false,
  className,
}: CodeEditorProps) {
  const { theme } = useTheme()

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Set up cursor position tracking
    editor.onDidChangeCursorPosition((e: CursorPositionChangedEvent) => {
      const position = e.position
      onCursorChange?.({
        line: position.lineNumber,
        column: position.column
      })
    })

    // Set theme
    if (theme === 'dark') {
      monaco.editor.setTheme('custom-dark')
    }
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={(value) => onChange?.(value ?? '')}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        readOnly,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        padding: { top: 8, bottom: 8 },
        renderWhitespace: 'selection',
        contextmenu: true,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        accessibilitySupport: 'on',
        ariaLabel: 'Code editor',
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          useShadows: false,
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
        },
        overviewRulerBorder: true,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 16,
        lineNumbersMinChars: 3,
        renderLineHighlight: 'all',
        renderLineHighlightOnlyWhenFocus: false,
        lineHeight: 20,
      }}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme('custom-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#1A1A1A',
          }
        })
      }}
      loading={<div className="h-full w-full flex items-center justify-center bg-[#1A1A1A]">Loading editor...</div>}
      className={className}
    />
  )
} 