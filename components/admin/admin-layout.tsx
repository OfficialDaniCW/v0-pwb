"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, ImageIcon, Calculator, Mail, LogOut, Menu, X, Package, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
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

  const handleLogout = () => {
    document.cookie = "admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("admin-email")
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin/pwb", icon: Home, label: "Dashboard" },
    { href: "/admin/pwb#blog", icon: FileText, label: "Blog Posts" },
    { href: "/admin/pwb#gallery", icon: ImageIcon, label: "Gallery" },
    { href: "/admin/pwb#works", icon: Layers, label: "Our Works" },
    { href: "/admin/pwb#pricing", icon: Calculator, label: "Pricing" },
    { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
    { href: "/admin/quotes", icon: Package, label: "Quote Requests" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#0B1E3F] sticky top-0 z-50 shadow-lg">
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - using correct path */}
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
                <span className="text-lg font-bold text-white">PowerWash Bros</span>
                <p className="text-xs text-gray-400">Admin Portal</p>
              </div>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-white">{currentUser}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
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
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 bg-[#0F2851] shadow-lg">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || (item.href.includes("#") && pathname === item.href.split("#")[0])

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive ? "bg-[#1E90FF] text-white shadow-md" : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
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
              <div className="p-4 bg-[#0B1E3F] flex items-center gap-3 border-b border-white/10">
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
                  <span className="text-lg font-bold text-white">PowerWash Bros</span>
                  <p className="text-xs text-gray-400">Admin Portal</p>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#1E90FF] text-white shadow-md"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
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

        <main className="flex-1 overflow-auto bg-gray-100">{children}</main>
      </div>

      <footer className="bg-[#0B1E3F] py-4 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>© 2025 PowerWash Bros. All rights reserved.</p>
          <p>Property-centred pressure washing services across Purbeck and Dorset</p>
        </div>
      </footer>
    </div>
  )
}
