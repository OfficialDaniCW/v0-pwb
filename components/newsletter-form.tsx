"use client"

import React from "react"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

interface NewsletterFormProps {
  variant?: "default" | "compact"
  className?: string
}

export function NewsletterForm({ variant = "default", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")

    try {
      const formData = new FormData()
      formData.append("email", email)

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      } else {
        setStatus("success")
        setMessage(data.message)
        setEmail("")
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-0 max-w-sm mx-auto ${className}`}>
        <div className="relative flex-1">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-lg rounded-r-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1E90FF] text-white font-medium rounded-lg rounded-l-none px-6 hover:bg-[#1E90FF]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Subscribe"}
        </button>
        {status && (
          <div className={`absolute top-full left-0 mt-2 text-sm flex items-center gap-2 ${status === "success" ? "text-green-400" : "text-red-400"}`}>
            {status === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {message}
          </div>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-0 max-w-sm ${className}`}>
      <div className="relative flex-1">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          suppressHydrationWarning
          className="w-full bg-secondary border-none text-foreground placeholder:text-foreground/40 h-10 sm:h-12 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm disabled:opacity-50 px-4"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        aria-label="Subscribe to newsletter"
        suppressHydrationWarning
        className="h-10 sm:h-12 w-10 sm:w-12 min-w-[48px] min-h-[48px] rounded-l-none bg-accent hover:bg-accent/90 p-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      {status && (
        <div className={`absolute top-full left-0 mt-2 text-sm flex items-center gap-2 ${status === "success" ? "text-green-400" : "text-red-400"}`}>
          {status === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {message}
        </div>
      )}
    </form>
  )
}
