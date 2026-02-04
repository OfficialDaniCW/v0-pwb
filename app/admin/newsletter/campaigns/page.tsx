'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import AdminLayout from '@/components/admin/admin-layout'
import { NewsletterRichTextEditor } from '@/components/newsletter-rich-text-editor'
import { Mail, Calendar, Users, Send, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: number
  title: string
  subject_line: string
  description: string
  content: string
  cta_text: string
  cta_url: string
  target_group: string
  status: string
  scheduled_for: string
  recipient_count: number
}

export default function NewsletterCampaignEditor() {
  const [campaign, setCampaign] = useState<Campaign>({
    id: 0,
    title: '',
    subject_line: '',
    description: '',
    content: '',
    cta_text: 'Learn More',
    cta_url: '',
    target_group: 'all',
    status: 'draft',
    scheduled_for: '',
    recipient_count: 0,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const saveCampaign = async () => {
    if (!campaign.title || !campaign.subject_line || !campaign.content) {
      setSaveMessage('Please fill in all required fields')
      return
    }

    setSaving(true)
    try {
      const method = campaign.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/newsletter/campaigns', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      })

      if (response.ok) {
        const data = await response.json()
        setCampaign(data.campaign)
        setIsEditing(false)
        setSaveMessage('Campaign saved successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('Failed to save campaign')
      }
    } catch (error) {
      console.error('[v0] Save error:', error)
      setSaveMessage('Error saving campaign')
    } finally {
      setSaving(false)
    }
  }

  const sendCampaign = async () => {
    if (!confirm('Are you sure you want to send this newsletter?')) return

    setSaving(true)
    try {
      const response = await fetch('/api/admin/newsletter/campaigns/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign_id: campaign.id, send_now: true }),
      })

      if (response.ok) {
        const data = await response.json()
        setSaveMessage(`Newsletter sent to ${data.recipients_count} subscribers!`)
        setCampaign((prev) => ({ ...prev, status: 'sent', recipient_count: data.recipients_count }))
        setTimeout(() => setSaveMessage(''), 4000)
      }
    } catch (error) {
      console.error('[v0] Send error:', error)
      setSaveMessage('Error sending newsletter')
    } finally {
      setSaving(false)
    }
  }

  const scheduleCampaign = async () => {
    if (!campaign.scheduled_for) {
      setSaveMessage('Please select a date and time')
      return
    }
    setCampaign((prev) => ({ ...prev, status: 'scheduled' }))
    await saveCampaign()
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/newsletter">
              <Button variant="outline" className="bg-transparent border-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {campaign.id ? 'Edit Campaign' : 'New Newsletter'}
              </h1>
              <p className="text-white/60 mt-1">{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="bg-transparent border-white/20"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>

        {saveMessage && (
          <div className="bg-[#00C853]/20 border border-[#00C853] text-[#00C853] p-4 rounded-lg">
            {saveMessage}
          </div>
        )}

        {!showPreview ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="bg-[#0B1E3F] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Newsletter Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Campaign Title *</label>
                  <Input
                    value={campaign.title}
                    onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
                    placeholder="e.g., January 2026 Service Discounts"
                    className="bg-white/10 border-white/20 text-white"
                    disabled={!isEditing && campaign.id}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Subject Line *</label>
                  <Input
                    value={campaign.subject_line}
                    onChange={(e) => setCampaign({ ...campaign, subject_line: e.target.value })}
                    placeholder="What will appear in the email subject line?"
                    className="bg-white/10 border-white/20 text-white"
                    disabled={!isEditing && campaign.id}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Description</label>
                  <Input
                    value={campaign.description}
                    onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                    placeholder="Brief description for internal use"
                    className="bg-white/10 border-white/20 text-white"
                    disabled={!isEditing && campaign.id}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Content */}
            <Card className="bg-[#0B1E3F] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Newsletter Content *</CardTitle>
              </CardHeader>
              <CardContent>
                <NewsletterRichTextEditor
                  value={campaign.content}
                  onChange={(content) => setCampaign({ ...campaign, content })}
                />
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="bg-[#0B1E3F] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Call to Action
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">CTA Button Text</label>
                  <Input
                    value={campaign.cta_text}
                    onChange={(e) => setCampaign({ ...campaign, cta_text: e.target.value })}
                    placeholder="e.g., Get Your Quote"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">CTA Link</label>
                  <Input
                    value={campaign.cta_url}
                    onChange={(e) => setCampaign({ ...campaign, cta_url: e.target.value })}
                    placeholder="https://powerwashbros.co.uk/get-quote"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Targeting & Scheduling */}
            <Card className="bg-[#0B1E3F] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recipients & Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Target Group</label>
                  <select
                    value={campaign.target_group}
                    onChange={(e) => setCampaign({ ...campaign, target_group: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-2.5"
                  >
                    <option value="all" className="bg-[#0B1E3F]">
                      All Subscribers
                    </option>
                    <option value="service_discount" className="bg-[#0B1E3F]">
                      Service Discount List
                    </option>
                    <option value="premium" className="bg-[#0B1E3F]">
                      Premium Members
                    </option>
                    <option value="engaged" className="bg-[#0B1E3F]">
                      Engaged Subscribers
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Send Date & Time (Optional)</label>
                  <Input
                    type="datetime-local"
                    value={campaign.scheduled_for}
                    onChange={(e) => setCampaign({ ...campaign, scheduled_for: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <p className="text-xs text-white/60 mt-2">Leave empty to send immediately</p>
                </div>

                {campaign.recipient_count > 0 && (
                  <div className="p-3 bg-[#00C853]/20 rounded-lg border border-[#00C853]/30">
                    <p className="text-sm text-white">
                      This newsletter will be sent to <span className="font-bold text-[#00C853]">{campaign.recipient_count}</span> subscribers
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 sticky bottom-6">
              <Button
                onClick={saveCampaign}
                disabled={saving}
                className="bg-[#00C853] hover:bg-[#00C853]/90 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>

              {campaign.id && campaign.status === 'draft' && (
                <>
                  <Button
                    onClick={scheduleCampaign}
                    disabled={saving}
                    variant="outline"
                    className="border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF]/10 bg-transparent"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>

                  <Button
                    onClick={sendCampaign}
                    disabled={saving}
                    className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white ml-auto"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#0B1E3F] border border-white/10 rounded-lg p-8 space-y-6">
            {/* Email Preview */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
              {/* Email Header with PowerWash Bros Branding */}
              <div className="bg-gradient-to-r from-[#0B1E3F] to-[#1E90FF] p-8 text-center">
                <div className="text-2xl font-bold text-white mb-2">PowerWash Bros</div>
                <div className="text-sm text-white/80">Professional Property Cleaning Services</div>
              </div>

              {/* Email Content */}
              <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{campaign.title || 'Newsletter Title'}</h1>

                <div className="prose prose-sm max-w-none text-gray-700 mb-6 whitespace-pre-wrap">
                  {campaign.content}
                </div>

                {campaign.cta_text && campaign.cta_url && (
                  <div className="mb-6">
                    <a
                      href={campaign.cta_url}
                      className="inline-block bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold py-3 px-6 rounded-lg"
                    >
                      {campaign.cta_text}
                    </a>
                  </div>
                )}
              </div>

              {/* Email Footer with PowerWash Bros Details */}
              <div className="bg-gray-50 border-t p-6 text-center text-xs text-gray-600">
                <p className="font-semibold text-gray-900 mb-1">PowerWash Bros</p>
                <p>Professional External Property Maintenance</p>
                <p className="mt-2">Dorset | WhatsApp: +44 7418 610731</p>
                <p className="mt-3 text-gray-500">
                  You're receiving this because you signed up for service discount notifications.{' '}
                  <a href="#" className="text-[#00C853] hover:underline">
                    Manage preferences
                  </a>
                </p>
              </div>
            </div>

            <div className="text-center text-white/60 text-sm">
              {campaign.recipient_count > 0 && (
                <p>This newsletter will be sent to {campaign.recipient_count} subscribers</p>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
