import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Terminal, GitBranch, Settings, Workflow } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Usage Guide | neurolint',
  description: 'Learn how to use neurolint effectively in your projects.',
}

export default function UsagePage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Usage Guide</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 sm:mb-10">
            Learn how to use neurolint effectively in your projects
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {/* Command Line Interface */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Command Line Interface</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                neurolint provides a simple command-line interface to analyze your code.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`# Basic usage
npx neurolint

# Analyze specific files
npx neurolint src/**/*.ts

# Run with specific options
npx neurolint --config custom.config.js`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Development Workflow */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Development Workflow</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                neurolint can be integrated into your development workflow in several ways.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`// package.json
{
  "scripts": {
    "lint": "neurolint",
    "precommit": "neurolint",
    "prepush": "neurolint"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Configuration Options */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Configuration Options</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                neurolint provides several configuration options to customize its behavior.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`// neurolint.config.js
module.exports = {
  // File patterns to analyze
  include: ['src/**/*.ts'],
  exclude: ['**/*.test.ts'],
  
  // Analysis options
  options: {
    maxFileSize: '1MB',
    timeout: 30000,
    concurrency: 4
  },
  
  // Output options
  output: {
    format: 'json',
    file: 'neurolint-report.json'
  }
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* CI/CD Integration */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">CI/CD Integration</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                neurolint can be integrated with popular CI/CD platforms.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`# GitHub Actions example
name: Code Analysis
on: [push, pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npx neurolint`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Check out our detailed guides and examples to get the most out of neurolint.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              View Documentation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 