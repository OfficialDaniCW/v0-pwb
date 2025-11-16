import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PWBFooter() {
  return (
    <footer className="bg-[#0B1E3F] border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Column 1 - About PWB */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E90FF]">
                <span className="text-sm font-bold text-white">PWB</span>
              </div>
              <span className="font-bold text-white text-lg">PowerWash Bros</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Dorset's biocide-trained property care specialists
            </p>
            
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/powerwashbrosltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 
                           hover:bg-[#1E90FF] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61570513635891"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 
                           hover:bg-[#1E90FF] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@powerwashbrosltd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 
                           hover:bg-[#1E90FF] hover:text-white transition-all"
                aria-label="TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 text-xs text-white/60">
              <div>✓ Biocide Trained & Registered</div>
              <div>✓ PASMA Trained</div>
              <div>✓ Fully Insured</div>
              <div>✓ 4.9★ Google Rating</div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-[#1E90FF] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#1E90FF] transition-colors">Services</Link></li>
              <li><Link href="/powerups" className="hover:text-[#1E90FF] transition-colors">PowerUps Range</Link></li>
              <li><Link href="/our-work" className="hover:text-[#1E90FF] transition-colors">Our Work</Link></li>
              <li><Link href="/blog" className="hover:text-[#1E90FF] transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-[#1E90FF] transition-colors">FAQs</Link></li>
              <li><Link href="/quote" className="hover:text-[#1E90FF] transition-colors">Get Quote</Link></li>
              <li><Link href="/pricing" className="hover:text-[#1E90FF] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Services</h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/services/residential" className="hover:text-[#1E90FF] transition-colors">Residential Services</Link></li>
              <li><Link href="/services/commercial" className="hover:text-[#1E90FF] transition-colors">Commercial Services</Link></li>
              <li><Link href="/services/driveway-cleaning" className="hover:text-[#1E90FF] transition-colors">Driveway Restoration</Link></li>
              <li><Link href="/services/roof-cleaning" className="hover:text-[#1E90FF] transition-colors">Roof Cleaning</Link></li>
              <li><Link href="/services/gutter-cleaning" className="hover:text-[#1E90FF] transition-colors">Gutter Cleaning</Link></li>
              <li><Link href="/services/exterior-walls" className="hover:text-[#1E90FF] transition-colors">Wall & Render</Link></li>
              <li><Link href="/services/patio-decking" className="hover:text-[#1E90FF] transition-colors">Patio & Decking</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h5>
            <div className="space-y-3 text-sm text-white/70">
              <a href="tel:07418610731" className="flex items-center gap-2 hover:text-[#1E90FF] transition-colors">
                <Phone className="h-4 w-4" />
                <span>07418 610731</span>
              </a>
              <a href="mailto:info@powerwashbros.co.uk" className="flex items-center gap-2 hover:text-[#1E90FF] transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@powerwashbros.co.uk</span>
              </a>
              <div className="flex items-start gap-2 text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Service Areas:</div>
                  <div className="mt-1 text-xs">
                    Swanage • Purbeck<br />
                    Bournemouth • Poole<br />
                    Wimborne • Wareham<br />
                    Christchurch • Dorset
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <Button
                asChild
                className="w-full bg-[#00C853] text-white font-medium rounded-lg mt-4
                           hover:bg-[#00A843] transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>

              {/* Newsletter Signup */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-white/60 mb-2">Subscribe to our newsletter</p>
                <form action="/api/newsletter" method="POST" className="flex gap-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 text-sm h-9"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white shrink-0"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2025 PowerWash Bros Ltd. All rights reserved. Company No. 16100439</p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="/privacy" className="hover:text-[#1E90FF] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#1E90FF] transition-colors">Terms & Conditions</Link>
            <Link href="/cookies" className="hover:text-[#1E90FF] transition-colors">Cookie Policy</Link>
            {/* Portal link for admin access */}
            <Link href="/admin/pwb" className="hover:text-[#1E90FF] transition-colors">Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
