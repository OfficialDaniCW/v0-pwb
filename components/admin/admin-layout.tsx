"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, ImageIcon, Calculator, Mail, LogOut, Menu, X, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication
    const cookies = document.cookie.split(";")
    const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith("admin-session="))

    if (!sessionCookie || !sessionCookie.includes("authenticated")) {
      router.push("/admin/login")
    } else {
      // Get user email from localStorage if available
      const email = localStorage.getItem("admin-email")
      setCurrentUser(email)
    }
  }, [router])

  const handleLogout = () => {
    document.cookie = "admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("admin-email")
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin/pwb", icon: Home, label: "Dashboard" },
    { href: "/admin/pwb#blog", icon: FileText, label: "Blog Posts" },
    { href: "/admin/pwb#gallery", icon: ImageIcon, label: "Gallery" },
    { href: "/admin/pwb#pricing", icon: Calculator, label: "Pricing" },
    { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
    { href: "/admin/quotes", icon: Package, label: "Quote Requests" },
  ]

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ label: "Admin", href: "/admin/pwb" }]

    if (paths.length > 1) {
      for (let i = 1; i < paths.length; i++) {
        const label = paths[i].charAt(0).toUpperCase() + paths[i].slice(1)
        const href = "/" + paths.slice(0, i + 1).join("/")
        breadcrumbs.push({ label, href })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="min-h-screen bg-[#0B1E3F] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F2851] border-b border-white/10 sticky top-0 z-50">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E90FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PWB</span>
              </div>
              <div className="hidden md:block">
                <span className="text-xl font-semibold text-white">PowerWash Bros</span>
                <p className="text-xs text-neutral-400">Admin Portal</p>
              </div>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="hidden md:block text-right">
                  <p className="text-sm text-white">{currentUser}</p>
                  <p className="text-xs text-neutral-400">Administrator</p>
                </div>
              )}
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:text-red-400 hover:bg-white/10"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
              <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="ghost" className="md:hidden text-white">
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Breadcrumbs */}
          <nav className="mt-4 flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4 text-neutral-500" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-[#00C853] font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-neutral-400 hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-[#0F2851] border-r border-white/10">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || (item.href.includes("#") && pathname === item.href.split("#")[0])

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-[#1E90FF] text-white" : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0F2851] shadow-xl">
              <nav className="p-4 space-y-2 mt-20">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive ? "bg-[#1E90FF] text-white" : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F2851] border-t border-white/10 py-4 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-neutral-400">
          <p>© 2025 PowerWash Bros. All rights reserved.</p>
          <p>Property-centred pressure washing services across Purbeck and Dorset</p>
        </div>
      </footer>
    </div>
  )
}
