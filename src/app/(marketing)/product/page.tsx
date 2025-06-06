import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Zap, Shield, Sparkles } from "lucide-react";

export default function ProductPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden w-full bg-[#3B82F6]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">AI-Powered Code Review</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 sm:mb-10">
              Enhance your code quality with intelligent analysis and suggestions
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <Code2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms analyze your code for potential issues, security vulnerabilities, and performance optimizations.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-muted-foreground">
                Get instant feedback as you code, with suggestions for improvements and best practices.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security First</h3>
              <p className="text-muted-foreground">
                Identify security vulnerabilities and get recommendations for secure coding practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3B82F6]/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to improve your code quality?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Join thousands of developers who trust neurolint for their code reviews.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 