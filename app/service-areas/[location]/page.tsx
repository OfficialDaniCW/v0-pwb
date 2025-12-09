import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone, MapPin, Star, ArrowRight, Droplets, Home, Building2, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

// Location data with SEO content
const LOCATIONS: Record<
  string,
  {
    name: string
    county: string
    postcode: string
    description: string
    population?: string
    nearbyAreas: string[]
    landmarks?: string[]
    challenges?: string[]
  }
> = {
  swanage: {
    name: "Swanage",
    county: "Dorset",
    postcode: "BH19",
    description:
      "A beautiful coastal town on the Isle of Purbeck, known for its Victorian pier, sandy beach, and stunning Jurassic Coast location.",
    population: "10,454",
    nearbyAreas: ["Corfe Castle", "Studland", "Langton Matravers", "Worth Matravers", "Wareham"],
    landmarks: ["Swanage Pier", "Durlston Castle", "Swanage Railway"],
    challenges: [
      "Salt spray damage from coastal location",
      "Stone buildings requiring specialist care",
      "Victorian properties with period features",
    ],
  },
  "corfe-castle": {
    name: "Corfe Castle",
    county: "Dorset",
    postcode: "BH20",
    description:
      "Historic village dominated by the ruins of Corfe Castle, featuring beautiful Purbeck stone cottages and a thriving local community.",
    nearbyAreas: ["Swanage", "Wareham", "Church Knowle", "Kingston", "Studland"],
    landmarks: ["Corfe Castle ruins", "The Square", "Purbeck stone cottages"],
    challenges: [
      "Heritage buildings requiring gentle cleaning",
      "Purbeck stone maintenance",
      "Conservation area restrictions",
    ],
  },
  wareham: {
    name: "Wareham",
    county: "Dorset",
    postcode: "BH20",
    description: "Ancient Saxon walled town at the gateway to Purbeck, surrounded by rivers and heathland.",
    population: "6,000",
    nearbyAreas: ["Swanage", "Corfe Castle", "Wool", "Stoborough", "Poole"],
    landmarks: ["Saxon walls", "River Frome", "Wareham Quay"],
    challenges: ["River proximity causing damp issues", "Historic buildings", "Clay soil staining"],
  },
  bournemouth: {
    name: "Bournemouth",
    county: "Dorset",
    postcode: "BH1-BH11",
    description:
      "Major coastal resort town with Victorian architecture, beautiful gardens, and seven miles of sandy beaches.",
    population: "187,503",
    nearbyAreas: ["Poole", "Christchurch", "Boscombe", "Southbourne", "Winton"],
    landmarks: ["Bournemouth Pier", "Lower Gardens", "Russell-Cotes Museum"],
    challenges: ["Coastal salt damage", "Victorian and Edwardian properties", "High-density housing"],
  },
  poole: {
    name: "Poole",
    county: "Dorset",
    postcode: "BH12-BH17",
    description: "Historic port town with Europe's largest natural harbour, featuring Sandbanks and vibrant quayside.",
    population: "151,500",
    nearbyAreas: ["Bournemouth", "Wimborne", "Wareham", "Sandbanks", "Broadstone"],
    landmarks: ["Poole Harbour", "Sandbanks", "Poole Quay", "Brownsea Island"],
    challenges: ["Marine salt spray", "Harbour-side properties", "Mix of historic and modern buildings"],
  },
  weymouth: {
    name: "Weymouth",
    county: "Dorset",
    postcode: "DT3-DT4",
    description: "Traditional seaside resort with Georgian esplanade, golden beach, and historic harbour.",
    population: "53,068",
    nearbyAreas: ["Portland", "Dorchester", "Chickerell", "Osmington"],
    landmarks: ["Weymouth Beach", "Nothe Fort", "Jurassic Skyline Tower"],
    challenges: ["Coastal erosion and salt damage", "Georgian architecture", "Sand ingress"],
  },
  dorchester: {
    name: "Dorchester",
    county: "Dorset",
    postcode: "DT1",
    description:
      "County town of Dorset with Roman origins, Thomas Hardy connections, and beautiful Georgian architecture.",
    population: "20,000",
    nearbyAreas: ["Weymouth", "Poundbury", "Cerne Abbas", "Maiden Newton"],
    landmarks: ["Maiden Castle", "Dorset County Museum", "Poundbury"],
    challenges: ["Historic buildings", "Conservation requirements", "Roman archaeology considerations"],
  },
  christchurch: {
    name: "Christchurch",
    county: "Dorset",
    postcode: "BH23",
    description:
      "Historic market town at the confluence of the Rivers Avon and Stour, featuring a magnificent Norman priory.",
    population: "50,000",
    nearbyAreas: ["Bournemouth", "New Milton", "Highcliffe", "Mudeford"],
    landmarks: ["Christchurch Priory", "Christchurch Harbour", "Mudeford Quay"],
    challenges: ["River flooding history", "Historic priory area", "Coastal proximity"],
  },
  wimborne: {
    name: "Wimborne Minster",
    county: "Dorset",
    postcode: "BH21",
    description: "Charming market town famous for its Minster church and traditional Friday market.",
    nearbyAreas: ["Ferndown", "Poole", "Blandford Forum", "Verwood"],
    landmarks: ["Wimborne Minster", "Model Town", "Deans Court"],
    challenges: ["Historic buildings", "Traditional stone and brick construction"],
  },
  studland: {
    name: "Studland",
    county: "Dorset",
    postcode: "BH19",
    description: "Beautiful coastal village with National Trust beaches and stunning views of Old Harry Rocks.",
    nearbyAreas: ["Swanage", "Sandbanks", "Corfe Castle"],
    landmarks: ["Studland Beach", "Old Harry Rocks", "Agglestone Rock"],
    challenges: ["Exposed coastal location", "Salt and sand damage", "National Trust conservation area"],
  },
  wool: {
    name: "Wool",
    county: "Dorset",
    postcode: "BH20",
    description: "Historic village near Bovington Tank Museum, gateway to the Purbeck heathlands.",
    nearbyAreas: ["Wareham", "Bovington", "Lulworth", "Winfrith"],
    landmarks: ["Woolbridge Manor", "Bovington Tank Museum", "Monkey World"],
    challenges: ["Rural properties", "Agricultural dirt and debris", "Traditional construction"],
  },
  portland: {
    name: "Portland",
    county: "Dorset",
    postcode: "DT5",
    description:
      "Distinctive limestone isle connected to Weymouth, famous for Portland Stone and Olympic sailing venue.",
    population: "13,000",
    nearbyAreas: ["Weymouth", "Fortuneswell", "Easton"],
    landmarks: ["Portland Bill", "Portland Castle", "Chesil Beach"],
    challenges: ["Exposed maritime location", "Portland Stone buildings", "Extreme weather exposure"],
  },
  ferndown: {
    name: "Ferndown",
    county: "Dorset",
    postcode: "BH22",
    description: "Modern town on the edge of the New Forest with excellent amenities and golf courses.",
    population: "27,000",
    nearbyAreas: ["Wimborne", "Bournemouth", "Verwood", "West Moors"],
    landmarks: ["Ferndown Golf Club", "Stapehill Abbey"],
    challenges: ["Modern housing estates", "Pine tree debris", "Heathland soil staining"],
  },
  "blandford-forum": {
    name: "Blandford Forum",
    county: "Dorset",
    postcode: "DT11",
    description:
      "Georgian market town rebuilt after a devastating fire in 1731, featuring beautiful uniform architecture.",
    nearbyAreas: ["Wimborne", "Shaftesbury", "Sturminster Newton"],
    landmarks: ["Blandford Church", "Georgian Town Centre", "Blandford Camp"],
    challenges: ["Georgian architecture requiring care", "Historic town centre", "Conservation requirements"],
  },
  lulworth: {
    name: "Lulworth",
    county: "Dorset",
    postcode: "BH20",
    description: "Famous for the iconic Lulworth Cove and Durdle Door, a UNESCO World Heritage coastal area.",
    nearbyAreas: ["Wareham", "Wool", "West Lulworth", "East Lulworth"],
    landmarks: ["Lulworth Cove", "Durdle Door", "Lulworth Castle"],
    challenges: ["Coastal erosion", "Tourism traffic", "Heritage properties"],
  },
  "isle-of-purbeck": {
    name: "Isle of Purbeck",
    county: "Dorset",
    postcode: "BH19-BH20",
    description: "Peninsula of outstanding natural beauty, home to Swanage, Corfe Castle, and the Jurassic Coast.",
    nearbyAreas: ["Swanage", "Corfe Castle", "Wareham", "Studland", "Worth Matravers"],
    landmarks: ["Corfe Castle", "Jurassic Coast", "Purbeck stone quarries"],
    challenges: ["Purbeck stone buildings", "Coastal and rural mix", "Conservation requirements"],
  },
}

