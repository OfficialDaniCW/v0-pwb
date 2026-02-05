'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminLayout from '@/components/admin/admin-layout'
import { Mail, Plus, Edit2, Eye, Trash2, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: number
  title: string
  subject_line: string
  status: string
  target_group: string
  recipient_count: number
  created_at: string
  sent_at?: string
  scheduled_for?: string
}

export default function NewsletterCampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/campaigns')
      const data = await response.json()
      setCampaigns(data.campaigns || [])
    } catch (error) {
      console.error('[v0] Failed to fetch campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCampaign = async (id: number) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return

    try {
      await fetch(`/api/admin/newsletter/campaigns/${id}`, { method: 'DELETE' })
      setCampaigns(campaigns.filter((c) => c.id !== id))
    } catch (error) {
      console.error('[v0] Failed to delete campaign:', error)
    }
  }

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === 'all') return true
    return c.status === filter
  })

  const stats = {
    total: campaigns.length,
    draft: campaigns.filter((c) => c.status === 'draft').length,
    scheduled: campaigns.filter((c) => c.status === 'scheduled').length,
    sent: campaigns.filter((c) => c.status === 'sent').length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-white/10 text-white'
      case 'scheduled':
        return 'bg-[#1E90FF]/20 text-[#1E90FF]'
      case 'sent':
        return 'bg-[#00C853]/20 text-[#00C853]'
      default:
        return 'bg-white/10 text-white'
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading campaigns...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Newsletter Campaigns</h1>
            <p className="text-white/60">Create and manage email campaigns</p>
          </div>
          <Link href="/admin/newsletter/campaigns?new=true">
            <Button className="bg-[#00C853] hover:bg-[#00C853]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-[#0B1E3F] border-white/10">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-white/60">Total Campaigns</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B1E3F] border-white/10">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-white/60">Drafts</p>
                <p className="text-3xl font-bold text-white/80 mt-1">{stats.draft}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B1E3F] border-white/10">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-white/60">Scheduled</p>
                <p className="text-3xl font-bold text-[#1E90FF] mt-1">{stats.scheduled}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B1E3F] border-white/10">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-white/60">Sent</p>
                <p className="text-3xl font-bold text-[#00C853] mt-1">{stats.sent}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'draft', 'scheduled', 'sent'].map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? 'default' : 'outline'}
              className={`${
                filter === f
                  ? 'bg-[#1E90FF] text-white'
                  : 'bg-transparent border-white/20 text-white hover:bg-white/5'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Campaigns List */}
        <div className="space-y-3">
          {filteredCampaigns.length === 0 ? (
            <Card className="bg-[#0B1E3F] border-white/10">
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No campaigns found</p>
              </CardContent>
            </Card>
          ) : (
            filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-[#0B1E3F] border-white/10 hover:border-white/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{campaign.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mb-3">{campaign.subject_line}</p>

                      <div className="flex gap-6 text-sm text-white/50">
                        {campaign.target_group && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {campaign.target_group === 'all' ? 'All Subscribers' : campaign.target_group}
                          </div>
                        )}
                        {campaign.recipient_count > 0 && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {campaign.recipient_count} recipients
                          </div>
                        )}
                        {campaign.scheduled_for && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(campaign.scheduled_for).toLocaleDateString()}
                          </div>
                        )}
                        {campaign.sent_at && (
                          <div className="text-[#00C853]">
                            Sent {new Date(campaign.sent_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/admin/newsletter/campaigns?id=${campaign.id}`}>
                        <Button
                          size="sm"
                          className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/5 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                          onClick={() => deleteCampaign(campaign.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
