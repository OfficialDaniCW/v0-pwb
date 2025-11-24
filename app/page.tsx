import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WhyPropertyCentered } from "@/components/why-property-centered"
import { CoreServices } from "@/components/core-services"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { PowerUpsIntro } from "@/components/powerups-intro"
import { LatestBlogPosts } from "@/components/latest-blog-posts"
import { InstagramFeed } from "@/components/instagram-feed"
import { FinalCTA } from "@/components/final-cta"
import { PWBFooter } from "@/components/pwb-footer"
import Script from "next/script"

export const dynamic = "force-static"

export default function Page() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PowerWash Bros Ltd",
    image: "/icons/pwb-logo.png",
    "@id": "https://powerwashbros.co.uk",
    url: "https://powerwashbros.co.uk",
    telephone: "07418610731",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hardingredmans, Bridge House, Court Road",
      addressLocality: "Swanage",
      postalCode: "BH19 1DX",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.6079",
      longitude: "-1.9589",
    },
    areaServed: ["Bournemouth", "Poole", "Swanage", "Wimborne", "Christchurch", "Wareham", "Ferndown", "Dorset"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "100",
    },
  }

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://powerwashbros.co.uk/",
    name: "PowerWash Bros | Dorset's Leading Property Maintenance Experts",
    description:
      "Biocide-trained specialists in exterior cleaning for residential, commercial, and heritage properties across Dorset. Property-centred care that lasts.",
    url: "https://powerwashbros.co.uk/",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <WhyPropertyCentered />
        <CoreServices />
        <HowItWorks />
        <Testimonials />
        <PowerUpsIntro />
        <LatestBlogPosts />
        <InstagramFeed />
        <FinalCTA />
        <PWBFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
