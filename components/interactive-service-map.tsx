"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

// Service area data with real Dorset coordinates
const serviceAreas = [
  {
    id: "swanage",
    name: "Swanage & Purbeck",
    postcode: "BH19",
    description: "Our home base - coastal properties, heritage buildings, and residential care",
    features: ["Heritage properties", "Coastal maintenance", "Listed buildings"],
    coordinates: [50.6082, -1.9593] as [number, number], // Swanage
    isHomeBase: true,
  },
  {
    id: "bournemouth",
    name: "Bournemouth",
    postcode: "BH1-BH11",
    description: "Full coverage across all Bournemouth postcodes",
    features: ["Residential properties", "Commercial buildings", "Coastal properties"],
    coordinates: [50.7192, -1.8795] as [number, number],
  },
  {
    id: "poole",
    name: "Poole",
    postcode: "BH12-BH17",
    description: "Complete coverage including harbor and residential areas",
    features: ["Harbor properties", "Residential areas", "Business districts"],
    coordinates: [50.715, -1.9872] as [number, number],
  },
  {
    id: "christchurch",
    name: "Christchurch",
    postcode: "BH23",
    description: "Coastal and residential property care",
    features: ["Coastal properties", "Residential areas", "Heritage buildings"],
    coordinates: [50.7357, -1.7783] as [number, number],
  },
  {
    id: "wimborne",
    name: "Wimborne",
    postcode: "BH21",
    description: "Historic town and surrounding areas",
    features: ["Historic buildings", "Residential properties", "Commercial areas"],
    coordinates: [50.7999, -1.997] as [number, number],
  },
  {
    id: "wareham",
    name: "Wareham",
    postcode: "BH20",
    description: "Listed buildings and rural properties",
    features: ["Listed buildings", "Rural properties", "Historic town centre"],
    coordinates: [50.6869, -2.1105] as [number, number],
  },
  {
    id: "ferndown",
    name: "Ferndown",
    postcode: "BH22",
    description: "Modern residential and commercial developments",
    features: ["Residential properties", "Commercial areas", "Modern developments"],
    coordinates: [50.8006, -1.8973] as [number, number],
  },
]

export function InteractiveServiceMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const loadLeafletCSS = () => {
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        link.crossOrigin = ""
        document.head.appendChild(link)
      }
    }

    loadLeafletCSS()

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      // Initialize map centered on Dorset
      const map = L.map(mapContainer.current!, {
        center: [50.75, -2.0],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
      })

      mapRef.current = map

      // Add OpenStreetMap tiles (free, no API key required)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Create custom icons
      const createCustomIcon = (isHomeBase: boolean) => {
        return L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              width: 40px;
              height: 40px;
              background: ${isHomeBase ? "#00C853" : "#1E90FF"};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              cursor: pointer;
              transition: transform 0.2s ease;
            ">
              ${isHomeBase ? "★" : "📍"}
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        })
      }

      // Add markers for each service area
      serviceAreas.forEach((area) => {
        const marker = L.marker(area.coordinates, {
          icon: createCustomIcon(area.isHomeBase),
        }).addTo(map)

        // Add popup
        marker.bindPopup(`
          <div style="padding: 8px; min-width: 150px;">
            <strong style="color: #1E90FF; font-size: 14px;">${area.name}</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">${area.postcode}</p>
          </div>
        `)

        // Click handler
        marker.on("click", () => {
          setSelectedArea(area.id)
          map.flyTo(area.coordinates, 12, {
            duration: 1.5,
          })
        })

        markersRef.current.push(marker)
      })

      setMapLoaded(true)
    })

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = []
      }
    }
  }, [])

  const selectedAreaData = serviceAreas.find((area) => area.id === selectedArea)

  return (
    <div className="glass-border rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Map Section */}
        <div className="relative aspect-square lg:aspect-auto min-h-[500px]">
          <div ref={mapContainer} className="absolute inset-0 z-0" />

          {/* Map overlay info */}
          <div className="absolute top-4 left-4 z-[1000] glass-border rounded-lg px-4 py-3 bg-[#0B1E3F]/95 backdrop-blur-sm">
            <h3 className="text-white font-bold text-lg mb-1">Comprehensive Dorset Coverage</h3>
            <p className="text-white/60 text-sm">Click markers to view service details</p>
          </div>

          {/* Coverage indicator */}
          <div className="absolute bottom-4 right-4 z-[1000] glass-border rounded-lg px-4 py-2 bg-[#0B1E3F]/95 backdrop-blur-sm">
            <p className="text-xs text-white/80">
              <span className="text-[#00C853] font-bold">{serviceAreas.length}</span> Areas Covered
            </p>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] glass-border rounded-lg px-4 py-3 bg-[#0B1E3F]/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00C853] border-2 border-white"></div>
                <span className="text-xs text-white/80">Home Base</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1E90FF] border-2 border-white"></div>
                <span className="text-xs text-white/80">Service Area</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-[#0B1E3F]/50 p-8 flex flex-col">
          {selectedAreaData ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {selectedAreaData.name}
                      {selectedAreaData.isHomeBase && <span className="ml-2 text-[#00C853]">★</span>}
                    </h3>
                    <p className="text-sm text-[#1E90FF]">{selectedAreaData.postcode}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedArea(null)
                      if (mapRef.current) {
                        mapRef.current.flyTo([50.75, -2.0], 10, {
                          duration: 1.5,
                        })
                      }
                    }}
                    className="text-white/60 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-white/70 leading-relaxed">{selectedAreaData.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white/80 mb-3">Services Available:</h4>
                <ul className="space-y-2">
                  {selectedAreaData.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <a
                  href="https://wa.me/447418610731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#00C853] text-white 
                             font-semibold rounded-lg px-6 py-3
                             hover:bg-[#00A843] transition-all"
                >
                  Get Quote for {selectedAreaData.name}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="text-6xl mb-2">📍</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Explore Our Service Areas</h3>
                <p className="text-white/60 text-sm max-w-xs">
                  Click on any marker on the map to view coverage details and available services
                </p>
              </div>

              <div className="pt-6 space-y-2">
                <p className="text-xs text-white/40">★ marks our Swanage home base</p>
                <p className="text-xs text-white/40 mb-3">Not seeing your area?</p>
                <a
                  href="https://wa.me/447418610731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E90FF] hover:text-[#1E90FF]/80 transition-colors text-sm font-medium inline-block"
                >
                  Contact us to check availability
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .custom-marker:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}
