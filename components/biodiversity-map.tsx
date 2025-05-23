"use client"

import { useEffect, useRef } from "react"

export function BiodiversityMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Leaflet or Mapbox
    if (mapRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = mapRef.current.clientHeight
      mapRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a simple map representation
        ctx.fillStyle = "#f0f4e8"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw land masses
        ctx.fillStyle = "#e0e7d7"
        ctx.beginPath()
        ctx.ellipse(canvas.width * 0.3, canvas.height * 0.4, 80, 60, 0, 0, 2 * Math.PI)
        ctx.fill()

        ctx.beginPath()
        ctx.ellipse(canvas.width * 0.6, canvas.height * 0.5, 100, 70, 0, 0, 2 * Math.PI)
        ctx.fill()

        ctx.beginPath()
        ctx.ellipse(canvas.width * 0.8, canvas.height * 0.3, 50, 40, 0, 0, 2 * Math.PI)
        ctx.fill()

        // Draw research sites
        const sites = [
          { x: canvas.width * 0.25, y: canvas.height * 0.35, size: 8, label: "Mangrove Site" },
          { x: canvas.width * 0.4, y: canvas.height * 0.45, size: 10, label: "Coral Reef" },
          { x: canvas.width * 0.65, y: canvas.height * 0.55, size: 12, label: "Rainforest" },
          { x: canvas.width * 0.75, y: canvas.height * 0.4, size: 8, label: "Wetland" },
          { x: canvas.width * 0.55, y: canvas.height * 0.3, size: 9, label: "Agroforestry" },
        ]

        sites.forEach((site) => {
          // Draw site marker
          ctx.fillStyle = "#2c5e2e"
          ctx.beginPath()
          ctx.arc(site.x, site.y, site.size, 0, 2 * Math.PI)
          ctx.fill()

          // Draw pulse effect
          ctx.strokeStyle = "#2c5e2e"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(site.x, site.y, site.size + 5, 0, 2 * Math.PI)
          ctx.stroke()

          // Add label
          ctx.fillStyle = "#4a6b4d"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(site.label, site.x, site.y + site.size + 15)
        })
      }
    }

    return () => {
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild)
        }
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden"></div>
}
