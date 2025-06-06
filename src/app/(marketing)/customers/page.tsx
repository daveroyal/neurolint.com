import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "TechCorp",
    image: "/avatars/sarah.jpg",
    content: "neurolint has transformed our code review process. The AI suggestions are spot-on and have helped us catch issues before they reach production.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    company: "StartupX",
    image: "/avatars/michael.jpg",
    content: "The real-time feedback and security analysis have been invaluable for our team. We've seen a significant reduction in bugs and security issues.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Lead Developer",
    company: "DevCo",
    image: "/avatars/emily.jpg",
    content: "As a team lead, I appreciate how neurolint helps maintain code quality across our projects. The performance suggestions have been particularly helpful.",
    rating: 5
  }
];

const caseStudies = [
  {
    title: "Reducing Bug Reports by 40%",
    company: "TechCorp",
    description: "How TechCorp improved code quality and reduced production issues using neurolint's AI-powered analysis.",
    image: "/case-studies/techcorp.jpg"
  },
  {
    title: "Accelerating Development Speed",
    company: "StartupX",
    description: "StartupX's journey to faster development cycles and better code quality with neurolint.",
    image: "/case-studies/startupx.jpg"
  },
  {
    title: "Enhancing Security Posture",
    company: "DevCo",
    description: "How DevCo strengthened their security practices using neurolint's vulnerability detection.",
    image: "/case-studies/devco.jpg"
  }
];

export default function CustomersPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-38 pb-24 overflow-hidden w-full bg-[#3B82F6]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Trusted by Developers Worldwide</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 sm:mb-10">
              See how teams are using neurolint to improve their code quality
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-[#3B82F6]/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="rounded-lg border bg-card overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{study.company}</p>
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <Button variant="ghost" className="p-0 h-auto">
                    Read Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Start improving your code quality today with neurolint
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 