import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const blogPosts = [
  {
    title: "The Future of AI-Powered Code Review",
    excerpt: "Exploring how artificial intelligence is transforming the way we review and maintain code quality.",
    author: {
      name: "Alex Johnson",
      role: "AI Researcher",
      image: "/avatars/alex.jpg"
    },
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/blog/ai-code-review.jpg",
    category: "AI & Machine Learning"
  },
  {
    title: "Best Practices for Secure Coding",
    excerpt: "Learn essential security practices and how to implement them in your development workflow.",
    author: {
      name: "Sarah Chen",
      role: "Security Expert",
      image: "/avatars/sarah.jpg"
    },
    date: "March 12, 2024",
    readTime: "7 min read",
    image: "/blog/secure-coding.jpg",
    category: "Security"
  },
  {
    title: "Optimizing Performance in Modern Web Apps",
    excerpt: "A comprehensive guide to improving performance in your web applications.",
    author: {
      name: "Michael Rodriguez",
      role: "Performance Engineer",
      image: "/avatars/michael.jpg"
    },
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "/blog/web-performance.jpg",
    category: "Performance"
  },
  {
    title: "The Rise of AI Development Tools",
    excerpt: "How AI tools are changing the landscape of software development.",
    author: {
      name: "Emily Thompson",
      role: "Tech Lead",
      image: "/avatars/emily.jpg"
    },
    date: "March 8, 2024",
    readTime: "4 min read",
    image: "/blog/ai-tools.jpg",
    category: "Development"
  }
];

const categories = [
  "All Posts",
  "AI & Machine Learning",
  "Security",
  "Performance",
  "Development",
  "Best Practices"
];

export default function BlogPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden w-full bg-[#3B82F6]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">neurolint blog</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 sm:mb-10">
              Insights, tutorials, and best practices for modern development
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "ghost"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="rounded-lg border bg-card overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h2>
                  <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.image} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#3B82F6]/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Subscribe to our newsletter for the latest insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border bg-background"
              />
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 