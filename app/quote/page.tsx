"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Phone, Mail, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    propertyType: '',
    serviceNeeded: '',
    details: '',
    contactMethod: 'whatsapp'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-[#0B1E3F] to-[#0B1E3F]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get Your Free Property Assessment
              </h1>
              <p className="text-xl text-white/80">
                Chat with us on WhatsApp or complete the form below
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              {/* WhatsApp Option */}
              <div className="glass-border-enhanced rounded-2xl p-8">
                <MessageCircle className="h-12 w-12 text-[#00C853] mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Option 1: WhatsApp (Fastest)</h2>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Prefer to chat? Most customers find WhatsApp quickest:
                </p>
                <ul className="space-y-2 mb-6 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                    <span>Send photos of your property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                    <span>Get immediate responses (usually within 2 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                    <span>Ask questions anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                    <span>Book your free assessment</span>
                  </li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#00C853] text-white font-semibold rounded-lg
                             hover:bg-[#00A843] transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Start WhatsApp Chat
                  </a>
                </Button>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="font-semibold text-white mb-4">Other Contact Methods:</h3>
                  <div className="space-y-3">
                    <a href="tel:07418610731" className="flex items-center gap-3 text-white/80 hover:text-[#1E90FF] transition-colors">
                      <Phone className="h-5 w-5" />
                      <span>07418 610731</span>
                    </a>
                    <a href="mailto:info@powerwashbros.co.uk" className="flex items-center gap-3 text-white/80 hover:text-[#1E90FF] transition-colors">
                      <Mail className="h-5 w-5" />
                      <span>info@powerwashbros.co.uk</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quote Form */}
              <div className="glass-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Option 2: Quote Request Form</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
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
                          className="bg-white/5 border border-white/10 text-white placeholder:text-white/40"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white mb-2 block">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                          placeholder="07XXX XXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="postcode" className="text-white mb-2 block">Postcode *</Label>
                      <Input
                        id="postcode"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        placeholder="BH19 1DX"
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="propertyType" className="text-white mb-2 block">Property Type *</Label>
                      <select
                        id="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
                      >
                        <option value="">Select property type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="heritage">Heritage/Listed</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="serviceNeeded" className="text-white mb-2 block">Service Needed *</Label>
                      <select
                        id="serviceNeeded"
                        required
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({...formData, serviceNeeded: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
                      >
                        <option value="">Select service</option>
                        <option value="driveway">Driveway Cleaning</option>
                        <option value="roof">Roof Cleaning</option>
                        <option value="gutter">Gutter Cleaning</option>
                        <option value="walls">Exterior Walls & Render</option>
                        <option value="patio">Patio & Decking</option>
                        <option value="commercial">Commercial Property</option>
                        <option value="heritage">Heritage Building</option>
                        <option value="multiple">Multiple Services</option>
                        <option value="unsure">Not Sure - Need Advice</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="details" className="text-white mb-2 block">Property Details *</Label>
                      <Textarea
                        id="details"
                        required
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
                        placeholder="Tell us about your property - size, current condition, any specific concerns..."
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#1E90FF] text-white font-semibold rounded-lg
                               hover:bg-[#1E90FF]/90 transition-all"
                  >
                    Request Free Assessment
                  </Button>

                  <p className="text-xs text-white/60 text-center">
                    We'll respond within 24 hours (usually much faster via WhatsApp)
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
