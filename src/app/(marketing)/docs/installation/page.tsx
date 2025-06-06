import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Download, Settings, Key } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Installation Guide | neurolint',
  description: 'Learn how to install and set up neurolint in your project.',
}

export default function InstallationPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Installation Guide</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 sm:mb-10">
            Learn how to install and set up neurolint in your project
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {/* Installation Steps */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Installation</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                neurolint is available as an npm package and can be installed in your project using npm or yarn.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>npm install neurolint</code>
                </pre>
              </div>
              <p className="text-muted-foreground">
                Or using yarn:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>yarn add neurolint</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Configuration */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Configuration</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                After installing neurolint, you need to configure it in your project.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`// neurolint.config.js
                    module.exports = {
                      // Your configuration options
                    }`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* API Keys */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">API Keys</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                To use neurolint&apos;s AI-powered analysis, you need to set up your API keys.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`// neurolint.config.js
                    module.exports = {
                      apiKeys: {
                        openai: 'your-openai-api-key',
                        anthropic: 'your-anthropic-api-key'
                      }
                    }`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Usage</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Once you have installed and configured neurolint, you can start using it in your project.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`// Run neurolint
                    npx neurolint

                    // Or add it to your package.json scripts
                    {
                      "scripts": {
                        "lint": "neurolint"
                      }
                    }`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
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