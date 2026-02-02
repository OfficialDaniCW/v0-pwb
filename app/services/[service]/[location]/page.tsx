import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, MapPin, Phone, Mail } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

// Service definitions with SEO content
const servicesData: Record<
  string,
  {
    name: string
    description: string
    benefits: string[]
    process: string[]
    priceRange: string
  }
> = {
  "gutter-cleaning": {
    name: "Gutter Cleaning",
    description:
      "Professional gutter cleaning to prevent water damage, damp, and costly repairs. We clear all debris, flush downpipes, and provide photo evidence of completed work.",
    benefits: [
      "Prevents water damage to walls and foundations",
      "Stops damp and mould problems",
      "Extends gutter lifespan",
      "Photo evidence provided",
      "Fully insured service",
    ],
    process: [
      "Full gutter inspection",
      "Complete debris removal",
      "Downpipe flushing",
      "Water flow test",
      "Before/after photos",
    ],
    priceRange: "£90-£150", // £6/m for typical 15-25m gutter
  },
  "roof-cleaning": {
    name: "Roof Cleaning",
    description:
      "Expert roof moss removal and soft washing. We're PASMA qualified and biocide trained, using professional methods for long-lasting results.",
    benefits: [
      "Professional soft washing method",
      "PASMA qualified team",
      "Moss & algae removal",
      "Long-lasting results",
      "Fully insured service",
    ],
    process: [
      "Roof inspection & assessment",
      "Soft washing application",
      "Moss & algae removal",
      "Optional biocide treatment",
      "Final inspection & photos",
    ],
    priceRange: "£900-£1,350", // £9/m² for typical 100-150m² roof (excludes scaffolding/biocide)
  },
  "patio-cleaning": {
    name: "Patio & Decking Cleaning",
    description:
      "Transform your outdoor space with our professional patio and decking cleaning service. We remove dirt, algae, moss, and stubborn stains.",
    benefits: [
      "Deep pressure cleaning",
      "Removes algae & moss",
      "Slip hazard elimination",
      "Restores original colour",
      "Optional re-sanding for block paving",
    ],
    process: [
      "Pre-treatment application",
      "High-pressure cleaning",
      "Weed & moss removal",
      "Final rinse & inspection",
      "Optional sand re-application",
    ],
    priceRange: "£60-£120", // £3/m² for typical 20-40m² patio (excludes sealing)
  },
  "driveway-cleaning": {
    name: "Driveway Cleaning",
    description:
      "Professional driveway cleaning service for all surface types including block paving, concrete, tarmac, and natural stone.",
    benefits: [
      "Removes oil stains & dirt",
      "Improves kerb appeal",
      "Prevents surface degradation",
      "All surface types cleaned",
      "Optional re-sanding for block paving",
    ],
    process: [
      "Surface type assessment",
      "Pre-treatment of stains",
      "Professional pressure washing",
      "Detailed edge & corner cleaning",
      "Optional kiln-dried sand re-application",
    ],
    priceRange: "£90-£150", // £3/m² for typical 30-50m² driveway
  },
  "walls-cleaning": {
    name: "Exterior Wall Cleaning",
    description:
      "Gentle yet effective exterior wall cleaning for render, brick, stone, and painted surfaces. Remove years of dirt, algae, and pollution.",
    benefits: [
      "Gentle soft wash method",
      "Safe for all surface types",
      "Removes algae & pollution",
      "Restores property appearance",
      "Long-lasting clean",
    ],
    process: [
      "Surface assessment",
      "Soft wash application",
      "Gentle cleaning process",
      "Full property rinse",
      "Final inspection",
    ],
    priceRange: "£240-£600", // £3/m² for typical 80-200m² wall area
  },
  "decking-cleaning": {
    name: "Decking Cleaning",
    description:
      "Specialist decking cleaning to restore and protect your outdoor timber. We use wood-safe cleaning methods to prevent damage.",
    benefits: [
      "Wood-safe cleaning methods",
      "Removes algae & mould",
      "Prevents wood rot",
      "Restores natural colour",
      "Optional re-oiling service",
    ],
    process: [
      "Wood condition assessment",
      "Gentle cleaning application",
      "Low-pressure washing",
      "Wood fibre restoration",
      "Optional protective treatment",
    ],
    priceRange: "£60-£180", // £3/m² for typical 20-60m² deck
  },
  "commercial-property-cleaning": {
    name: "Commercial Property Cleaning",
    description:
      "Professional exterior cleaning services for commercial properties, retail units, offices, and industrial buildings.",
    benefits: [
      "Minimal business disruption",
      "Flexible scheduling",
      "Health & safety compliant",
      "Regular maintenance contracts",
      "Fully insured service",
    ],
    process: [
      "Site survey & risk assessment",
      "Scheduled service delivery",
      "Professional equipment",
      "Waste disposal included",
      "Service completion report",
    ],
    priceRange: "£300-£2,000", // Commercial rates vary significantly
  },
  softwash: {
    name: "Softwash Treatment",
    description:
      "Advanced softwash biocide treatment for render, roofs, and exterior surfaces. Long-lasting protection against algae and organic growth.",
    benefits: [
      "Long-lasting protection",
      "Safe for delicate surfaces",
      "Kills algae & bacteria",
      "Prevents regrowth",
      "Eco-friendly solutions",
    ],
    process: [
      "Surface preparation",
      "Professional biocide application",
      "Dwell time for effectiveness",
      "Gentle rinse process",
      "Follow-up care advice",
    ],
    priceRange: "£150-£400", // £5/m² for typical 30-80m² softwash treatment
  },
}

