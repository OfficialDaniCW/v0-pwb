"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Mail } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resetLink, setResetLink] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setResetLink("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setEmail("")
        // Show reset link in development only
        if (data.resetLink) {
          setResetLink(data.resetLink)
        }
      } else {
        setError(data.error || "Failed to process password reset")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col md:flex-row relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl" />
      </div>

      {/* Left side - only visible on desktop */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-accent/20 to-secondary/30 backdrop-blur-sm p-12 flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                src="/images/pwb-logo-circle.png"
                alt="PowerWash Bros"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-semibold text-foreground">PowerWash Bros</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mt-12">Forgot Password?</h1>
          <p className="text-accent mt-4 max-w-md">
            No problem! We'll send you a secure link to reset your password and regain access to your admin dashboard.
          </p>
        </div>
        <div className="mt-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-border">
            <p className="text-foreground/90 text-sm">
              Property-centred pressure washing services across Purbeck and Dorset
            </p>
          </div>
        </div>
      </div>

      {/* Right side - forgot password form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <div className="flex md:hidden items-center gap-3 mb-8 w-full">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/images/pwb-logo-circle.png"
              alt="PowerWash Bros"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-semibold text-foreground">PowerWash Bros</span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Reset your password</h2>
            <p className="text-muted-foreground mt-2">
              Enter the email address associated with your admin account and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive/80 px-4 py-3 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="space-y-4">
                <div className="bg-success/10 border border-success/30 text-success/80 px-4 py-3 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Check your email!</p>
                    <p className="text-sm">We've sent a password reset link to your email address. The link will expire in 24 hours.</p>
                  </div>
                </div>

                {resetLink && (
                  <div className="bg-muted p-4 rounded-lg border border-muted-foreground/20">
                    <p className="text-xs text-muted-foreground mb-2">Development: Reset Link</p>
                    <a
                      href={resetLink}
                      className="text-accent hover:text-accent/80 text-sm break-all"
                    >
                      {resetLink}
                    </a>
                  </div>
                )}
              </div>
            )}

            {!success && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@powerwashbros.co.uk"
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </>
            )}
          </form>

          <div className="text-center mt-6">
            <a href="/admin/login" className="text-accent hover:text-accent/80 text-sm">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
