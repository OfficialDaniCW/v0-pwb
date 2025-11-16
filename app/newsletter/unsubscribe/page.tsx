"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2, XCircle } from 'lucide-react'

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const emailParam = searchParams?.get("email")
  
  const [email, setEmail] = useState(emailParam || "")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to unsubscribe")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                  <Mail className="h-10 w-10 text-[#1E90FF]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Unsubscribe from Newsletter
                </h1>
                <p className="text-xl text-white/70">
                  We're sorry to see you go. You can unsubscribe from our newsletter below.
                </p>
              </div>

              <Card className="glass-border-enhanced">
                <CardContent className="p-8">
                  {status === "success" ? (
                    <div className="text-center space-y-6">
                      <CheckCircle2 className="h-16 w-16 text-[#00C853] mx-auto" />
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Unsubscribed Successfully</h3>
                        <p className="text-white/70">{message}</p>
                      </div>
                      <p className="text-sm text-white/60">
                        Changed your mind?{" "}
                        <a href="/" className="text-[#1E90FF] hover:underline">
                          Visit our homepage
                        </a>{" "}
                        to resubscribe.
                      </p>
                    </div>
                  ) : status === "error" ? (
                    <div className="text-center space-y-6">
                      <XCircle className="h-16 w-16 text-destructive mx-auto" />
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
                        <p className="text-white/70">{message}</p>
                      </div>
                      <Button
                        onClick={() => setStatus("idle")}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Try Again
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleUnsubscribe} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-white text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-destructive hover:bg-destructive/90 text-white"
                      >
                        {status === "loading" ? "Unsubscribing..." : "Unsubscribe"}
                      </Button>

                      <p className="text-xs text-white/60 text-center">
                        You will no longer receive marketing emails from PowerWash Bros.
                        <br />
                        You may still receive service-related emails about your bookings.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {status === "idle" && (
                <div className="mt-8 text-center">
                  <p className="text-white/70 mb-4">
                    Rather than unsubscribe, would you prefer to:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="/blog"
                      className="inline-flex items-center justify-center px-6 py-2 border-2 border-[#1E90FF] text-[#1E90FF] font-medium rounded-lg hover:bg-[#1E90FF] hover:text-white transition-all"
                    >
                      Read Our Blog
                    </a>
                    <a
                      href="https://www.instagram.com/powerwashbrosltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-2 border-2 border-[#1E90FF] text-[#1E90FF] font-medium rounded-lg hover:bg-[#1E90FF] hover:text-white transition-all"
                    >
                      Follow on Instagram
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
