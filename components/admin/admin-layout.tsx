"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, ImageIcon, Calculator, Mail, LogOut, Menu, X, Package, Layers, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdminLayoutProps {
  children: React.ReactNode
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export default function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [currentHash, setCurrentHash] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const cookies = document.cookie.split(";")
    const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith("admin-session="))

    if (!sessionCookie || !sessionCookie.includes("authenticated")) {
      router.push("/admin/login")
    } else {
      const email = localStorage.getItem("admin-email")
      setCurrentUser(email)
    }
  }, [router])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      setCurrentHash(hash)
      if (onSectionChange) {
        onSectionChange(hash || "dashboard")
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [onSectionChange])

  const handleLogout = () => {
    document.cookie = "admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("admin-email")
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin/pwb#dashboard", icon: Home, label: "Dashboard", section: "dashboard" },
    { href: "/admin/pwb#blog", icon: FileText, label: "Blog Posts", section: "blog" },
    { href: "/admin/pwb#gallery", icon: ImageIcon, label: "Gallery", section: "gallery" },
    { href: "/admin/pwb#works", icon: Layers, label: "Our Works", section: "works" },
    { href: "/admin/pwb#pricing", icon: Calculator, label: "Pricing", section: "pricing" },
    { href: "/admin/newsletter", icon: Mail, label: "Newsletter", section: "newsletter" },
    { href: "/admin/quotes", icon: Package, label: "Quote Requests", section: "quotes" },
    { href: "/admin/settings", icon: Settings, label: "Settings", section: "settings" },
  ]

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.href === "/admin/newsletter") {
      return pathname === "/admin/newsletter"
    }
    if (item.href === "/admin/quotes") {
      return pathname === "/admin/quotes"
    }
    if (item.href === "/admin/settings") {
      return pathname === "/admin/settings"
    }

    if (pathname === "/admin/pwb" || pathname?.startsWith("/admin/pwb")) {
      if (item.section === "dashboard") {
        return !currentHash || currentHash === "" || currentHash === "dashboard"
      }
      return currentHash === item.section
    }

    return false
  }

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setSidebarOpen(false)
    if (item.section && onSectionChange) {
      onSectionChange(item.section)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <header className="bg-secondary sticky top-0 z-50 shadow-lg border-b border-border">
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/pwb-logo-circle.png"
                  alt="PowerWash Bros"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="hidden md:block">
                <span className="text-lg font-bold text-foreground">PowerWash Bros</span>
                <p className="text-xs text-accent">Admin Portal</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">{currentUser}</p>
                  <p className="text-xs text-accent">Administrator</p>
                </div>
              )}
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-foreground hover:text-destructive hover:bg-accent/10"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
              <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="ghost" className="md:hidden text-foreground">
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:block w-16 bg-secondary border-r border-border">
          <TooltipProvider delayDuration={0}>
            <nav className="p-2 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = isItemActive(item)

                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item)}
                        className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                          isActive
                            ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-primary text-foreground border-border">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </nav>
          </TooltipProvider>
        </aside>

        {/* Mobile Sidebar - keep full labels for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-secondary shadow-xl">
              <div className="p-4 bg-primary flex items-center gap-3 border-b border-border">
                <div className="relative w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/pwb-logo-circle.png"
                    alt="PowerWash Bros"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg font-bold text-foreground">PowerWash Bros</span>
                  <p className="text-xs text-accent">Admin Portal</p>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = isItemActive(item)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => handleNavClick(item)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-md"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-auto bg-card p-6">{children}</main>
      </div>

      <footer className="bg-secondary py-4 px-6 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© 2025 PowerWash Bros. All rights reserved.</p>
          <p>Property-centred pressure washing services across Purbeck and Dorset</p>
        </div>
      </footer>
    </div>
  )
}
