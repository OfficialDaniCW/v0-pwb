import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Plasma from "@/components/plasma"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieBanner } from "@/components/cookie-banner"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://powerwashbros.co.uk"),
  title: {
    default: "Pressure Washing Swanage, Purbeck & Dorset | PowerWash Bros",
    template: "%s | PowerWash Bros",
  },
  description:
    "Professional pressure washing, roof & gutter cleaning in Swanage, Purbeck & Dorset. Biocide-trained. Free quotes available.",
  keywords: [
    "pressure washing swanage",
    "gutter cleaning swanage",
    "roof cleaning swanage",
    "driveway cleaning swanage",
    "pressure washing purbeck",
    "gutter cleaning purbeck",
    "roof cleaning purbeck",
    "exterior cleaning dorset",
    "property maintenance dorset",
    "soft wash dorset",
    "render cleaning dorset",
    "patio cleaning swanage",
    "moss removal swanage",
    "PowerWash Bros",
    "pressure washing near me",
  ],
  generator: "v0.app",
  icons: {
    icon: "/images/pwb-logo-circle.png",
    shortcut: "/images/pwb-logo-circle.png",
    apple: "/images/pwb-logo-circle.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://powerwashbros.co.uk",
    title: "Pressure Washing Swanage, Purbeck & Dorset | PowerWash Bros",
    description:
      "Professional pressure washing, roof & gutter cleaning in Swanage, Purbeck & Dorset. Biocide-trained specialists. Free quotes.",
    siteName: "PowerWash Bros",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PowerWash Bros - Professional Exterior Cleaning in Dorset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pressure Washing Swanage, Purbeck & Dorset | PowerWash Bros",
    description:
      "Professional pressure washing, roof & gutter cleaning in Swanage, Purbeck & Dorset. Free quotes.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-verification-code", // Already verified via DNS
  },
  alternates: {
    canonical: "https://powerwashbros.co.uk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://powerwashbros.co.uk/#organization",
    name: "PowerWash Bros Ltd",
    alternateName: "PowerWash Bros",
    description:
      "Professional pressure washing, gutter cleaning, roof cleaning and exterior property maintenance services in Swanage, Purbeck and Dorset.",
    url: "https://powerwashbros.co.uk",
    logo: "https://powerwashbros.co.uk/images/pwb-logo-full.png",
    image: "https://powerwashbros.co.uk/og-image.jpg",
    telephone: "+447418610731",
    email: "info@powerwashbros.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Swanage",
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
    areaServed: [
      {
        "@type": "City",
        name: "Swanage",
        containedIn: "Dorset",
      },
      {
        "@type": "AdministrativeArea",
        name: "Purbeck",
        containedIn: "Dorset",
      },
      {
        "@type": "AdministrativeArea",
        name: "Dorset",
        containedIn: "England",
      },
      {
        "@type": "City",
        name: "Wareham",
      },
      {
        "@type": "City",
        name: "Bournemouth",
      },
      {
        "@type": "City",
        name: "Poole",
      },
    ],
    priceRange: "££",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Exterior Cleaning Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Pressure Washing",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Driveway Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Patio Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Decking Cleaning" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Roof & Gutter Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Moss Removal" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soffit Cleaning" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Soft Washing",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Render Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cladding Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "External Wall Cleaning" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Specialist Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar Panel Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heritage Building Cleaning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graffiti Removal" } },
          ],
        },
      ],
    },
    sameAs: ["https://www.facebook.com/powerwashbros", "https://www.instagram.com/powerwashbros"],
  }

  return (
    <html lang="en-GB" className={inter.className}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="geo.region" content="GB-DOR" />
        <meta name="geo.placename" content="Swanage, Dorset" />
        <meta name="geo.position" content="50.6083;-1.9575" />
        <meta name="ICBM" content="50.6083, -1.9575" />

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />

        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Leaflet CSS is removed from here */}

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7S3SLJT7WZ" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7S3SLJT7WZ');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <ScrollToTop />
          <div className="fixed inset-0 z-0 bg-[#0B1E3F]">
            <Plasma color="#1E90FF" speed={0.6} direction="forward" scale={1.8} opacity={0.3} mouseInteractive={true} />
          </div>
          <div className="relative z-10">{children}</div>
        </Suspense>

        <CookieBanner />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
