"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function AdminSetupPage() {
  const [email, setEmail] = useState("danicw@powerwashbros.co.uk")
  const [password, setPassword] = useState("PowerWash2025!Daniel")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSetup = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          plainPassword: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Setup failed")
      }

      setMessage({
        type: "success",
        text: `Password updated successfully! Hash: ${data.hash.substring(0, 20)}...`,
      })
      
      // Clear form
      setPassword("")
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Setup</h1>
            <p className="text-sm text-muted-foreground">
              Hash and update admin password. Delete this page after use for security.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Plain Text Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to hash"
                disabled={loading}
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  message.type === "success"
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-destructive/10 text-destructive border border-destructive/20"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                )}
                <div className="text-sm">{message.text}</div>
              </div>
            )}

            <Button
              onClick={handleSetup}
              disabled={loading || !email || !password}
              className="w-full bg-accent text-accent-foreground hover:opacity-90"
            >
              {loading ? "Processing..." : "Hash & Update Password"}
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium mb-2">After successful update:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Delete /app/admin/setup/page.tsx</li>
              <li>Delete /app/api/admin/setup/route.ts</li>
              <li>Try logging in with the credentials</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
