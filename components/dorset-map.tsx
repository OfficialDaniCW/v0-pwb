"use client"

import { useState } from "react"

interface Town {
  name: string
  x: number
  y: number
  isHome?: boolean
}

// Accurate relative positions for Dorset towns based on actual geography
// Map viewBox is 800x500, with approximate coordinates
const towns: Town[] = [
  // Home base - Swanage (green marker)
  { name: "Swanage", x: 680, y: 380, isHome: true },

  // Isle of Purbeck area
  { name: "Corfe Castle", x: 620, y: 350 },
  { name: "Wareham", x: 560, y: 320 },
  { name: "Studland", x: 700, y: 340 },
  { name: "Kimmeridge", x: 580, y: 400 },
  { name: "Langton Matravers", x: 640, y: 395 },
  { name: "Worth Matravers", x: 660, y: 410 },
  { name: "Stoborough", x: 545, y: 335 },
  { name: "Lulworth", x: 500, y: 400 },

  // Central Dorset
  { name: "Wool", x: 490, y: 350 },
  { name: "Bovington", x: 470, y: 340 },
  { name: "Winfrith", x: 480, y: 380 },
  { name: "Bere Regis", x: 450, y: 300 },
  { name: "Warmwell", x: 440, y: 370 },

  // West Dorset
  { name: "Dorchester", x: 350, y: 340 },
  { name: "Weymouth", x: 320, y: 420 },
  { name: "Portland", x: 300, y: 480 },

  // East Dorset / Urban areas
  { name: "Poole", x: 620, y: 260 },
  { name: "Bournemouth", x: 680, y: 240 },
  { name: "Wimborne", x: 580, y: 220 },
  { name: "Lytchett Matravers", x: 560, y: 280 },
  { name: "Ringwood", x: 720, y: 180 },

  // North Dorset
  { name: "Blandford Forum", x: 450, y: 220 },
  { name: "Kingston Maurward", x: 370, y: 330 },
]

export function DorsetMap() {
  const [hoveredTown, setHoveredTown] = useState<string | null>(null)

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 800 520" className="w-full h-auto" style={{ maxHeight: "500px" }}>
        {/* Background */}
        <rect x="0" y="0" width="800" height="520" fill="var(--primary)" />

        {/* Dorset county outline - simplified accurate shape */}
        <path
          d="M 180,120 
             L 250,100 L 350,90 L 450,95 L 520,100 L 580,110 L 650,130 L 720,160 L 760,200
             L 750,240 L 740,280 L 730,320 L 720,350 L 700,360
             L 680,400 L 660,420 L 620,430 L 580,435 L 540,430
             L 500,420 L 460,410 L 420,420 L 380,430 L 340,445
             L 310,460 L 290,480 L 280,490
             L 270,470 L 260,440 L 250,410 L 230,380
             L 200,360 L 180,340 L 160,300 L 150,260 L 160,220 L 170,180 L 180,120
             Z"
          fill="var(--card)"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Isle of Purbeck peninsula detail */}
        <path
          d="M 540,330 L 580,340 L 620,335 L 660,340 L 700,350 L 720,360"
          fill="var(--secondary)"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Poole Harbour */}
        <path
          d="M 560,280 Q 580,300 600,290 Q 630,280 640,300 Q 620,320 590,315 Q 560,310 560,280 Z"
          fill="#0B1E3F"
          stroke="#1E90FF"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Coastline highlight */}
        <path
          d="M 200,360 Q 230,380 260,400 Q 290,420 310,450 Q 320,470 300,485
             L 320,450 Q 350,440 400,430 Q 450,420 500,415 Q 540,420 580,430
             Q 620,425 660,415 Q 690,400 710,375 L 720,350"
          fill="none"
          stroke="#1E90FF"
          strokeWidth="3"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* Portland */}
        <ellipse cx="300" cy="475" rx="25" ry="20" fill="#1E4A6F" stroke="#1E90FF" strokeWidth="1" opacity="0.5" />

        {/* Major roads indicator lines */}
        <path
          d="M 350,340 L 450,300 L 550,280 L 620,260"
          fill="none"
          stroke="#1E90FF"
          strokeWidth="1"
          strokeDasharray="8,4"
          opacity="0.3"
        />
        <path
          d="M 450,300 L 450,220"
          fill="none"
          stroke="#1E90FF"
          strokeWidth="1"
          strokeDasharray="8,4"
          opacity="0.3"
        />

        {/* Town markers */}
        {towns.map((town) => (
          <g
            key={town.name}
            onMouseEnter={() => setHoveredTown(town.name)}
            onMouseLeave={() => setHoveredTown(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Glow effect for home base */}
            {town.isHome && (
              <>
                <circle cx={town.x} cy={town.y} r="20" fill="#00C853" opacity="0.2">
                  <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Marker circle */}
            <circle
              cx={town.x}
              cy={town.y}
              r={town.isHome ? 10 : hoveredTown === town.name ? 8 : 6}
              fill={town.isHome ? "#00C853" : "#1E90FF"}
              stroke={town.isHome ? "#00E676" : "#64B5F6"}
              strokeWidth={town.isHome ? 3 : 2}
              opacity={hoveredTown === town.name || town.isHome ? 1 : 0.8}
            />

            {/* Town label */}
            <text
              x={town.x}
              y={town.y - 12}
              textAnchor="middle"
              fill={hoveredTown === town.name || town.isHome ? "#ffffff" : "#94A3B8"}
              fontSize={town.isHome ? "12" : "10"}
              fontWeight={town.isHome || hoveredTown === town.name ? "600" : "400"}
              style={{
                transition: "all 0.2s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              {town.name}
            </text>

            {/* Home indicator */}
            {town.isHome && (
              <text x={town.x} y={town.y + 24} textAnchor="middle" fill="#00C853" fontSize="9" fontWeight="600">
                HQ
              </text>
            )}
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(30, 440)">
          <rect
            x="0"
            y="0"
            width="160"
            height="70"
            rx="8"
            fill="#0B1E3F"
            stroke="#1E90FF"
            strokeWidth="1"
            opacity="0.9"
          />
          <circle cx="20" cy="22" r="6" fill="#00C853" stroke="#00E676" strokeWidth="2" />
          <text x="35" y="26" fill="#ffffff" fontSize="11" fontWeight="500">
            Home Base (Swanage)
          </text>
          <circle cx="20" cy="48" r="5" fill="#1E90FF" stroke="#64B5F6" strokeWidth="2" />
          <text x="35" y="52" fill="#ffffff" fontSize="11" fontWeight="500">
            Service Areas
          </text>
        </g>

        {/* Title */}
        <text
          x="400"
          y="50"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="18"
          fontWeight="700"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          Comprehensive Dorset Coverage
        </text>
        <text x="400" y="72" textAnchor="middle" fill="#94A3B8" fontSize="12">
          Serving 25+ locations across Dorset & Purbeck
        </text>
      </svg>

      {/* Hover tooltip */}
      {hoveredTown && (
        <div className="absolute top-4 right-4 bg-[#0B1E3F]/95 backdrop-blur-sm border border-[#1E90FF]/50 rounded-lg px-4 py-2 text-white text-sm">
          <span className="font-semibold">{hoveredTown}</span>
          <span className="text-white/60 ml-2">- Full service coverage</span>
        </div>
      )}
    </div>
  )
}
