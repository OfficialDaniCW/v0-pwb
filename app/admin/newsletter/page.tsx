"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Mail, Download, MailOpen } from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

interface Subscriber {
  id: number
  email: string
  subscribed_at: string
  is_active: boolean
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/newsletter")
      const data = await response.json()
      setSubscribers(data.subscribers || [])

      const active = data.subscribers.filter((s: Subscriber) => s.is_active).length
      const inactive = data.subscribers.filter((s: Subscriber) => !s.is_active).length
      setStats({
        total: data.subscribers.length,
        active,
        inactive,
      })
    } catch (error) {
      console.error("Failed to fetch subscribers:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportSubscribers = () => {
    const activeSubscribers = subscribers.filter((s) => s.is_active)
    const csv = [
      "Email,Subscribed Date",
      ...activeSubscribers.map((s) => `${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pwb-newsletter-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const filteredSubscribers = subscribers.filter((s) => s.email.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading subscribers...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Newsletter Subscribers</h1>
          <p className="text-white/60">Manage your email list</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Total Subscribers</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-[#1E90FF]/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#1E90FF]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Active</p>
                  <p className="text-3xl font-bold text-[#00C853] mt-1">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-[#00C853]/20 rounded-xl flex items-center justify-center">
                  <MailOpen className="h-6 w-6 text-[#00C853]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Unsubscribed</p>
                  <p className="text-3xl font-bold text-white/50 mt-1">{stats.inactive}</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button
                onClick={exportSubscribers}
                className="bg-[#0B1E3F] border border-white/20 text-white hover:bg-white/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Active Subscribers
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white">Subscribers ({filteredSubscribers.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {filteredSubscribers.length === 0 ? (
                <p className="text-center text-white/50 py-8">
                  {searchTerm ? "No subscribers found" : "No subscribers yet"}
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredSubscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-white">{subscriber.email}</div>
                        <div className="text-sm text-white/50">
                          Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        {subscriber.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00C853]/20 text-[#00C853]">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/50">
                            Unsubscribed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
