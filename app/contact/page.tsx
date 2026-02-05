"use client"

import React from "react"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try WhatsApp or email directly.')
    }
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Ready to transform your property? We're here to help
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {/* WhatsApp */}
                <div className="glass-border rounded-2xl p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853]/20 mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-[#00C853]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-sm text-white/70 mb-4">Fastest response time</p>
                  <a
                    href="https://wa.me/447418610731"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00C853] hover:text-[#00A843] transition-colors font-medium"
                  >
                    07418 610731
                  </a>
                </div>

                {/* Phone */}
                <div className="glass-border rounded-2xl p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mx-auto mb-4">
                    <Phone className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                  <p className="text-sm text-white/70 mb-4">Call us directly</p>
                  <a
                    href="tel:07418610731"
                    className="text-[#1E90FF] hover:text-[#1E90FF]/80 transition-colors font-medium"
                  >
                    07418 610731
                  </a>
                </div>

                {/* Email */}
                <div className="glass-border rounded-2xl p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mx-auto mb-4">
                    <Mail className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                  <p className="text-sm text-white/70 mb-4">Send us a message</p>
                  <a
                    href="mailto:info@powerwashbros.co.uk"
                    className="text-[#1E90FF] hover:text-[#1E90FF]/80 transition-colors font-medium break-all"
                  >
                    info@powerwashbros.co.uk
                  </a>
                </div>
              </div>

              {/* Contact Form & Info */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="glass-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                  
                  {status === 'success' && (
                    <div className="mb-6 p-4 bg-[#00C853]/20 border border-[#00C853]/30 rounded-lg text-white">
                      Thank you! We'll get back to you within 24 hours.
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
                      <p className="font-semibold mb-2">Message not sent</p>
                      <p className="text-sm">{errorMessage}</p>
                      <p className="text-xs mt-2 text-red-300">Please try WhatsApp or call directly for immediate assistance.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white mb-2 block">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                          placeholder="07XXX XXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-white mb-2 block">Subject *</Label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[150px]"
                        placeholder="Tell us about your property needs..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={status === 'sending'}
                      size="lg"
                      className="w-full bg-[#1E90FF] text-white font-semibold rounded-lg
                                 hover:bg-[#1E90FF]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </Button>
                  </form>
                </div>

                {/* Business Info */}
                <div className="space-y-6">
                  <div className="glass-border rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Our Location</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#1E90FF] mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Based in Swanage</p>
                          <p className="text-sm text-white/70">Serving all of Purbeck and Dorset</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#1E90FF] mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Operating Hours</p>
                          <p className="text-sm text-white/70">Monday - Saturday: 8am - 6pm</p>
                          <p className="text-sm text-white/70">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link
                        href="/service-areas"
                        className="flex items-center gap-2 text-[#1E90FF] hover:text-[#1E90FF]/80 transition-colors font-medium"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>View All Service Areas</span>
                      </Link>
                    </div>
                  </div>

                  <div className="glass-border rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Why Contact Us?</h3>
                    <ul className="space-y-3 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span>Free property assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span>No-obligation quotes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span>Expert advice on property care</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span>Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span>Flexible scheduling available</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Prefer to Chat?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Most customers find WhatsApp is the quickest way to get a quote
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