// Location definitions
const LOCATIONS: Record<
  string,
  {
    name: string
    county: string
    description: string
    nearbyAreas: string[]
    postcode: string
  }
> = {
  swanage: {
    name: "Swanage",
    county: "Dorset",
    description:
      "Swanage's coastal location means properties face unique challenges from salt air, high humidity, and rapid moss growth. Our local team understands these conditions.",
    nearbyAreas: ["Studland", "Langton Matravers", "Worth Matravers", "Corfe Castle", "Herston"],
    postcode: "BH19",
  },
  purbeck: {
    name: "Purbeck",
    county: "Dorset",
    description:
      "The Isle of Purbeck's mix of coastal and rural properties requires specialist knowledge. From Swanage to Wareham, we serve all Purbeck communities.",
    nearbyAreas: ["Swanage", "Wareham", "Corfe Castle", "Studland", "Kimmeridge", "Lulworth"],
    postcode: "BH19-BH20",
  },
  wareham: {
    name: "Wareham",
    county: "Dorset",
    description:
      "Historic Wareham properties need careful treatment. We're experienced with heritage buildings and modern homes alike in this beautiful market town.",
    nearbyAreas: ["Stoborough", "Arne", "Holton Heath", "Sandford", "Wool"],
    postcode: "BH20",
  },
  "corfe-castle": {
    name: "Corfe Castle",
    county: "Dorset",
    description:
      "Corfe Castle village is full of character properties including Purbeck stone cottages. We use gentle techniques appropriate for historic buildings.",
    nearbyAreas: ["Church Knowle", "Kingston", "Langton Matravers", "Harmans Cross"],
    postcode: "BH20",
  },
  studland: {
    name: "Studland",
    county: "Dorset",
    description:
      "Studland's exposed coastal position accelerates moss and algae growth. Regular maintenance protects your property from the elements.",
    nearbyAreas: ["Swanage", "Sandbanks", "Shell Bay", "Old Harry Rocks"],
    postcode: "BH19",
  },
  wool: {
    name: "Wool",
    county: "Dorset",
    description:
      "Wool and surrounding villages benefit from our comprehensive exterior cleaning services. We serve residential and commercial properties.",
    nearbyAreas: ["Bovington", "East Lulworth", "Winfrith", "Moreton"],
    postcode: "BH20",
  },
  lulworth: {
    name: "Lulworth",
    county: "Dorset",
    description:
      "East and West Lulworth properties face coastal weather challenges. Our team provides expert cleaning services across the Lulworth area.",
    nearbyAreas: ["Lulworth Cove", "Durdle Door", "West Lulworth", "Wool"],
    postcode: "BH20",
  },
  bournemouth: {
    name: "Bournemouth",
    county: "Dorset",
    description:
      "Bournemouth's mix of Victorian and modern properties all benefit from professional exterior cleaning. We serve all BH1-BH11 postcodes.",
    nearbyAreas: ["Boscombe", "Westbourne", "Southbourne", "Charminster", "Winton"],
    postcode: "BH1-BH11",
  },
  poole: {
    name: "Poole",
    county: "Dorset",
    description:
      "From Sandbanks to Canford Heath, Poole properties need regular maintenance against coastal weather. We cover all BH12-BH17 areas.",
    nearbyAreas: ["Sandbanks", "Canford Cliffs", "Lilliput", "Parkstone", "Hamworthy"],
    postcode: "BH12-BH17",
  },
  christchurch: {
    name: "Christchurch",
    county: "Dorset",
    description:
      "Christchurch's historic Priory area and coastal properties require expert care. We serve all of Christchurch and surrounding areas.",
    nearbyAreas: ["Highcliffe", "Mudeford", "Somerford", "Stanpit"],
    postcode: "BH23",
  },
  wimborne: {
    name: "Wimborne",
    county: "Dorset",
    description:
      "Wimborne Minster's traditional properties and surrounding areas benefit from our professional cleaning services. Historic and modern buildings welcome.",
    nearbyAreas: ["Colehill", "Merley", "Canford Magna", "Pamphill"],
    postcode: "BH21",
  },
  ferndown: {
    name: "Ferndown",
    county: "Dorset",
    description:
      "Ferndown's residential areas require regular exterior maintenance. We provide comprehensive cleaning services across the BH22 postcode.",
    nearbyAreas: ["West Moors", "Longham", "Trickett's Cross", "Stapehill"],
    postcode: "BH22",
  },
  dorchester: {
    name: "Dorchester",
    county: "Dorset",
    description:
      "Dorchester, Dorset's county town, has a rich mix of Georgian and modern properties. We provide expert exterior cleaning throughout the DT1 area.",
    nearbyAreas: ["Poundbury", "Fordington", "Maiden Castle", "Max Gate"],
    postcode: "DT1",
  },
  weymouth: {
    name: "Weymouth",
    county: "Dorset",
    description:
      "Weymouth's seafront properties face constant exposure to salt spray and coastal weather. Our team specializes in maintaining coastal homes and businesses.",
    nearbyAreas: ["Preston", "Wyke Regis", "Osmington", "Chickerell"],
    postcode: "DT3-DT4",
  },
  portland: {
    name: "Portland",
    county: "Dorset",
    description:
      "Portland's exposed island location creates harsh conditions for properties. We understand the unique challenges of maintaining homes on Portland.",
    nearbyAreas: ["Fortuneswell", "Easton", "Southwell", "Weston"],
    postcode: "DT5",
  },
  winfrith: {
    name: "Winfrith",
    county: "Dorset",
    description:
      "Winfrith Newburgh and surrounding villages receive professional exterior cleaning services. We cover the DT2 postcode area comprehensively.",
    nearbyAreas: ["East Knighton", "West Knighton", "Wool", "Moreton"],
    postcode: "DT2",
  },
  "langton-matravers": {
    name: "Langton Matravers",
    county: "Dorset",
    description:
      "Langton Matravers' Purbeck stone properties need specialist care. We understand the unique requirements of this beautiful village.",
    nearbyAreas: ["Worth Matravers", "Swanage", "Kingston", "Acton"],
    postcode: "BH19",
  },
  "worth-matravers": {
    name: "Worth Matravers",
    county: "Dorset",
    description:
      "Worth Matravers sits exposed on the Purbeck Hills. Properties here face strong winds and rapid moss growth requiring regular maintenance.",
    nearbyAreas: ["Langton Matravers", "Kingston", "Swanage", "St Aldhelm's Head"],
    postcode: "BH19",
  },
  "bere-regis": {
    name: "Bere Regis",
    county: "Dorset",
    description:
      "Bere Regis and the surrounding Dorset heathland villages benefit from our comprehensive cleaning services for all property types.",
    nearbyAreas: ["Bloxworth", "Affpuddle", "Turners Puddle", "Wareham"],
    postcode: "BH20",
  },
  stoborough: {
    name: "Stoborough",
    county: "Dorset",
    description:
      "Stoborough properties near the Frome water meadows face high humidity and rapid algae growth. Our team provides regular maintenance solutions.",
    nearbyAreas: ["Wareham", "Ridge", "Sandford", "Worgret"],
    postcode: "BH20",
  },
  bovington: {
    name: "Bovington",
    county: "Dorset",
    description:
      "Bovington Camp and village properties require reliable exterior cleaning services. We serve both military and civilian properties.",
    nearbyAreas: ["Wool", "Moreton", "Cloud", "Burton"],
    postcode: "BH20",
  },
  warmwell: {
    name: "Warmwell",
    county: "Dorset",
    description:
      "Warmwell and the surrounding rural area receive professional exterior cleaning. We understand the needs of country properties.",
    nearbyAreas: ["Crossways", "Moreton", "Woodsford", "Warmwell House"],
    postcode: "DT2",
  },
  kimmeridge: {
    name: "Kimmeridge",
    county: "Dorset",
    description:
      "Kimmeridge Bay's remote location means properties need reliable local service. We provide comprehensive exterior cleaning across this area.",
    nearbyAreas: ["Steeple", "Church Knowle", "Tyneham", "Corfe Castle"],
    postcode: "BH20",
  },
  "lychett-matravers": {
    name: "Lychett Matravers",
    county: "Dorset",
    description:
      "Lychett Matravers sits between Poole and Wareham. We provide comprehensive exterior cleaning for this growing village community.",
    nearbyAreas: ["Lytchett Minster", "Upton", "Organford", "Holton Heath"],
    postcode: "BH16",
  },
  "blandford-forum": {
    name: "Blandford Forum",
    county: "Dorset",
    description:
      "Blandford Forum's Georgian architecture requires careful cleaning techniques. We're experienced with historic and modern properties.",
    nearbyAreas: ["Blandford St Mary", "Bryanston", "Langton Long", "Charlton Marshall"],
    postcode: "DT11",
  },
  ringwood: {
    name: "Ringwood",
    county: "Hampshire/Dorset border",
    description:
      "Ringwood properties on the Dorset border benefit from our New Forest and coastal expertise. We serve BH24 postcodes comprehensively.",
    nearbyAreas: ["Hightown", "Poulner", "St Leonards", "Ashley Heath"],
    postcode: "BH24",
  },
  "kingston-maurward": {
    name: "Kingston Maurward",
    county: "Dorset",
    description:
      "Kingston Maurward and surrounding properties near Dorchester receive expert exterior cleaning. Beautiful rural homes and estates served.",
    nearbyAreas: ["Stinsford", "Higher Bockhampton", "Dorchester", "Lower Bockhampton"],
    postcode: "DT2",
  },
  "isle-of-purbeck": {
    name: "Isle of Purbeck",
    county: "Dorset",
    description:
      "The Isle of Purbeck encompasses Swanage, Wareham, Corfe Castle and all villages between. We're your local exterior cleaning specialists.",
    nearbyAreas: ["Swanage", "Wareham", "Corfe Castle", "Studland", "Kimmeridge", "Worth Matravers"],
    postcode: "BH19-BH20",
  },
  dorset: {
    name: "Dorset",
    county: "England",
    description:
      "PowerWash Bros serves properties across Dorset, from the Jurassic Coast to the New Forest borders. Local knowledge, professional service.",
    nearbyAreas: ["Swanage", "Bournemouth", "Poole", "Wareham", "Wimborne", "Christchurch"],
    postcode: "All BH & DT postcodes",
  },
}

