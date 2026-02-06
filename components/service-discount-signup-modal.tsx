"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Bell, Mail, Phone } from "lucide-react"

export function ServiceDiscountSignupModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          source: "service_discounts",
        }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
        setPhone("")
        setTimeout(() => {
          setIsOpen(false)
          setStatus("idle")
        }, 2000)
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.log("[v0] Service discount signup error:", error)
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="w-full sm:w-auto text-white font-semibold rounded-lg hover:shadow-lg transition-all bg-success"
      >
        <Bell className="h-5 w-5 mr-2" />
        Notify Me of Discounts
      </Button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          {/* Modal Content */}
          <div
            className="bg-background rounded-2xl p-8 max-w-md w-full border border-foreground/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-success">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Exclusive Service Deals</h3>
                <p className="text-sm text-foreground/60">Save on professional cleaning</p>
              </div>
            </div>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="mb-4 text-5xl">✓</div>
                <h4 className="text-xl font-bold text-foreground mb-2">You're Subscribed!</h4>
                <p className="text-foreground/70">
                  We'll contact you when we have special offers on our cleaning services.
                </p>
              </div>
            ) : (
              <>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  Get notified about <span className="font-semibold text-success">periodic discounts</span> on our professional cleaning services. We'll contact you with exclusive deals throughout the year.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-foreground/40" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-foreground/40" />
                    <Input
                      type="tel"
                      placeholder="+44 7xxx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white font-semibold rounded-lg"
                    style={{
                      backgroundColor: "var(--success)",
                    }}
                  >
                    {isLoading ? "Subscribing..." : "Notify Me"}
                  </Button>
                </form>

                <p className="text-xs text-foreground/60 text-center mt-4">
                  We'll send you notifications about special offers on our services. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
