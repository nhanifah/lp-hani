"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, ChevronDown } from "lucide-react"

export function PublicationsList() {
  const [showAll, setShowAll] = useState(false)

  const publications = [
    {
      title:
        "Spatial Distribution of Phytoplankton Causing Harmful Algal Blooms (HABs) in Coastal Waters of Padang City, West Sumatra",
      journal: "JURNAL BIOLOGI UNIVERSITAS ANDALAS",
      year: 2023,
      authors: "Hanifah, N., Nofrita , Nurdin, J.",
      doi: "10.25077/jbioua.11.2.108-116.2023",
      tags: ["Coastal", "Distribution", "HABs", "Phytoplankton", "Spatial"],
    },
    
  ]

  const displayedPublications = showAll ? publications : publications.slice(0, 4)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {displayedPublications.map((pub, index) => (
        <Card key={index} className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0e7d7]">
                <FileText className="h-5 w-5 text-[#2c5e2e]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#2c5e2e]">{pub.title}</h3>
                <p className="text-sm text-[#4a6b4d]">{pub.authors}</p>
                <div className="flex items-center gap-2 text-sm text-[#4a6b4d]">
                  <span className="font-medium">{pub.journal}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                  <span>•</span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#2c5e2e] hover:underline"
                  >
                    DOI: {pub.doi}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {pub.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {publications.length > 4 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="border-[#2c5e2e] text-[#2c5e2e] hover:bg-[#e0e7d7] hover:text-[#2c5e2e]"
          >
            {showAll ? "Show Less" : "View All Publications"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </Button>
        </div>
      )}
    </div>
  )
}
