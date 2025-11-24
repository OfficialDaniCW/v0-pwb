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
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading subscribers...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Newsletter Subscribers</h1>
          <p className="text-gray-600">Manage your email list</p>
        </div>

        {/* Stats Cards with navy accent styling */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-[#0F2851] border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-[#1E90FF]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0F2851] border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active</CardTitle>
              <Mail className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.active}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0F2851] border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Unsubscribed</CardTitle>
              <Mail className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.inactive}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-white border-gray-200"
          />
          <Button onClick={exportSubscribers} variant="outline" className="bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Export Active Subscribers
          </Button>
        </div>

        {/* Subscribers List */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-gray-900">Subscribers ({filteredSubscribers.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {filteredSubscribers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  {searchTerm ? "No subscribers found" : "No subscribers yet"}
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredSubscribers.map((subscriber) => (
                    <div key={subscriber.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{subscriber.email}</div>
                        <div className="text-sm text-gray-500">
                          Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        {subscriber.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
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
