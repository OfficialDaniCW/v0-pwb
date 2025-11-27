import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Droplet,
  Home,
  TreeDeciduous,
  Shield,
  Sparkles,
  Zap,
  Flame,
  Paintbrush,
  Bug,
  Wind,
  Waves,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "PowerUps: Professional Chemical Range | PowerWash Bros",
  description:
    "Our professional chemical range featuring BAC50 biocides, surfactants, sodium hypochlorite, rust removers, graffiti solutions, and wood care products. Specialist treatments for Dorset properties.",
}

export default function PowerUpsPage() {
  const products = [
    {
      name: "PowerUps BAC50",
      subtitle: "HSE Licensed Biocide",
      icon: Shield,
      uses: "Moss, algae, lichen, fungi elimination",
      surfaces: "Roofs, walls, patios, driveways, render, stone",
      benefits: "Safe for all surfaces, long-lasting protection up to 18 months",
      description:
        "Our flagship HSE licensed biocide based on Benzalkonium Chloride 50%. BAC50 penetrates deep to kill organic growth at the root, not just the surface. Ideal for Purbeck's damp climate where moss and algae thrive.",
      linkedServices: ["/services/roof-cleaning", "/services/softwash", "/services/demossing"],
      category: "biocide",
    },
    {
      name: "PowerUps DDAC Pro",
      subtitle: "Solvent-Based Biocide",
      icon: Bug,
      uses: "Cold weather organic growth treatment",
      surfaces: "All exterior surfaces, heritage buildings",
      benefits: "Works in colder temperatures, fast-acting formula",
      description:
        "Professional-grade DDAC (Didecyldimethylammonium Chloride) biocide that's effective even in Dorset's winter months. Perfect for year-round property maintenance when temperatures drop below 5°C.",
      linkedServices: ["/services/heritage-buildings", "/services/softwash"],
      category: "biocide",
    },
    {
      name: "PowerUps Hypo-Clean",
      subtitle: "Sodium Hypochlorite Oxidiser",
      icon: Zap,
      uses: "Heavy organic soiling, black spots, algae blooms",
      surfaces: "Concrete, block paving, natural stone, render",
      benefits: "Rapid oxidation of organic matter, visible results within hours",
      description:
        "Label-compliant sodium hypochlorite cleaner with built-in surfactants and scent masking. Rapidly oxidises and removes heavy organic soiling while the added surfactants ensure thorough coverage and penetration into porous surfaces.",
      linkedServices: ["/services/driveway-cleaning", "/services/patio-decking", "/services/render-cleaning"],
      category: "oxidiser",
    },
    {
      name: "PowerUps Surf-Boost",
      subtitle: "Professional Surfactant",
      icon: Waves,
      uses: "Enhances chemical adhesion and spread",
      surfaces: "All surfaces - used as an additive",
      benefits: "Improved dwell time, better penetration, enhanced coverage",
      description:
        "High-quality surfactant that reduces surface tension, allowing cleaning solutions to spread evenly and penetrate deep into porous materials. Essential for vertical surfaces like render and walls where run-off reduces effectiveness.",
      linkedServices: ["/services/render-cleaning", "/services/exterior-walls", "/services/softwash"],
      category: "additive",
    },
    {
      name: "PowerUps Rust-Away",
      subtitle: "Specialist Rust Remover",
      icon: Flame,
      uses: "Rust stains, iron deposits, fertiliser marks",
      surfaces: "Stone, concrete, brick, block paving",
      benefits: "Dissolves rust without damaging underlying surface",
      description:
        "Powerful rust removal formula that targets deep-seated iron oxide stains. Essential for properties near metalwork, garden ornaments, or where lawn fertiliser has caused orange staining. Safe for use on most stone types when applied correctly.",
      linkedServices: ["/services/driveway-cleaning", "/services/patio-decking", "/services/heritage-buildings"],
      category: "specialist",
    },
    {
      name: "PowerUps Graffiti-Gone",
      subtitle: "Graffiti Removal System",
      icon: Paintbrush,
      uses: "Paint, marker, spray paint removal",
      surfaces: "Brick, render, stone, concrete, metal",
      benefits: "Removes without surface damage or ghosting",
      description:
        "Multi-stage graffiti removal system designed to tackle everything from marker pens to heavy spray paint. Our techniques remove graffiti without damaging the underlying surface or leaving shadow marks that make re-tagging easier.",
      linkedServices: ["/services/graffiti-removal", "/services/commercial"],
      category: "specialist",
    },
    {
      name: "PowerUps Driveway Revive",
      subtitle: "Heavy-Duty Surface Restorer",
      icon: Home,
      uses: "Oil stains, tyre marks, ingrained dirt, efflorescence",
      surfaces: "Block paving, concrete, tarmac, resin bond",
      benefits: "Restores original colour, removes deep stains",
      description:
        "Our most powerful driveway formula tackles stains that regular cleaning can't touch. Specially formulated for Dorset driveways that suffer from oil leaks, tyre marks, and the white salt deposits (efflorescence) common in coastal areas.",
      linkedServices: ["/services/driveway-cleaning", "/services/pressure-washing"],
      category: "surface",
    },
    {
      name: "PowerUps Soft Wash Pro",
      subtitle: "Gentle Cleaning Solution",
      icon: Droplet,
      uses: "Render, painted surfaces, delicate materials",
      surfaces: "K-rend, monocouche, painted masonry, cladding",
      benefits: "Gentle yet effective, no pressure damage",
      description:
        "Low-pressure cleaning solution designed for surfaces that can't withstand high-pressure washing. Perfect for modern render systems, painted facades, and heritage buildings where surface preservation is critical.",
      linkedServices: ["/services/softwash", "/services/render-cleaning", "/services/heritage-buildings"],
      category: "surface",
    },
    {
      name: "PowerUps Wood Care",
      subtitle: "Timber Treatment System",
      icon: TreeDeciduous,
      uses: "Decking, fencing, garden furniture, cladding",
      surfaces: "Softwood, hardwood, composite decking",
      benefits: "Cleans without bleaching, restores natural colour",
      description:
        "Specialist wood cleaning and restoration system that removes grey weathering, algae, and dirt without damaging wood fibres or stripping natural oils. Prepares surfaces perfectly for re-oiling or staining.",
      linkedServices: ["/services/patio-decking", "/services/residential"],
      category: "surface",
    },
    {
      name: "PowerUps Carbon Clear",
      subtitle: "Historic Building Cleaner",
      icon: Wind,
      uses: "Carbon sulphation, soot, pollution staining",
      surfaces: "Sandstone, limestone, brick, heritage stone",
      benefits: "Gentle on historic materials, removes centuries of grime",
      description:
        "Developed for Dorset's historic Purbeck stone buildings. Removes decades of carbon deposits, atmospheric pollution, and soot staining without damaging delicate historic surfaces or removing natural patina.",
      linkedServices: ["/services/heritage-buildings", "/services/softwash"],
      category: "heritage",
    },
  ]

  const categories = [
    { id: "biocide", name: "Biocides", description: "HSE licensed treatments that kill organic growth at the root" },
    { id: "oxidiser", name: "Oxidisers", description: "Powerful cleaners that rapidly break down organic matter" },
    { id: "surface", name: "Surface Cleaners", description: "Targeted solutions for specific surface types" },
    { id: "specialist", name: "Specialist Removers", description: "Solutions for specific stain types" },
    { id: "heritage", name: "Heritage Solutions", description: "Gentle formulas for historic buildings" },
    { id: "additive", name: "Additives", description: "Enhance the performance of other products" },
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">PowerUps</h1>
              <p className="text-2xl text-[#1E90FF] mb-4">Professional Chemical Range for Property Care</p>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                From HSE licensed biocides to specialist rust removers, our professional-grade chemical range tackles
                the toughest stains on Dorset properties
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#1E90FF] text-white font-semibold rounded-lg px-8 py-6
                             hover:bg-[#1E90FF]/90 hover:shadow-lg transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Get a Quote
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white font-semibold rounded-lg px-8 py-6
                             hover:bg-white/10 transition-all bg-transparent"
                >
                  <Link href="/services">View Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What Are PowerUps - Enhanced */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">What Are PowerUps?</h2>
              <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                <p>
                  PowerUps are our professional-grade chemical treatments developed specifically for exterior property
                  cleaning. Unlike off-the-shelf products, our range is formulated for the unique challenges faced by
                  Dorset properties - from coastal salt exposure to the damp conditions that encourage moss and algae
                  growth.
                </p>
                <p>
                  We use a combination of <strong className="text-white">HSE licensed biocides</strong>,{" "}
                  <strong className="text-white">label-compliant oxidisers</strong>, and{" "}
                  <strong className="text-white">specialist surface treatments</strong> to deliver results that last far
                  longer than conventional pressure washing alone. Each product is selected and applied based on the
                  specific surface type and staining present.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  "HSE licensed biocides",
                  "Trained application",
                  "Surface-specific formulas",
                  "Long-lasting results",
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

        {/* Product Categories Overview */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-4 text-center">Product Categories</h2>
              <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
                Different problems require different solutions. Our range covers every exterior cleaning challenge.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="glass-border rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#1E90FF] mb-2">{category.name}</h3>
                    <p className="text-white/70">{category.description}</p>
                    <p className="text-sm text-white/50 mt-3">
                      {products.filter((p) => p.category === category.id).length} products
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Full Product Range */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Complete Range</h2>

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
                      <p className="text-white/70 italic pt-4 border-t border-white/10">"{product.description}"</p>

                      {/* Service Links for SEO */}
                      <div className="pt-4">
                        <div className="text-sm text-white/60 mb-2">Used in our services:</div>
                        <div className="flex flex-wrap gap-2">
                          {product.linkedServices.map((service) => {
                            const serviceName = service
                              .split("/")
                              .pop()
                              ?.replace(/-/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())
                            return (
                              <Link
                                key={service}
                                href={service}
                                className="text-xs bg-[#1E90FF]/20 text-[#1E90FF] px-3 py-1 rounded-full hover:bg-[#1E90FF]/30 transition-colors"
                              >
                                {serviceName}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Biocides - Expanded */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Biocides & Oxidisers</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="glass-border rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-[#1E90FF] mb-4">How Biocides Work</h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Biocides like BAC50 and DDAC work by puncturing cell walls, causing cells to leak and eventually
                    die. This means they don't just remove visible growth - they eliminate the microscopic spores that
                    cause regrowth.
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Penetrates deep into surface pores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Kills organisms at cellular level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Provides months of protection</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-border rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-[#1E90FF] mb-4">How Oxidisers Work</h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Oxidisers like sodium hypochlorite rapidly oxidise organic matter, breaking down algae, mould, and
                    organic staining through chemical reaction. Results are often visible within hours.
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Fast-acting visible results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Effective on heavy soiling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Often combined with biocides for best results</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#0B1E3F]/40 rounded-xl p-6">
                <p className="text-white/90 font-semibold mb-4">Important: Moss Cannot Be Killed by Biocides</p>
                <p className="text-white/70">
                  A common misconception is that biocides kill moss. In reality, moss must be physically removed first
                  (by scraping or pressure washing), then biocide is applied to kill remaining spores and prevent
                  regrowth. This is why our{" "}
                  <Link href="/services/demossing" className="text-[#1E90FF] hover:underline">
                    demossing service
                  </Link>{" "}
                  combines mechanical removal with biocide treatment for lasting results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Training Matters */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Why Professional Training Matters</h2>
              <p className="text-white/80 leading-relaxed mb-8">
                PowerUps products are professional-grade chemicals that require proper training to use safely and
                effectively. The Health and Safety Executive (HSE) mandates that anyone using professional-use-only
                biocides receives appropriate training.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Correct dilution ratios for each surface type",
                  "Safe handling and PPE requirements",
                  "Environmental protection protocols",
                  "COSHH assessment and compliance",
                  "Surface identification and compatibility",
                  "Appropriate weather conditions for application",
                ].map((protocol) => (
                  <div key={protocol} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#00C853] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{protocol}</span>
                  </div>
                ))}
              </div>

              <div className="glass-border rounded-xl p-6">
                <p className="text-white/70">
                  Our team is fully biocide-trained and registered, ensuring every application is safe, effective, and
                  compliant. We understand that using the wrong chemical, at the wrong strength, on the wrong surface
                  can cause permanent damage - that's why we invest in ongoing training and certification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Linked Services Section for SEO */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4 text-center">Services Using PowerUps</h2>
              <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
                Our PowerUps range is integrated across all our services for superior results
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Roof Cleaning", href: "/services/roof-cleaning", products: "BAC50, Hypo-Clean" },
                  {
                    name: "Driveway Cleaning",
                    href: "/services/driveway-cleaning",
                    products: "Driveway Revive, Rust-Away",
                  },
                  { name: "Soft Washing", href: "/services/softwash", products: "Soft Wash Pro, BAC50" },
                  {
                    name: "Heritage Buildings",
                    href: "/services/heritage-buildings",
                    products: "Carbon Clear, DDAC Pro",
                  },
                  { name: "Render Cleaning", href: "/services/render-cleaning", products: "Soft Wash Pro, Surf-Boost" },
                  { name: "Patio & Decking", href: "/services/patio-decking", products: "Wood Care, Rust-Away" },
                  { name: "Graffiti Removal", href: "/services/graffiti-removal", products: "Graffiti-Gone system" },
                  { name: "Demossing", href: "/services/demossing", products: "BAC50, DDAC Pro" },
                ].map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="glass-border rounded-xl p-6 hover:bg-white/5 transition-colors group"
                  >
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#1E90FF] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-white/60">Uses: {service.products}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Want PowerUps Protection for Your Property?</h2>
              <p className="text-xl text-white/90 mb-8">
                Professional application by trained specialists across Swanage, Purbeck, and Dorset
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white font-bold rounded-lg px-12 py-8 text-xl
                             hover:bg-white/10 transition-all bg-transparent"
                >
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
