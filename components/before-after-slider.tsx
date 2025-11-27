"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  alt: string
}

export function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== "click") return

    const container = e.currentTarget.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const position = ((clientX - container.left) / container.width) * 100

    setSliderPosition(Math.min(Math.max(position, 0), 100))
  }

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-xl cursor-col-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
      onClick={handleMove}
      role="slider"
      aria-label={`Before and after comparison slider for ${alt}`}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage || "/placeholder.svg"}
          alt={`${alt} - After`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
          className="object-cover"
          priority={false}
          quality={75}
        />
        <div className="absolute top-4 right-4 bg-[#00C853] text-white px-4 py-2 rounded-full text-sm font-bold">
          AFTER
        </div>
      </div>

      {/* Before Image (Overlay) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image
          src={beforeImage || "/placeholder.svg"}
          alt={`${alt} - Before`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
          className="object-cover"
          priority={false}
          quality={75}
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
          BEFORE
        </div>
      </div>

      {/* Slider Handle */}
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-2xl">
          <div className="flex items-center gap-0.5">
            <ChevronLeft className="h-4 w-4 text-[#0B1E3F]" />
            <ChevronRight className="h-4 w-4 text-[#0B1E3F]" />
          </div>
        </div>
      </div>
    </div>
  )
}
