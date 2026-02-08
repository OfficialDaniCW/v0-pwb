"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Info, ImageIcon, FileText, Calculator, Mail, Briefcase, HelpCircle } from 'lucide-react'

export function SiteHeader() {
  const links = [
    { href: "/about", label: "About", icon: Info },
    { href: "/our-work", label: "Our Work", icon: ImageIcon },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/pricing", label: "Pricing", icon: Calculator },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/blog", label: "News", icon: FileText },
    { href: "/contact", label: "Contact Us", icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/pwb-logo-smaller.png" 
              alt="PowerWash Bros" 
              width={180} 
              height={32} 
              className="h-8 w-auto"
              sizes="(max-width: 768px) 150px, 180px"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-foreground/90 md:flex">
            <Link href="/about" className="hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/our-work" className="hover:text-accent transition-colors">
              Our Work
            </Link>
            <Link href="/services" className="hover:text-accent transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-accent transition-colors">
              FAQ
            </Link>
            <Link href="/blog" className="hover:text-accent transition-colors">
              News
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="hidden md:flex gap-2">
            <Button
              asChild
              className="font-medium rounded-lg px-6 py-2 transition-all"
              style={{
                backgroundColor: 'var(--success)',
                color: 'var(--success-foreground)',
              }}
            >
              <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border bg-primary/80 text-foreground hover:bg-primary"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="liquid-glass border-border p-0 w-64 flex flex-col bg-primary/95 overflow-y-auto">
                {/* Brand Header */}
                <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
                  <Image 
                    src="/images/pwb-logo-smaller.png" 
                    alt="PowerWash Bros" 
                    width={150} 
                    height={32} 
                    className="h-8 w-auto"
                    sizes="150px"
                  />
                </div>

                <nav className="flex flex-col gap-1 mt-2 text-foreground/80">
                  {links.map((link) => {
                    const IconComponent = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-accent transition-colors"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm">{link.label}</span>
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-auto border-t border-border p-4">
                  <Button
                    asChild
                    className="w-full font-medium rounded-lg transition-all"
                    style={{
                      backgroundColor: 'var(--success)',
                      color: 'var(--success-foreground)',
                    }}
                  >
                    <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