const SERVICES = [
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    icon: Droplets,
    description: "Prevent water damage with professional gutter clearing",
  },
  {
    slug: "roof-cleaning",
    name: "Roof Cleaning",
    icon: Home,
    description: "Moss removal and biocide treatment for lasting protection",
  },
  {
    slug: "driveway-cleaning",
    name: "Driveway Cleaning",
    icon: Sparkles,
    description: "Pressure washing to restore your driveway's appearance",
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    icon: Droplets,
    description: "High-powered cleaning for hard surfaces",
  },
  {
    slug: "softwash",
    name: "Soft Washing",
    icon: Sparkles,
    description: "Gentle cleaning for render, cladding and delicate surfaces",
  },
  {
    slug: "patio-cleaning",
    name: "Patio Cleaning",
    icon: Home,
    description: "Restore your patio to its original beauty",
  },
  {
    slug: "render-cleaning",
    name: "Render Cleaning",
    icon: Building2,
    description: "Specialist K-Rend and render soft washing",
  },
  { slug: "window-cleaning", name: "Window Cleaning", icon: Sparkles, description: "Crystal clear windows and frames" },
]

type Props = {
  params: Promise<{ location: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params
  const locationData = LOCATIONS[location]

  if (!locationData) {
    return { title: "Location Not Found" }
  }

  const title = `Exterior Cleaning Services in ${locationData.name} | PowerWash Bros`
  const description = `Professional pressure washing, gutter cleaning, roof cleaning & exterior maintenance in ${locationData.name}, ${locationData.county}. Serving ${locationData.nearbyAreas.slice(0, 3).join(", ")} & surrounding areas. Free quotes. ☎ 07418 610731`

  return {
    title,
    description,
    keywords: [
      `pressure washing ${locationData.name.toLowerCase()}`,
      `gutter cleaning ${locationData.name.toLowerCase()}`,
      `roof cleaning ${locationData.name.toLowerCase()}`,
      `driveway cleaning ${locationData.name.toLowerCase()}`,
      `exterior cleaning ${locationData.name.toLowerCase()}`,
      `${locationData.name.toLowerCase()} property maintenance`,
      `powerwash ${locationData.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_GB",
      url: `https://powerwashbros.co.uk/service-areas/${location}`,
    },
    alternates: {
      canonical: `https://powerwashbros.co.uk/service-areas/${location}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((location) => ({ location }))
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params
  const locationData = LOCATIONS[location]

  if (!locationData) {
    notFound()
  }

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PowerWash Bros",
    description: `Professional exterior cleaning services in ${locationData.name}, ${locationData.county}`,
    url: `https://powerwashbros.co.uk/service-areas/${location}`,
    telephone: "+447418610731",
    email: "info@powerwashbros.co.uk",
    address: {
      "@type": "PostalAddress",
      addressLocality: locationData.name,
      addressRegion: locationData.county,
      postalCode: locationData.postcode,
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "City",
      name: locationData.name,
    },
    priceRange: "££",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://powerwashbros.co.uk" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://powerwashbros.co.uk/service-areas" },
      { "@type": "ListItem", position: 3, name: locationData.name },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-[100dvh] bg-[#0B1E3F] text-white">
        <SiteHeader />

        {/* Hero Section */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="text-sm text-white/60 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#1E90FF]">
                    Home
                  </Link>
                </li>
                <span>/</span>
                <li>
                  <Link href="/service-areas" className="hover:text-[#1E90FF]">
                    Service Areas
                  </Link>
                </li>
                <span>/</span>
                <li className="text-white" aria-current="page">
                  {locationData.name}
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E90FF]/20 rounded-full text-[#1E90FF] text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Serving {locationData.postcode} & Surrounding Areas
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Exterior Cleaning in <span className="text-[#1E90FF]">{locationData.name}</span>
              </h1>

              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                {locationData.description} PowerWash Bros provides professional pressure washing, gutter cleaning, roof
                cleaning, and exterior maintenance services throughout {locationData.name} and{" "}
                {locationData.nearbyAreas.slice(0, 3).join(", ")}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white min-h-[48px]">
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 min-h-[48px] bg-transparent"
                >
                  <a href="tel:07418610731" aria-label="Call PowerWash Bros on 07418 610731">
                    <Phone className="h-5 w-5 mr-2" />
                    07418 610731
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Our Services in {locationData.name}</h2>
            <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
              Professional exterior cleaning tailored to the unique needs of {locationData.name} properties
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}/${location}`} className="group">
                  <Card className="bg-[#0F2851] border-white/10 hover:border-[#1E90FF]/50 transition-all h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-[#1E90FF]/20 flex items-center justify-center mb-4 group-hover:bg-[#1E90FF]/30 transition-colors">
                        <service.icon className="h-6 w-6 text-[#1E90FF]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#1E90FF] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">{service.description}</p>
                      <span className="text-[#1E90FF] text-sm font-medium inline-flex items-center gap-1">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Local Challenges */}
        {locationData.challenges && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-3xl font-bold mb-8">Why {locationData.name} Properties Need Professional Cleaning</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {locationData.challenges.map((challenge, i) => (
                  <Card key={i} className="bg-[#0F2851] border-white/10">
                    <CardContent className="p-6">
                      <CheckCircle className="h-8 w-8 text-[#1E90FF] mb-4" />
                      <p className="text-white">{challenge}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust Signals */}
        <section className="py-16 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-white">4.9/5</p>
                <p className="text-white/60">Customer Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1E90FF]">500+</p>
                <p className="text-white/60">Jobs Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1E90FF]">100%</p>
                <p className="text-white/60">Fully Insured</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1E90FF]">Free</p>
                <p className="text-white/60">No-Obligation Quotes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-6">Also Serving Areas Near {locationData.name}</h2>
            <div className="flex flex-wrap gap-3">
              {locationData.nearbyAreas.map((area) => {
                const areaSlug = area.toLowerCase().replace(/\s+/g, "-")
                const areaExists = LOCATIONS[areaSlug]
                return areaExists ? (
                  <Link
                    key={area}
                    href={`/service-areas/${areaSlug}`}
                    className="px-4 py-2 bg-[#0F2851] border border-white/10 rounded-lg text-white/80 hover:text-[#1E90FF] hover:border-[#1E90FF]/50 transition-all min-h-[48px] flex items-center"
                  >
                    {area}
                  </Link>
                ) : (
                  <span key={area} className="px-4 py-2 bg-[#0F2851] border border-white/10 rounded-lg text-white/60">
                    {area}
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1E90FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your {locationData.name} Property?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Get a free, no-obligation quote today. We typically respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-[#1E90FF] hover:bg-white/90 min-h-[48px]">
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 min-h-[48px] bg-transparent"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
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
