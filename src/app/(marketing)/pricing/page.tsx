import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out neurolint',
    features: [
      'Up to 10 code analyses per month',
      'Basic security checks',
      'Performance analysis',
      'Code quality suggestions',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professional developers and teams',
    features: [
      'Unlimited code analyses',
      'Advanced security checks',
      'Detailed performance analysis',
      'Code quality suggestions',
      'Priority support',
      'Team collaboration',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'default' as const,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'On-premise deployment',
      'Custom AI models',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline' as const,
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative pt-38 pb-24 overflow-hidden w-full bg-[#3B82F6]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Choose the plan that&apos;s right for you
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <Card key={tier.name} className="flex flex-col shadow-lg border border-border bg-card/90 dark:bg-card/60">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    {tier.price !== 'Custom' && (
                      <span className="text-muted-foreground ml-1">/month</span>
                    )}
                  </div>
                  <CardDescription className="mt-4 text-base">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={tier.buttonVariant}
                    className="w-full text-base font-semibold py-3"
                    size="lg"
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 