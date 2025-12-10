"use client"
import { Instagram, Facebook, Mail, Phone, MapPin, Send, ArrowUp } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export function PWBFooter() {
  return (
    <footer className="relative bg-[#0B1E3F] text-white overflow-hidden">
      {/* Background Pattern with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/backgrounds/pwb-dark-white.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                <Image src="/images/pwb-logo-circle.png" alt="PowerWash Bros Logo" fill className="object-contain" />
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Dorsets leading pressure washing company.
              </p>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-white">Open Hours:</h4>
              <div className="text-xs sm:text-sm text-white/70 space-y-0.5 sm:space-y-1">
                <p>Mon – Fri: 8 am – 5 pm</p>
                <p>Saturday: 8am – 6pm</p>
                <p>Sunday: 9am – 3pm</p>
              </div>
            </div>
          </div>

          {/* Column 2: Official info */}
          <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold">Official info</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/70">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E90FF] shrink-0 mt-0.5" />
                <span>Hardingredmans, Bridge House, Court Road, Swanage, BH19 1DX</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E90FF] shrink-0" />
                <a href="tel:07418610731" className="hover:text-white transition-colors">
                  07418610731
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E90FF] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="mailto:info@powerwashbros.co.uk" className="hover:text-white transition-colors break-all">
                    info@powerwashbros.co.uk
                  </a>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4 pt-2 flex-wrap">
              <a
                href="https://www.google.com/maps/place/Powerwash+Bros+Ltd/@50.6119,-1.9598,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#1E90FF] transition-colors"
                aria-label="Google Reviews"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </a>
              <a
                href="https://uk.trustpilot.com/review/powerwashbros.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00B67A] transition-colors"
                aria-label="Trustpilot Reviews"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61570513635891"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#1E90FF] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/powerwashbrosltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#1E90FF] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@powerwashbrosltd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#1E90FF] transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#1E90FF] transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/services/driveway-cleaning" className="hover:text-[#1E90FF] transition-colors">
                  Driveway Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/roof-cleaning" className="hover:text-[#1E90FF] transition-colors">
                  Roof Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/patio-decking" className="hover:text-[#1E90FF] transition-colors">
                  Patio & Decking
                </Link>
              </li>
              <li>
                <Link href="/services/gutter-cleaning" className="hover:text-[#1E90FF] transition-colors">
                  Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/render-cleaning" className="hover:text-[#1E90FF] transition-colors">
                  Render Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/softwash" className="hover:text-[#1E90FF] transition-colors">
                  Softwash
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="hover:text-[#1E90FF] transition-colors">
                  Commercial Services
                </Link>
              </li>
              <li>
                <Link href="/services/residential" className="hover:text-[#1E90FF] transition-colors">
                  Residential Services
                </Link>
              </li>
              <li>
                <Link href="/services/graffiti-removal" className="hover:text-[#1E90FF] transition-colors">
                  Graffiti Removal
                </Link>
              </li>
              <li>
                <Link href="/services/solar-panel-cleaning" className="hover:text-[#1E90FF] transition-colors">
                  Solar Panel Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/heritage-buildings" className="hover:text-[#1E90FF] transition-colors">
                  Heritage Buildings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold">Newsletter</h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Subscribe to our newsletter to get our latest updates & news
            </p>
            <form className="flex gap-0 max-w-sm">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Your mail address"
                  className="bg-[#1A2C4E] border-none text-white placeholder:text-white/40 h-10 sm:h-12 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                />
              </div>
              <Button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="h-10 sm:h-12 w-10 sm:w-12 min-w-[48px] min-h-[48px] rounded-l-none bg-[#1E90FF] hover:bg-[#1E90FF]/90 p-0 flex items-center justify-center"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-[#0033CC] py-4 sm:py-6">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <p className="text-xs sm:text-sm text-white/90 text-center">
            2025 © All rights reserved by <span className="font-bold">PowerwashBros Ltd</span>
            <span className="hidden sm:inline"> | Company no. 16100439</span>
          </p>
          <p className="text-xs text-white/70 sm:hidden">Company no. 16100439</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <Link href="/data-deletion" className="hover:text-white transition-colors">
              Data Deletion
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="h-8 w-8 sm:h-10 sm:w-10 bg-[#1E90FF] rounded flex items-center justify-center hover:bg-white hover:text-[#1E90FF] transition-all shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* TrueNorthTech credit bar */}
      <div className="relative z-10 bg-black py-2 sm:py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <p className="text-xs text-white/80 text-center">
            created by{" "}
            <a
              href="https://www.truenorthtech.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-[#1E90FF] transition-colors"
            >
              TrueNorthTech
            </a>{" "}
            &lt;3
          </p>
        </div>
      </div>
    </footer>
  )
}
