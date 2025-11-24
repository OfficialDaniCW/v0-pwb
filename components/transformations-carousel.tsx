"use client"

import * as React from "react"
import Image from "next/image"
import { GripVertical, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transformation {
  id: string
  title: string
  location: string
  beforeImage: string
  afterImage: string
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "vicarage",
    title: "The Vicarage",
    location: "Swanage",
    beforeImage: "/images/after.jpg",
    afterImage: "/images/before4.jpg",
  },
  {
    id: "roof-clean-biocide",
    title: "Roof Clean & Biocide Treatment",
    location: "Dorset",
    beforeImage: "/images/before1.jpeg",
    afterImage: "/images/after1.jpeg",
  },
  {
    id: "swanage-patio",
    title: "Patio & Wall Refresh",
    location: "Swanage",
    beforeImage: "/images/portfolio/swanage-patio-before.jpg",
    afterImage: "/images/portfolio/swanage-patio-after.jpg",
  },
  {
    id: "garden-patio",
    title: "Garden Patio Restoration",
    location: "Wareham",
    beforeImage: "/images/portfolio/garden-patio-after.jpg",
    afterImage: "/images/portfolio/garden-patio-before.jpg",
  },
  {
    id: "patio-cleaning",
    title: "Patio Entrance Restoration",
    location: "Dorset",
    beforeImage: "/images/portfolio/patio-cleaning-before.jpg",
    afterImage: "/images/portfolio/patio-cleaning-after.jpg",
  },
  {
    id: "render-clean",
    title: "Render Cleaning",
    location: "Dorset",
    beforeImage: "/images/portfolio/render-clean-before.jpg",
    afterImage: "/images/portfolio/render-clean-after.jpg",
  },
]

export function TransformationsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [sliderPosition, setSliderPosition] = React.useState(50)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Auto-rotate slides
  React.useEffect(() => {
    if (isPaused || isDragging) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TRANSFORMATIONS.length)
      setSliderPosition(50) // Reset slider for new slide
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, isDragging])

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100

    setSliderPosition(percentage)
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleMove(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    handleMove(e.touches[0].clientX)
  }

  const handleInteractionEnd = () => {
    setIsDragging(false)
  }

  // Global event listeners for drag end
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleInteractionEnd)
      window.addEventListener("touchend", handleInteractionEnd)
    }
    return () => {
      window.removeEventListener("mouseup", handleInteractionEnd)
      window.removeEventListener("touchend", handleInteractionEnd)
    }
  }, [isDragging])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TRANSFORMATIONS.length)
    setSliderPosition(50)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TRANSFORMATIONS.length) % TRANSFORMATIONS.length)
    setSliderPosition(50)
  }

  const currentTransformation = TRANSFORMATIONS[currentIndex]

  return (
    <div
      className="w-full flex flex-col gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative group">
        {/* Main Slider Container */}
        <div
          ref={containerRef}
          className="relative aspect-video w-full overflow-hidden rounded-2xl glass-border select-none cursor-col-resize touch-none shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
        >
          {/* Before Image (Background) */}
          <Image
            src={currentTransformation.beforeImage || "/placeholder.svg"}
            alt={`Before ${currentTransformation.title}`}
            fill
            className="object-cover"
            priority
          />

          {/* Label: Before */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Before</span>
          </div>

          {/* After Image (Clipped Overlay) */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${sliderPosition}% 0 0)` }}>
            <Image
              src={currentTransformation.afterImage || "/placeholder.svg"}
              alt={`After ${currentTransformation.title}`}
              fill
              className="object-cover"
              priority
            />

            {/* Label: After */}
            <div className="absolute top-4 right-4 z-10 bg-[#1E90FF]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">After</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-[#1E90FF]">
              <GripVertical className="w-5 h-5" />
            </div>
          </div>

          {/* Project Info Overlay (Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white">{currentTransformation.title}</h3>
            <p className="text-white/80 text-sm">{currentTransformation.location}</p>
          </div>

          {/* Navigation Arrows (Visible on Hover) */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1E90FF] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-30"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1E90FF] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-30"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Thumbnails / Indicators */}
      <div className="flex justify-center gap-2 sm:gap-4 px-2">
        {TRANSFORMATIONS.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentIndex(index)
              setSliderPosition(50)
            }}
            className={cn(
              "relative h-16 w-24 sm:h-20 sm:w-32 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0",
              index === currentIndex
                ? "border-[#1E90FF] shadow-[0_0_15px_rgba(30,144,255,0.5)] scale-105"
                : "border-transparent opacity-50 hover:opacity-80",
            )}
          >
            <Image src={item.afterImage || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
