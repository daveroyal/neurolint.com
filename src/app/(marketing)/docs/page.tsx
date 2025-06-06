import { Metadata } from 'next'
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Settings, History, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: 'Documentation | neurolint',
  description: 'Learn how to use neurolint to improve your code quality and maintainability.',
}

export default function DocsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-38 pb-24 overflow-hidden w-full bg-[#3B82F6]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Documentation</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 sm:mb-10">
              Learn how to use neurolint&apos;s features and get the most out of your code analysis
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {/* Dashboard Overview */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-6 rounded-lg border bg-card">
                  <Code2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Code Analysis</h3>
                  <p className="text-muted-foreground">
                    The main code editor where you can paste or write your code for analysis. Supports syntax highlighting and real-time feedback.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <History className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analysis History</h3>
                  <p className="text-muted-foreground">
                    View your past code analyses, including results, timestamps, and saved code snippets.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <BarChart3 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                  <p className="text-muted-foreground">
                    Track your code quality improvements over time with detailed analytics and metrics.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <Settings className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Settings</h3>
                  <p className="text-muted-foreground">
                    Configure your API keys, preferences, and analysis settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Using the Code Editor */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Using the Code Editor</h2>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    1. Navigate to the dashboard and select your preferred programming language from the dropdown menu.
                  </p>
                  <p className="text-muted-foreground">
                    2. Paste your code into the editor or write it directly.
                  </p>
                  <p className="text-muted-foreground">
                    3. Click the &quot;Analyze&quot; button to start the analysis process.
                  </p>
                  <p className="text-muted-foreground">
                    4. View the analysis results in the right panel, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground ml-4">
                    <li>Security vulnerabilities</li>
                    <li>Performance issues</li>
                    <li>Code quality suggestions</li>
                    <li>Best practices recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Understanding Analysis Results</h2>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">Result Categories</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Security Issues</h4>
                    <p className="text-muted-foreground">
                      Identified security vulnerabilities and potential risks in your code. Each issue includes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4">
                      <li>Issue description</li>
                      <li>Severity level</li>
                      <li>Recommended fixes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Performance Suggestions</h4>
                    <p className="text-muted-foreground">
                      Optimization recommendations for improving code performance:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4">
                      <li>Algorithm improvements</li>
                      <li>Resource usage optimization</li>
                      <li>Memory management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Code Quality</h4>
                    <p className="text-muted-foreground">
                      Suggestions for improving code maintainability and readability:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4">
                      <li>Code structure</li>
                      <li>Naming conventions</li>
                      <li>Documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings and Configuration */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Settings and Configuration</h2>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">API Configuration</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    To use neurolint&apos;s AI-powered analysis, you need to configure your API keys:
                  </p>
                  <ol className="list-decimal list-inside text-muted-foreground ml-4">
                    <li>Go to Settings in the dashboard</li>
                    <li>Enter your OpenAI API key</li>
                    <li>Enter your Anthropic API key (optional)</li>
                    <li>Save your settings</li>
                  </ol>
                  <p className="text-muted-foreground mt-4">
                    Note: You can use either OpenAI or Anthropic for analysis. Anthropic is recommended for more detailed code analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Workspace Management */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Workspace Management</h2>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">Managing Your Workspaces</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Create and manage workspaces to organize your code analyses:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground ml-4">
                    <li>Create new workspaces for different projects</li>
                    <li>Save analyses to specific workspaces</li>
                    <li>Share workspaces with team members</li>
                    <li>Track progress across multiple projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3B82F6]/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Check out our detailed guides and examples to get the most out of neurolint.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              View All Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
