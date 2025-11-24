import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Shield, Award, Heart, Users, CheckCircle2, Target, Eye, Leaf, Linkedin } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "About Us | PowerWash Bros | Dorset's Property Care Brothers",
  description: "Meet the brothers behind PowerWash Bros. Founded in November 2024 with a passion for property restoration and biocide-trained expertise.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Quality Over Speed",
      description: "We're not the fastest, but we're the most thorough."
    },
    {
      icon: Users,
      title: "Education First",
      description: "We help you understand what your property needs and why."
    },
    {
      icon: Heart,
      title: "Honest Advice",
      description: "If you don't need a service, we'll tell you."
    },
    {
      icon: Shield,
      title: "Professional Standards",
      description: "Trained, insured, certified, accountable."
    }
  ]

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Meet Dorset's Property Care Brothers
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Founded in November 2024 by two brothers with a passion for property restoration
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Founders */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet the Founders</h2>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Founders Photo */}
                <div className="glass-border rounded-2xl overflow-hidden">
                  <Image
                    src="/founders-photo.jpg"
                    alt="Daniel Calvo-Westcott and Santos Calvo-Westcott, founders of PowerWash Bros"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Founders Info */}
                <div className="space-y-8">
                  {/* Daniel */}
                  <div className="glass-border rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          Daniel Calvo-Westcott
                        </h3>
                        <p className="text-[#1E90FF] font-medium">Co-Founder</p>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/danicw/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0077B5]/20 
                                   hover:bg-[#0077B5]/30 transition-all group"
                        aria-label="Daniel's LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5 text-[#0077B5] group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      With a background in property management and a passion for restoration, Daniel brings 
                      technical expertise and business acumen to PowerWash Bros. His commitment to quality and 
                      customer service drives the company's property-centred approach.
                    </p>
                  </div>

                  {/* Santos */}
                  <div className="glass-border rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          Santos Calvo-Westcott
                        </h3>
                        <p className="text-[#1E90FF] font-medium">Co-Founder</p>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/santos-calvo-westcott-41a135102/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0077B5]/20 
                                   hover:bg-[#0077B5]/30 transition-all group"
                        aria-label="Santos's LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5 text-[#0077B5] group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      Santos combines hands-on technical skills with a deep understanding of Dorset's unique 
                      property challenges. His biocide training and dedication to eco-friendly solutions ensure 
                      every project delivers lasting results whilst protecting the environment.
                    </p>
                  </div>

                  <div className="pt-6 text-center">
                    <p className="text-white/60 text-sm">
                      Two brothers, one mission: transforming and protecting Dorset's properties
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose PWB */}
        <section className="py-16 bg-gradient-to-br from-[#1E90FF]/10 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose PWB?</h2>
              <p className="text-2xl font-semibold text-[#1E90FF] mb-8">
                Exceptional Service. Outstanding Results.
              </p>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                Choose PowerWash Bros for professional, high-quality exterior cleaning services. We focus on 
                delivering the best customer experience with reliable, eco-friendly solutions that leave your 
                property looking its absolute best. Our expert team is dedicated to precision, care, and results 
                that last.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  PowerWash Bros started with a simple observation: most property cleaning companies treat every job 
                  the same. Cookie-cutter quotes, rushed work, temporary results.
                </p>
                <p>
                  We knew there was a better way.
                </p>
                <p>
                  As Dorset locals, we've seen firsthand how the coastal climate, tree coverage, and historic architecture 
                  create unique challenges for property owners. We realized that effective property care requires 
                  understanding - understanding your specific property, your specific surfaces, and your specific needs.
                </p>
                <p>
                  That's why we invested in biocide training, developed our PowerUps product range, and built our business 
                  around the Property-Centred Approach. We don't just clean surfaces; we protect property investments.
                </p>
                <p className="font-semibold text-white">
                  Today, we're proud to serve hundreds of Dorset property owners who trust us to care for their homes 
                  and businesses with the expertise and attention they deserve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Why We're Different</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-border rounded-2xl p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mx-auto mb-6">
                    <Award className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Biocide Trained & Registered</h3>
                  <p className="text-white/70 leading-relaxed">
                    We've invested in professional training and certification because we believe in doing things properly. 
                    Our biocide expertise means we can tackle organic growth at its source - not just clean surfaces temporarily.
                  </p>
                </div>

                <div className="glass-border rounded-2xl p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mx-auto mb-6">
                    <Shield className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">PowerUps Range</h3>
                  <p className="text-white/70 leading-relaxed">
                    We developed our own chemical range because off-the-shelf products weren't giving our customers the 
                    results they deserved. PowerUps is formulated specifically for Dorset properties and conditions.
                  </p>
                </div>

                <div className="glass-border rounded-2xl p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mx-auto mb-6">
                    <Heart className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Property-Centred Approach</h3>
                  <p className="text-white/70 leading-relaxed">
                    No two properties are the same, and no two jobs should be either. We assess, plan, and execute every 
                    job based on what YOUR property actually needs - not what's quickest for us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="glass-border rounded-xl p-6">
                    <value.icon className="h-10 w-10 text-[#1E90FF] mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-white/70">{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                <div className="glass-border rounded-xl p-6">
                  <Users className="h-10 w-10 text-[#1E90FF] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Local Pride</h3>
                  <p className="text-sm text-white/70">We live here. Your property matters to us.</p>
                </div>
                <div className="glass-border rounded-xl p-6">
                  <CheckCircle2 className="h-10 w-10 text-[#1E90FF] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Long-Term Thinking</h3>
                  <p className="text-sm text-white/70">Building relationships, not just completing jobs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Certifications & Training</h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "Biocide Training Certificate",
                  "Public Liability Insurance",
                  "Professional Affiliations",
                  "Environmental Standards"
                ].map((cert) => (
                  <div key={cert} className="glass-border rounded-xl p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853]/20 mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-[#00C853]" />
                    </div>
                    <p className="text-sm text-white/90">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy, Mission & Vision */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Our Philosophy, Mission & Vision
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Our Philosophy */}
                <div className="glass-border rounded-2xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6">
                    <Leaf className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Our Philosophy</h3>
                  <p className="text-sm font-semibold text-[#00C853] mb-3">
                    Cleaning with Care, Precision, and Purpose
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    At PowerWash Bros, we believe that every property deserves the highest level of care and 
                    attention. Our philosophy is rooted in delivering exceptional results whilst protecting the 
                    environment. We combine expert techniques, eco-friendly products, and a passion for precision 
                    to ensure every service enhances the beauty and longevity of your property.
                  </p>
                </div>

                {/* Company Mission */}
                <div className="glass-border rounded-2xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853]/20 mb-6">
                    <Target className="h-8 w-8 text-[#00C853]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Company Mission</h3>
                  <p className="text-sm font-semibold text-[#1E90FF] mb-3">
                    To Transform and Protect Every Property
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    At PowerWash Bros, we believe that every property deserves the highest level of care and 
                    attention. Our philosophy is rooted in delivering exceptional results whilst protecting the 
                    environment. We combine expert techniques, eco-friendly products, and a passion for precision 
                    to ensure every service enhances the beauty and longevity of your property.
                  </p>
                </div>

                {/* Our Vision */}
                <div className="glass-border rounded-2xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6">
                    <Eye className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-sm font-semibold text-[#00C853] mb-3">
                    Setting the Standard for Excellence in Exterior Cleaning
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    We envision becoming Dorset's leading name in exterior property care. By continually innovating 
                    our techniques and focusing on sustainable practices, we aim to transform homes and businesses 
                    whilst promoting eco-conscious cleaning solutions that benefit our community and the environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serving Dorset */}
        <section className="py-16 bg-gradient-to-br from-[#0B1E3F] to-[#0B1E3F]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Proud to Serve Dorset's Properties</h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                As Dorset locals, we understand our region's unique challenges - coastal salt buildup in Swanage, 
                heavy moss growth in tree-covered areas, historic properties throughout the county. We're invested in 
                making Dorset's properties beautiful and protected.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-white/70">
                <span>Bournemouth</span>
                <span>•</span>
                <span>Poole</span>
                <span>•</span>
                <span>Swanage</span>
                <span>•</span>
                <span>Wimborne</span>
                <span>•</span>
                <span>Christchurch</span>
                <span>•</span>
                <span>Wareham</span>
                <span>•</span>
                <span>Ferndown</span>
              </div>

              <div className="mt-12 glass-border rounded-2xl overflow-hidden bg-gradient-to-br from-[#1E90FF]/10 to-transparent p-8">
                <div className="relative aspect-[4/3] flex items-center justify-center text-[#1E90FF]/20">
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Dorset outline */}
                    <path d="M 100,300 L 150,250 L 200,200 L 280,180 L 350,170 L 420,180 L 500,200 L 580,230 L 650,270 L 700,320 L 720,380 L 700,440 L 650,480 L 580,500 L 500,510 L 420,500 L 350,480 L 280,460 L 220,430 L 170,390 L 130,350 L 100,300 Z" 
                          fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2"/>
                    
                    {/* Service area pins */}
                    <circle cx="200" cy="320" r="8" fill="#1E90FF" opacity="0.8"/>
                    <circle cx="300" cy="300" r="8" fill="#1E90FF" opacity="0.8"/>
                    <circle cx="380" cy="285" r="8" fill="#1E90FF" opacity="0.8"/>
                    <circle cx="420" cy="350" r="8" fill="#1E90FF" opacity="0.8"/>
                    <circle cx="290" cy="360" r="8" fill="#1E90FF" opacity="0.8"/>
                    <circle cx="520" cy="380" r="10" fill="#00C853" opacity="0.9"/>
                    <circle cx="450" cy="320" r="8" fill="#1E90FF" opacity="0.8"/>
                    
                    {/* Coastline */}
                    <path d="M 100,300 Q 120,320 150,310 T 200,320 T 250,340 L 280,360 L 320,390 L 350,410 L 400,430 L 450,450 L 500,460 L 550,465 L 600,460 L 650,450 L 700,420" 
                          stroke="currentColor" strokeWidth="2" opacity="0.3" fill="none"/>
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-semibold text-lg bg-[#0B1E3F]/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-[#1E90FF]/30">
                      Comprehensive Dorset Coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health & Safety and Terms of Service */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Our Commitment to Excellence
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Health & Safety Policy */}
                <div className="glass-border rounded-2xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853]/20 mb-6">
                    <Shield className="h-8 w-8 text-[#00C853]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Health & Safety Policy</h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    At PowerWash Bros, we are committed to ensuring the health, safety, and welfare of our employees, 
                    clients, and others who may be affected by our operations. We maintain the highest standards of 
                    health and safety performance, complying with all relevant legislation and best practices.
                  </p>
                  <ul className="space-y-3 text-white/70 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>IOSH Managing Safely training for supervisors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Fire Safety Awareness and Health & Safety at Work training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Regular risk assessments and equipment safety inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span>Comprehensive accident reporting and investigation system</span>
                    </li>
                  </ul>
                  <p className="text-xs text-white/50">
                    Policy effective date: 01/01/2025 | Review date: 01/01/2026
                  </p>
                </div>

                {/* Terms of Service */}
                <div className="glass-border rounded-2xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6">
                    <Award className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Terms of Service</h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    Our Terms of Service govern your use of our website and services. We provide professional 
                    exterior cleaning services with clear booking, cancellation, and payment policies designed 
                    to protect both our clients and our business.
                  </p>
                  <ul className="space-y-3 text-white/70 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                      <span>48 hours' notice required for cancellations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                      <span>Public liability insurance up to £5 million</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                      <span>Biocide-trained and registered professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                      <span>GDPR compliant data protection practices</span>
                    </li>
                  </ul>
                  <Link href="/terms" className="text-[#1E90FF] hover:underline text-sm font-semibold">
                    Read Full Terms of Service →
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm">
                  For full policy details, please contact us at{" "}
                  <a href="mailto:info@powerwashbros.co.uk" className="text-[#1E90FF] hover:underline">
                    info@powerwashbros.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience Property-Centred Care?
              </h2>
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