type Props = {
  params: Promise<{ service: string; location: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, location } = await params
  const serviceData = servicesData[service]
  const locationData = LOCATIONS[location]

  if (!serviceData || !locationData) {
    return { title: "Service Not Found" }
  }

  const title = `${serviceData.name} ${locationData.name} | Professional ${serviceData.name} in ${locationData.name}, ${locationData.county} | PowerWash Bros`
  const description = `Professional ${serviceData.name.toLowerCase()} services in ${locationData.name}, ${locationData.county}. ${serviceData.description} Free quotes. Call 07418 610731.`

  return {
    title,
    description,
    keywords: [
      `${serviceData.name.toLowerCase()} ${locationData.name.toLowerCase()}`,
      `${serviceData.name.toLowerCase()} ${locationData.county.toLowerCase()}`,
      `${serviceData.name.toLowerCase()} near me`,
      `professional ${serviceData.name.toLowerCase()} ${locationData.name.toLowerCase()}`,
      `${locationData.name.toLowerCase()} ${serviceData.name.toLowerCase()} service`,
      `best ${serviceData.name.toLowerCase()} ${locationData.name.toLowerCase()}`,
      ...locationData.nearbyAreas.map((area) => `${serviceData.name.toLowerCase()} ${area.toLowerCase()}`),
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_GB",
    },
  }
}

