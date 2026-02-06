"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("admin-email", data.email)
        localStorage.setItem("admin-id", data.id)

        // Set a secure HTTP-only cookie via Set-Cookie header
        const expiryDate = new Date()
        expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000)
        document.cookie = `admin-session=authenticated; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict`
        router.push("/admin/pwb")
      } else {
        setError(data.error || "Invalid email or password")
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
          <h1 className="text-4xl font-bold text-foreground mt-12">Admin Portal</h1>
          <p className="text-accent mt-4 max-w-md">
            Manage your website content, bookings, gallery, and business settings from one central dashboard.
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

      {/* Right side - login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        {/* Mobile header - only visible on mobile */}
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
          <span className="text-2xl font-semibold text-white">PowerWash Bros</span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
            <p className="text-muted-foreground mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive/80 px-4 py-3 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@powerwashbros.co.uk"
                className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground/80">
                  Password
                </Label>
                <a href="/admin/forgot-password" className="text-accent hover:text-accent/80 text-sm font-medium">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Need help? <Link href="/contact" className="text-accent hover:underline font-medium">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
