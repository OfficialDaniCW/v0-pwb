import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Droplet, Home, TreeDeciduous, Shield, Sparkles } from 'lucide-react'

export const metadata = {
  title: "PowerUps: Professional Chemical Range | PowerWash Bros",
  description: "Our professional chemical range designed to tackle the toughest stains on Purbeck properties. Specialized biocide treatments for long-lasting results.",
}

export default function PowerUpsPage() {
  const products = [
    {
      name: "PowerUps Bio-Clean",
      subtitle: "Biocide Treatment",
      icon: Shield,
      uses: "Moss, algae, lichen removal",
      surfaces: "Roofs, walls, patios, driveways",
      benefits: "Long-term organic growth prevention",
      description: "Our flagship biocide treatment tackles the toughest organic stains and prevents regrowth for months."
    },
    {
      name: "PowerUps Soft Wash",
      subtitle: "Gentle Cleaning",
      icon: Droplet,
      uses: "Render, painted surfaces, delicate materials",
      surfaces: "Exterior walls, cladding, heritage buildings",
      benefits: "Gentle yet effective cleaning",
      description: "Specialized approach for surfaces that require gentle treatment while still achieving deep cleaning."
    },
    {
      name: "PowerUps Driveway Revive",
      subtitle: "Heavy-Duty Cleaner",
      icon: Home,
      uses: "Heavy-duty surface cleaning",
      surfaces: "Block paving, concrete, tarmac",
      benefits: "Removes oil, tire marks, deep stains",
      description: "Our most powerful formula tackles the toughest driveway stains that regular washing can't touch."
    },
    {
      name: "PowerUps Wood Care",
      subtitle: "Wood Treatment",
      icon: TreeDeciduous,
      uses: "Decking, garden furniture, fencing",
      surfaces: "All wood types",
      benefits: "Cleans without bleaching or damaging wood fibers",
      description: "Specialized wood treatment that restores natural beauty while protecting against future deterioration."
    }
  ]

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0B1E3F] to-[#0B1E3F]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-8 mx-auto">
                <Sparkles className="h-12 w-12 text-[#1E90FF]" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                PowerUps
              </h1>
              <p className="text-2xl text-[#1E90FF] mb-4">
                Chemicals Designed to Tackle the Toughest Stains
              </p>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Our professional chemical range uses specialized biocide treatments and approaches to get the best results for Purbeck properties
              </p>
            </div>
          </div>
        </section>

        {/* What Are PowerUps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">What Are PowerUps?</h2>
              <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                <p>
                  PowerUps are our professional-grade chemical treatments designed to tackle the toughest stains and organic growth 
                  on properties across Swanage and Purbeck. We use a range of different chemicals and specialized approaches to get 
                  the best results for each unique situation.
                </p>
                <p>
                  Unlike basic pressure washing alone, our PowerUps range penetrates deep to eliminate stains at their source and 
                  prevents regrowth, delivering results that last far longer than conventional cleaning.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  "Biocide-based formulations",
                  "Tested on UK surfaces",
                  "Safe when applied correctly",
                  "Professional strength"
                ].map((benefit) => (
                  <div key={benefit} className="flex flex-col items-center text-center p-6 glass-border rounded-xl">
                    <CheckCircle2 className="h-10 w-10 text-[#00C853] mb-3" />
                    <p className="text-white/90">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Range */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Product Range</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {products.map((product) => (
                  <div key={product.name} className="glass-border-enhanced rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20">
                        <product.icon className="h-8 w-8 text-[#1E90FF]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                        <p className="text-[#1E90FF]">{product.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Primary Use:</div>
                        <div className="text-white/90">{product.uses}</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/60 mb-1">Surfaces:</div>
                        <div className="text-white/90">{product.surfaces}</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/60 mb-1">Benefits:</div>
                        <div className="text-white/90">{product.benefits}</div>
                      </div>
                      <p className="text-white/70 italic pt-4 border-t border-white/10">
                        "{product.description}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why PowerUps Matter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Why PowerUps Matter</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#1E90FF]/20 mb-4">01</div>
                  <h3 className="text-xl font-bold text-white mb-4">Tackles Tough Stains</h3>
                  <p className="text-white/70">
                    We use specialized chemicals for different stain types - from oil and algae to moss and lichen. Each 
                    PowerUp formula is designed to penetrate and eliminate specific problems that pressure washing alone can't solve.
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-[#1E90FF]/20 mb-4">02</div>
                  <h3 className="text-xl font-bold text-white mb-4">Long-Term Results</h3>
                  <p className="text-white/70">
                    Regular pressure washing removes surface dirt. PowerUps treatments work at a deeper level, killing organic 
                    growth at the root and preventing it from returning. Results that last months, not weeks.
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-[#1E90FF]/20 mb-4">03</div>
                  <h3 className="text-xl font-bold text-white mb-4">Professional Application</h3>
                  <p className="text-white/70">
                    Our team is biocide-trained and PASMA-certified, meaning we understand how to use powerful chemicals safely 
                    and effectively. The right chemical, at the right strength, applied the right way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Science */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">How Our Biocide Treatments Work</h2>
              <div className="glass-border rounded-2xl p-8">
                <p className="text-white/80 leading-relaxed mb-6">
                  Biocides are powerful substances that control or eliminate organic organisms like moss, algae, and lichen. 
                  Unlike simple pressure washing that removes surface growth, our biocide treatments attack the problem at its source.
                </p>
                
                <div className="bg-[#0B1E3F]/40 rounded-xl p-6 space-y-3">
                  <p className="text-white/90 font-semibold mb-4">When we apply PowerUps Bio-Clean:</p>
                  {[
                    "Penetrates deep into surface pores and cracks",
                    "Targets and eliminates organic growth (moss, algae, lichen)",
                    "Destroys spores that cause regrowth",
                    "Continues working for months after application",
                    "Naturally biodegrades without environmental harm"
                  ].map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E90FF]/20 text-[#1E90FF] font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-white/80">{step}</p>
                    </div>
                  ))}
                </div>

                <p className="text-white/70 italic mt-6">
                  This is why properties treated with PowerUps stay cleaner for longer - we're not just cleaning the surface, 
                  we're eliminating the root cause of the problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Environmental Responsibility */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Safe & Responsible Use</h2>
              <p className="text-white/80 leading-relaxed mb-8">
                PowerUps products are powerful, which is why we're trained in their safe use. We follow strict protocols:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Never use biocides unnecessarily - water first approach",
                  "Always protect plants, pets, and drainage systems",
                  "Use correct dilution ratios for each surface",
                  "Apply in appropriate weather conditions",
                  "Provide aftercare advice to homeowners",
                  "Dispose of waste water responsibly"
                ].map((protocol) => (
                  <div key={protocol} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#00C853] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{protocol}</span>
                  </div>
                ))}
              </div>

              <p className="text-white/70 mt-8 p-6 glass-border rounded-xl">
                Our biocide training ensures we know not just how to clean, but how to clean safely and responsibly.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Want PowerUps Protection for Your Property?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Serving Swanage, Purbeck, and surrounding areas
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
