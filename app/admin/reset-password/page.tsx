"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!token) {
      setError("Invalid or missing reset token")
      return
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setNewPassword("")
        setConfirmPassword("")
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/admin/login")
        }, 2000)
      } else {
        setError(data.error || "Failed to reset password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg flex items-center gap-3 mb-4">
            <AlertCircle className="h-5 w-5" />
            <span>Invalid or missing reset token. Please request a new password reset.</span>
          </div>
          <Button asChild className="w-full">
            <a href="/admin/forgot-password">Back to Password Reset</a>
          </Button>
        </div>
      </div>
    )
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
          <h1 className="text-4xl font-bold text-foreground mt-12">Reset Password</h1>
          <p className="text-accent mt-4 max-w-md">
            Create a new password to regain access to your admin dashboard.
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

      {/* Right side - reset form */}
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
          <span className="text-2xl font-semibold text-white">PowerWash Bros</span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Reset your password</h2>
            <p className="text-muted-foreground mt-2">Enter your new password below</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive/80 px-4 py-3 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-success/10 border border-success/30 text-success/80 px-4 py-3 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5" />
                <span>Password reset successful! Redirecting to login...</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground/80">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 8 characters)"
                  className="pr-10"
                  disabled={isLoading || success}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">At least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground/80">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="pr-10"
                  disabled={isLoading || success}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || success}>
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
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
