"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Mail, Download } from "lucide-react"
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
    return <div className="p-8 text-center">Loading subscribers...</div>
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">Manage your email list</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Mail className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
              <Mail className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inactive}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={exportSubscribers} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Active Subscribers
          </Button>
        </div>

        {/* Subscribers List */}
        <Card>
          <CardHeader>
            <CardTitle>Subscribers ({filteredSubscribers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredSubscribers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {searchTerm ? "No subscribers found" : "No subscribers yet"}
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredSubscribers.map((subscriber) => (
                    <div key={subscriber.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{subscriber.email}</div>
                        <div className="text-sm text-muted-foreground">
                          Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        {subscriber.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
