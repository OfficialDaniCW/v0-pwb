"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, Mail } from "lucide-react"

export function DiscountSignupModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
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
          source: "powerups_discount",
        }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
        setTimeout(() => {
          setIsOpen(false)
          setStatus("idle")
        }, 2000)
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.log("[v0] Discount signup error:", error)
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
        <Gift className="h-5 w-5 mr-2" />
        Get Discount Code
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
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Exclusive Discount</h3>
                <p className="text-sm text-foreground/60">Save on PowerUps products</p>
              </div>
            </div>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="mb-4 text-5xl">✓</div>
                <h4 className="text-xl font-bold text-foreground mb-2">You're All Set!</h4>
                <p className="text-foreground/70">
                  Check your email for your exclusive discount code. It's already on the way!
                </p>
              </div>
            ) : (
              <>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  Join our PowerUps mailing list and receive <span className="font-semibold text-accent">exclusive online discounts</span> on professional-grade cleaning solutions.
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
                    {isLoading ? "Sending..." : "Send Me My Code"}
                  </Button>
                </form>

                <p className="text-xs text-foreground/60 text-center mt-4">
                  We'll send you discount codes, seasonal offers & exclusive deals. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
