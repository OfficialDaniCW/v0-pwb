import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DiscountSignupModal } from "@/components/discount-signup-modal"

export function PowerUpsIntro() {
  const features = [
    "Developed for UK properties",
    "Safe for people, pets & plants (when used correctly)",
    "Long-lasting protection",
    "Professional strength",
  ]

  return (
    <section className="py-24 bg-primary/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">PowerUps: Our Professional Chemical Range</h2>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                We've developed our own range of professional-grade cleaning solutions, specifically formulated for
                Dorset's unique climate and property types. From biocide treatments to specialist surface cleaners,
                PowerUps delivers results that last.
              </p>

              <div className="space-y-3 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="text-accent-foreground font-semibold rounded-lg px-8 py-6
                           hover:shadow-lg transition-all"
                style={{
                  backgroundColor: 'var(--accent)',
                }}
              >
                <Link href="/powerups">Learn About PowerUps</Link>
              </Button>

              {/* CTA for Online Discounts */}
              <div className="mt-12 pt-8 border-t border-foreground/10">
                <p className="text-sm font-medium text-foreground/70 mb-3 uppercase tracking-wide">Exclusive Offer</p>
                <div className="bg-gradient-to-r from-accent/20 to-success/20 rounded-xl p-6 border border-accent/30">
                  <h3 className="text-xl font-bold text-foreground mb-2">Unlock Online Discounts on PowerUps</h3>
                  <p className="text-foreground/80 mb-4">
                    Join our mailing list and receive exclusive discounts on professional-grade cleaning solutions delivered direct to your door.
                  </p>
                  <DiscountSignupModal />
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="glass-border rounded-2xl p-8 bg-gradient-to-br from-accent/10 to-transparent">
              <div className="relative aspect-square flex items-center justify-center">
                <Image
                  src="/images/powerups-products.png"
                  alt="PowerUps Professional Chemical Range - Surfactant, Hypo 14-15%, Decking Cleaner, and Algae Away"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
