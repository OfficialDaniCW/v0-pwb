import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from "next/script"
import Plasma from "@/components/plasma"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { CookieBanner } from "@/components/cookie-banner"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "PowerWash Bros | Dorset's Leading Property Maintenance Experts",
  description:
    "Biocide-trained specialists in exterior cleaning for residential, commercial, and heritage properties across Dorset. Property-centered care that lasts.",
  generator: "v0.app",
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
    apple: '/favicon.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* Font Preload */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XT0PL3MJH0" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XT0PL3MJH0');
          `}
        </Script>
      </head>
      <body>
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 bg-[#0B1E3F]">
            <Plasma 
              color="#1E90FF" 
              speed={0.6} 
              direction="forward" 
              scale={1.8} 
              opacity={0.3} 
              mouseInteractive={true} 
            />
          </div>
          <div className="relative z-10">{children}</div>
        </Suspense>

        <CookieBanner />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