export async function generateStaticParams() {
  const params: { service: string; location: string }[] = []

  Object.keys(servicesData).forEach((service) => {
    Object.keys(LOCATIONS).forEach((location) => {
      params.push({ service, location })
    })
  })

  return params
}

export default async function LocationServicePage({ params }: Props) {
  const { service, location } = await params
  const serviceData = servicesData[service]
  const locationData = LOCATIONS[location]

  if (!serviceData || !locationData) {
    notFound()
  }

  // JSON-LD Schema for local business + service
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceData.name} in ${locationData.name}`,
    description: serviceData.description,
    provider: {
      "@type": "LocalBusiness",
      name: "PowerWash Bros Ltd",
      image: "https://powerwashbros.co.uk/images/pwb-logo-full.png",
      telephone: "+447418610731",
      email: "info@powerwashbros.co.uk",
      url: "https://powerwashbros.co.uk",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Swanage",
        addressRegion: "Dorset",
        postalCode: "BH19",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.6083,
        longitude: -1.9575,
      },
      areaServed: {
        "@type": "Place",
        name: locationData.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: locationData.name,
          addressRegion: locationData.county,
          postalCode: locationData.postcode,
          addressCountry: "GB",
        },
      },
      priceRange: serviceData.priceRange,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
      },
    },
    areaServed: {
      "@type": "Place",
      name: `${locationData.name}, ${locationData.county}`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceData.name} Services`,
      itemListElement: serviceData.benefits.map((benefit, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: benefit,
        },
      })),
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does ${serviceData.name.toLowerCase()} cost in ${locationData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${serviceData.name} in ${locationData.name} typically costs ${serviceData.priceRange} depending on property size and condition. Contact PowerWash Bros for a free, accurate quote.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer ${serviceData.name.toLowerCase()} near ${locationData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! PowerWash Bros provides professional ${serviceData.name.toLowerCase()} in ${locationData.name} and surrounding areas including ${locationData.nearbyAreas.slice(0, 3).join(", ")}. We cover all ${locationData.postcode} postcodes.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I book ${serviceData.name.toLowerCase()} in ${locationData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Simply WhatsApp us on 07418 610731 or request a free quote online. We'll arrange a convenient time to assess your ${locationData.name} property.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-[100dvh] bg-[#0B1E3F] text-white">
        <SiteHeader />

        {/* Hero - improved mobile padding */}
        <section className="py-12 sm:py-20 md:py-28 bg-[#0B1E3F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              {/* Breadcrumbs - improved mobile wrapping */}
              <nav className="text-xs sm:text-sm text-white/60 mb-4 overflow-x-auto" aria-label="Breadcrumb">
                <ol
                  className="flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                  itemScope
                  itemType="https://schema.org/BreadcrumbList"
                >
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" className="hover:text-[#1E90FF] transition-colors" itemProp="item">
                      <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <span>/</span>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/services" className="hover:text-[#1E90FF] transition-colors" itemProp="item">
                      <span itemProp="name">Services</span>
                    </Link>
                    <meta itemProp="position" content="2" />
                  </li>
                  <span>/</span>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link
                      href={`/services/${service}`}
                      className="hover:text-[#1E90FF] transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{serviceData.name}</span>
                    </Link>
                    <meta itemProp="position" content="3" />
                  </li>
                  <span>/</span>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span className="text-white" itemProp="name">
                      {locationData.name}
                    </span>
                    <meta itemProp="position" content="4" />
                  </li>
                </ol>
              </nav>

              <div className="flex items-center gap-2 text-[#1E90FF] mb-4">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">
                  Serving {locationData.name} & {locationData.county}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
                {serviceData.name} in {locationData.name}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8">
                {serviceData.description} Serving {locationData.name}, {locationData.nearbyAreas.slice(0, 3).join(", ")}
                , and all of {locationData.county}.
              </p>

              {/* Trust badges - improved mobile layout */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
                  <span>4.9★ (47 reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#00C853]" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#1E90FF]" />
                  <span>Same Week</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    WhatsApp: 07418 610731
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#1E90FF] text-white hover:bg-[#1E90FF]/10 bg-transparent"
                >
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Context - improved mobile grid */}
        <section className="py-12 sm:py-16 bg-[#0A1A35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
              {serviceData.name} Experts in {locationData.name}
            </h2>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">{locationData.description}</p>
                <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6">
                  PowerWash Bros provides professional {serviceData.name.toLowerCase()} throughout {locationData.name}{" "}
                  and the wider {locationData.county} area. We understand local conditions and deliver results that
                  last.
                </p>
                <div className="flex items-start gap-3 text-white/80">
                  <MapPin className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                  <div className="text-sm sm:text-base">
                    <strong className="text-white">Areas we serve from {locationData.name}:</strong>
                    <p className="mt-1">{locationData.nearbyAreas.join(" • ")}</p>
                  </div>
                </div>
              </div>
              <Card className="bg-[#0B1E3F] border-[#1E90FF]/30">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                    Why Choose PowerWash Bros?
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {serviceData.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-white/80">
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Process - improved mobile grid */}
        <section className="py-12 sm:py-16 bg-[#0B1E3F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white">
              Our {serviceData.name} Process
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
              {serviceData.process.map((step, i) => (
                <Card key={i} className="bg-[#0A1A35] border-[#1E90FF]/30">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E90FF] text-white font-bold text-lg sm:text-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      {i + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">{step}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing - improved mobile padding */}
        <section className="py-12 sm:py-16 bg-[#0A1A35]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
              {serviceData.name} Pricing in {locationData.name}
            </h2>
            <Card className="bg-[#1E90FF] border-[#1E90FF]">
              <CardContent className="p-6 sm:p-8">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">{serviceData.priceRange}</p>
                <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6">
                  Typical price range for {locationData.name} properties. Final price depends on property size and
                  condition.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[#1E90FF] hover:bg-white/90 font-semibold"
                >
                  <Link href="/quote">Get Your Exact Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {serviceData.name} FAQ for {locationData.name}
            </h2>
            <div className="space-y-6">
              <Card className="bg-[#0A1A35] border-[#1E90FF]/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    How much does {serviceData.name.toLowerCase()} cost in {locationData.name}?
                  </h3>
                  <p className="text-white/70">
                    {serviceData.name} in {locationData.name} typically costs {serviceData.priceRange} depending on
                    property size and condition. Contact us for a free, no-obligation quote specific to your property.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A1A35] border-[#1E90FF]/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Do you cover areas near {locationData.name}?
                  </h3>
                  <p className="text-white/70">
                    Yes! We provide {serviceData.name.toLowerCase()} across {locationData.name} and surrounding areas
                    including {locationData.nearbyAreas.join(", ")}. We cover all {locationData.postcode} postcodes.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A1A35] border-[#1E90FF]/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    How do I book {serviceData.name.toLowerCase()} in {locationData.name}?
                  </h3>
                  <p className="text-white/70">
                    Simply WhatsApp us on 07418 610731 or fill out our online quote form. We'll arrange a convenient
                    time to assess your property and provide a detailed quote.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-[#0A1A35]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-white">Other Services in {locationData.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(servicesData)
                .filter(([key]) => key !== service)
                .slice(0, 4)
                .map(([key, svc]) => (
                  <Link
                    key={key}
                    href={`/services/${key}/${location}`}
                    className="block p-4 bg-[#0B1E3F] rounded-lg border border-[#1E90FF]/30 hover:border-[#1E90FF] transition-colors"
                  >
                    <h3 className="font-semibold text-white mb-1">{svc.name}</h3>
                    <p className="text-sm text-white/60">{locationData.name}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready for Professional {serviceData.name} in {locationData.name}?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Free assessments • Same-week service • Serving all of {locationData.county}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-8 py-6 text-lg
                           hover:bg-white/90 hover:shadow-2xl transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp Us Now
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white font-bold rounded-lg px-8 py-6 text-lg
                           hover:bg-white/10 transition-all bg-transparent"
              >
                <Link href="/quote">Request Quote Online</Link>
              </Button>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
