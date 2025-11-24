"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MapPin, Calendar, CheckCircle2, Clock, XCircle, Eye, Trash2, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuoteRequest {
  id: number
  name: string
  email: string
  phone: string
  service_needed: string
  property_type: string
  postcode: string
  property_details: string
  preferred_contact: string
  heard_from: string
  status: string
  created_at: string
}

export default function QuoteRequestsPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, completed: 0 })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const cookies = document.cookie.split(";")
    const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith("admin-session="))

    if (!sessionCookie || !sessionCookie.includes("authenticated")) {
      router.push("/admin/login")
      return
    }

    fetchQuotes()
  }, [router])

  useEffect(() => {
    filterQuotes()
  }, [searchQuery, statusFilter, quotes])

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/admin/quotes")
      if (response.ok) {
        const data = await response.json()
        setQuotes(Array.isArray(data) ? data : [])
        calculateStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error)
      setQuotes([])
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (data: QuoteRequest[]) => {
    const total = data.length
    const newQuotes = data.filter((q) => q.status === "new").length
    const contacted = data.filter((q) => q.status === "contacted").length
    const completed = data.filter((q) => q.status === "completed").length
    setStats({ total, new: newQuotes, contacted, completed })
  }

  const filterQuotes = () => {
    let filtered = [...quotes]

    if (statusFilter !== "all") {
      filtered = filtered.filter((q) => q.status === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (q) =>
          q.name.toLowerCase().includes(query) ||
          q.email.toLowerCase().includes(query) ||
          q.postcode.toLowerCase().includes(query) ||
          q.service_needed.toLowerCase().includes(query),
      )
    }

    setFilteredQuotes(filtered)
  }

  const updateQuoteStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (response.ok) {
        fetchQuotes()
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote({ ...selectedQuote, status: newStatus })
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const deleteQuote = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return

    try {
      const response = await fetch("/api/admin/quotes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        fetchQuotes()
        setSelectedQuote(null)
      }
    } catch (error) {
      console.error("Failed to delete quote:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      new: { variant: "default" as const, icon: Clock, color: "bg-blue-500" },
      contacted: { variant: "secondary" as const, icon: Mail, color: "bg-yellow-500" },
      completed: { variant: "default" as const, icon: CheckCircle2, color: "bg-green-500" },
      cancelled: { variant: "destructive" as const, icon: XCircle, color: "bg-red-500" },
    }

    const { icon: Icon, color } = config[status as keyof typeof config] || config.new

    return (
      <Badge className={`${color} text-white`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1E90FF] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading quote requests...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0B1E3F]">Quote Requests</h1>
          <p className="text-gray-600 mt-1">Manage customer quote requests and enquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-3xl font-bold text-[#0B1E3F] mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-[#1E90FF]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">{stats.new}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Contacted</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.contacted}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-gray-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="space-y-4">
            {filteredQuotes.length === 0 ? (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-12 text-center">
                  <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No quote requests found</p>
                </CardContent>
              </Card>
            ) : (
              filteredQuotes.map((quote) => (
                <Card
                  key={quote.id}
                  className={`bg-white border-gray-200 cursor-pointer transition-all hover:shadow-md ${
                    selectedQuote?.id === quote.id ? "ring-2 ring-[#1E90FF]" : ""
                  }`}
                  onClick={() => setSelectedQuote(quote)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0B1E3F] text-lg">{quote.name}</h3>
                        <p className="text-sm text-gray-600">{quote.service_needed}</p>
                      </div>
                      {getStatusBadge(quote.status)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{quote.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{quote.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{quote.postcode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(quote.created_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Detail View */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {selectedQuote ? (
              <Card className="bg-white border-gray-200">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-[#0B1E3F]">Quote Request Details</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">ID: {selectedQuote.id}</p>
                    </div>
                    {getStatusBadge(selectedQuote.status)}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-semibold text-[#0B1E3F] mb-3">Customer Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <p className="text-[#0B1E3F] font-medium">{selectedQuote.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="text-[#0B1E3F]">
                          <a href={`mailto:${selectedQuote.email}`} className="text-[#1E90FF] hover:underline">
                            {selectedQuote.email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <p className="text-[#0B1E3F]">
                          <a href={`tel:${selectedQuote.phone}`} className="text-[#1E90FF] hover:underline">
                            {selectedQuote.phone}
                          </a>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Preferred Contact Method</label>
                        <p className="text-[#0B1E3F] capitalize">{selectedQuote.preferred_contact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Property Info */}
                  <div>
                    <h4 className="font-semibold text-[#0B1E3F] mb-3">Property Details</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Service Needed</label>
                        <p className="text-[#0B1E3F] font-medium">{selectedQuote.service_needed}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Property Type</label>
                        <p className="text-[#0B1E3F] capitalize">{selectedQuote.property_type}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Postcode</label>
                        <p className="text-[#0B1E3F]">{selectedQuote.postcode}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Additional Details</label>
                        <p className="text-[#0B1E3F] whitespace-pre-wrap">
                          {selectedQuote.property_details || "No additional details provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">How They Heard About Us</label>
                        <p className="text-[#0B1E3F] capitalize">{selectedQuote.heard_from || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Request Info */}
                  <div>
                    <h4 className="font-semibold text-[#0B1E3F] mb-3">Request Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Submitted</label>
                        <p className="text-[#0B1E3F]">{formatDate(selectedQuote.created_at)}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 mb-2 block">Update Status</label>
                        <Select
                          value={selectedQuote.status}
                          onValueChange={(value) => updateQuoteStatus(selectedQuote.id, value)}
                        >
                          <SelectTrigger className="border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => window.open(`mailto:${selectedQuote.email}`, "_blank")}
                      className="flex-1 bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Customer
                    </Button>
                    <Button
                      onClick={() => deleteQuote(selectedQuote.id)}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-12 text-center">
                  <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Select a quote request to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
