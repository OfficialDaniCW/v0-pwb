'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InfoTooltipProps {
  title: string
  description: string
  benefits?: string[]
}

export function InfoTooltip({ title, description, benefits }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center h-5 w-5 rounded-full border border-white/30 hover:border-[#00C853] transition-colors hover:bg-white/5"
        aria-label={`Information about ${title}`}
      >
        <Info className="h-3 w-3 text-white/70 hover:text-[#00C853]" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-white/10 max-w-md w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#00C853]/20 flex items-center justify-center">
                  <Info className="h-5 w-5 text-[#00C853]" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-white/80 leading-relaxed">{description}</p>

              {benefits && benefits.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-white uppercase tracking-wide">Why This Matters:</p>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="text-[#00C853] font-bold mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/20 border-t border-white/10 rounded-b-xl flex gap-3">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
