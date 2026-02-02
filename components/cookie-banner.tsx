"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Settings, Shield, BarChart3, Target } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"

interface CookiePreferences {
  essential: boolean // Always true, cannot be disabled
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

  useEffect(() => {
    const consent = localStorage.getItem("pwb-cookie-consent")
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Load saved preferences
      try {
        const savedPrefs = localStorage.getItem("pwb-cookie-preferences")
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs))
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  const acceptCookies = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    localStorage.setItem("pwb-cookie-consent", "accepted")
    localStorage.setItem("pwb-cookie-preferences", JSON.stringify(allAccepted))
    setPreferences(allAccepted)
    setShowBanner(false)
    setShowPreferences(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("pwb-cookie-consent", "rejected")
    localStorage.setItem("pwb-cookie-preferences", JSON.stringify(defaultPreferences))
    setPreferences(defaultPreferences)
    setShowBanner(false)
    setShowPreferences(false)
  }

  const savePreferences = () => {
    localStorage.setItem("pwb-cookie-consent", "custom")
    localStorage.setItem("pwb-cookie-preferences", JSON.stringify(preferences))
    setShowBanner(false)
    setShowPreferences(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return // Cannot toggle essential
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!showBanner && !showPreferences) return null

  // Preferences Modal
  if (showPreferences) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <Card className="w-full max-w-lg bg-primary border-2 border-accent/30 shadow-2xl max-h-[90vh] overflow-y-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20 mt-0.5">
                  <Shield className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Essential Cookies</h3>
                  <p className="text-sm text-white/60 mt-1">
                    Required for the website to function. These include session management and security features.
                  </p>
                </div>
              </div>
                  <Switch checked={true} disabled className="data-[state=checked]:bg-success opacity-70" />
            </div>
            <div className="p-4 rounded-lg bg-[#1a3a5c] border border-[#1E90FF]/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/20 mt-0.5">
                    <BarChart3 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Analytics Cookies</h3>
                    <p className="text-sm text-white/60 mt-1">
                      Help us understand how visitors interact with our website to improve user experience.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference("analytics")}
                    className="data-[state=checked]:bg-accent"
                />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#1a3a5c] border border-[#1E90FF]/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-destructive/20 mt-0.5">
                    <Target className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Marketing Cookies</h3>
                    <p className="text-sm text-white/60 mt-1">
                      Used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={() => togglePreference("marketing")}
                  className="data-[state=checked]:bg-[#FF6B35]"
                />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#1a3a5c] border border-[#1E90FF]/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#9C27B0]/20 mt-0.5">
                    <Settings className="h-4 w-4 text-[#9C27B0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Functional Cookies</h3>
                    <p className="text-sm text-white/60 mt-1">
                      Enable enhanced functionality like remembering your preferences and settings.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.functional}
                  onCheckedChange={() => togglePreference("functional")}
                  className="data-[state=checked]:bg-[#9C27B0]"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/10">
              <Button onClick={savePreferences} className="bg-[#00C853] hover:bg-[#00C853]/90 text-white flex-1">
                Save Preferences
              </Button>
              <Button
                onClick={acceptCookies}
                variant="secondary"
                className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white flex-1"
              >
                Accept All
              </Button>
            </div>
            <p className="text-xs text-white/50 mt-4 text-center">
              Read our{" "}
              <Link href="/cookies" className="text-[#1E90FF] hover:underline">
                Cookie Policy
              </Link>{" "}
              for more information.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main Banner
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-5xl mx-auto bg-[#0B1E3F] border-2 border-[#1E90FF]/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">We value your privacy</h3>
              <p className="text-sm text-white/80 mb-4">
                We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic.
                By clicking "Accept All", you consent to our use of cookies. Read our{" "}
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
                <Button onClick={acceptCookies} className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white">
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
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="text-[#00C853] hover:text-[#00C853] hover:bg-[#00C853]/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Preferences
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
