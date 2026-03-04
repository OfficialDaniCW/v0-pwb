import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { SeasonalCTA } from "@/components/seasonal-cta"
import { PricingPreview } from "@/components/pricing-preview"
import { WhyPropertyCentered } from "@/components/why-property-centered"
import { CoreServices } from "@/components/core-services"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { PowerUpsIntro } from "@/components/powerups-intro"
import { ServiceDiscountSection } from "@/components/service-discount-section"
import { LatestBlogPosts } from "@/components/latest-blog-posts"
import { InstagramFeed } from "@/components/instagram-feed"
import { FinalCTA } from "@/components/final-cta"
import { PWBFooter } from "@/components/pwb-footer"
import { ScrollingTransformations } from "@/components/scrolling-transformations"
import Script from "next/script"
import { Suspense } from "react"

export const revalidate = 3600 // Revalidate the full page every hour

export default function Page() {
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
        <Suspense fallback={null}>
          <ScrollingTransformations />
        </Suspense>
        <SeasonalCTA />
        <PricingPreview />
        <WhyPropertyCentered />
        <CoreServices />
        <HowItWorks />
        <Testimonials />
        <PowerUpsIntro />
        <ServiceDiscountSection />
        <Suspense fallback={null}>
          <LatestBlogPosts />
        </Suspense>
        <Suspense fallback={null}>
          <InstagramFeed />
        </Suspense>
        <FinalCTA />
        <PWBFooter />
      </main>

      {/* JSON-LD structured data */}
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
