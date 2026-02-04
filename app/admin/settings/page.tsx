'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Lock, Mail, Check, Eye, EyeOff } from 'lucide-react'

export default function AdminSettings() {
  const [email, setEmail] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [activeTab, setActiveTab] = useState<'password' | 'email'>('password')
  const router = useRouter()

  // Load current email from localStorage on mount
  useEffect(() => {
    const adminEmail = localStorage.getItem('admin-email')
    if (adminEmail) {
      setCurrentEmail(adminEmail)
    }
  }, [])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'All fields are required' })
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters' })
      return
    }

    setLoading(true)
    try {
      const adminEmail = localStorage.getItem('admin-email')
      const response = await fetch('/api/admin/settings/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': adminEmail || '',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change password' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!email || !currentPassword) {
      setMessage({ type: 'error', text: 'Email and password are required' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Invalid email format' })
      return
    }

    setLoading(true)
    try {
      const adminEmail = localStorage.getItem('admin-email')
      const response = await fetch('/api/admin/settings/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': adminEmail || '',
        },
        body: JSON.stringify({
          newEmail: email,
          currentPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Email changed successfully. Please log in again.' })
        localStorage.removeItem('admin-email')
        setTimeout(() => router.push('/admin/login'), 2000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change email' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Account Settings</h1>
          <p className="text-white/60">Manage your admin account security and contact information</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'password'
                ? 'border-[#00C853] text-[#00C853]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Lock className="inline h-4 w-4 mr-2" />
            Change Password
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'email'
                ? 'border-[#00C853] text-[#00C853]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Mail className="inline h-4 w-4 mr-2" />
            Change Email
          </button>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`p-4 rounded-lg border flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-[#00C853]/10 border-[#00C853]/30 text-[#00C853]'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <div className="mt-1">
              {message.type === 'success' ? (
                <Check className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>
            <span>{message.text}</span>
          </div>
        )}

        {/* Password Change Tab */}
        {activeTab === 'password' && (
          <Card className="bg-secondary border-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#00C853]" />
                Change Your Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <Label className="text-white mb-2">Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="bg-primary border-white/20"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">New Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 8 characters)"
                      className="bg-primary border-white/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2">Confirm New Password</Label>
                  <Input
                    type={showPasswords ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-primary border-white/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Email Change Tab */}
        {activeTab === 'email' && (
          <Card className="bg-secondary border-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#00C853]" />
                Change Your Email Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailChange} className="space-y-4 max-w-md">
                <div>
                  <Label className="text-white mb-2">Current Email</Label>
                  <Input
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    disabled
                    className="bg-primary/50 border-white/10 text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">New Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter new email address"
                    className="bg-primary border-white/20"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">Confirm Your Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your password to confirm"
                    className="bg-primary border-white/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold"
                >
                  {loading ? 'Updating...' : 'Update Email'}
                </Button>

                <p className="text-xs text-white/50 mt-4">
                  You will need to log in again with your new email address after this change.
                </p>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
