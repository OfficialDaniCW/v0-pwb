"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from 'lucide-react'
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("pwb-cookie-consent")
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("pwb-cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("pwb-cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-5xl mx-auto bg-[#0B1E3F] border-2 border-[#1E90FF]/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">
                We value your privacy
              </h3>
              <p className="text-sm text-white/80 mb-4">
                We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                <Link href="/cookies" className="text-[#1E90FF] hover:underline">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#1E90FF] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={acceptCookies}
                  className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white"
                >
                  Accept All
                </Button>
                <Button
                  onClick={rejectCookies}
                  variant="secondary"
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  Reject Non-Essential
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-[#00C853] hover:text-[#00C853] hover:bg-[#00C853]/10"
                >
                  <Link href="/cookies">Manage Preferences</Link>
                </Button>
              </div>
            </div>
            <button
              onClick={rejectCookies}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
