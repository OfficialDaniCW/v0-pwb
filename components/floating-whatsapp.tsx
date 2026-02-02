"use client"

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from "react"

export function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="https://wa.me/447418610731"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full 
                 text-success-foreground shadow-lg transition-all duration-300 
                 hover:scale-110 hover:shadow-xl animate-bounce-subtle
                 md:h-16 md:w-16"
      style={{
        backgroundColor: 'var(--success)',
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  )
}
