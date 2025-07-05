"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

// Define types for timeline data
type TimelineItem = {
  title: string
  description: string
  category: string
}

type TimelineData = {
  [year: string]: TimelineItem[]
}

export function EducationTimeline() {
  const [activeYear, setActiveYear] = useState<string>("2022")

  const timelineData: TimelineData = {
    "2019": [
      {
        title: "Biological Sciences Degree",
        description: "Starting study at Andalas University",
        category: "Education",
      },
    ],
    "2020": [
      {
        title: "Learning",
        description: "Deepened understanding of fundamental biological concepts through Microbiology, Biochemistry, Animal and Plant Systemathics and Physiology, evolution, cell and molecular biology.",
        category: "Study",
      },
    ],
    "2021": [
      {
        title: "Staff",
        description: "Department Information and Communication Media BEM KM FMIPA Universitas Andalas",
        category: "Social Experience",
      },
      {
        title: "Staff",
        description: "Department Information and Communication Media Biology Student Association Of Andalas University ",
        category: "Social Experience",
      },
    ],
    "2022": [
      {
        title: "Laboratory Assistant",
        description: "Animal Ecology and Plant Taxonomy Laboratory of Biology Departement Andalas University",
        category: "Education",
      },
      {
        title: "Coordinator of Poster Contest",
        description: "Lomba Biologi (LOBI) XIX 2022",
        category: "Committee",
      },
    ],
    "2023": [
      {
        title: "Biodiversity Analyst",
        description: "Animal Ecology Laboratory of Biology Departement Andalas University",
        category: "Research",
      },
      {
        title: "Bachelor Degree in Biology",
        description: "Successfully obtained 3.77/ 4.00 GPA and graduated with Cumlaude predicate",
        category: "Education",
      },
    ],
    "2024": [
      {
        title: "Class Assistant & Facilitator",
        description: "Student Success intern at PT Indobit Digital Raya (Bitlabs Academy)",
        category: "Career",
      },
    ],
    "2025": [
      {
        title: "End Of Class Assistant & Facilitator",
        description: "Student Success intern at PT Indobit Digital Raya (Bitlabs Academy)",
        category: "Career",
      },
      {
        title: "Help Desk Officer SDM",
        description: "HR Help Desk Officer at PT Bank Central Asia Tbk (BCA) is the first point of contact, providing swift HR support and solutions to all employees for smooth operations and employee satisfaction.",
        category: "Career",
      },
    ],
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Education":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Research":
        return "bg-green-100 text-green-800 border-green-200"
      case "Committee":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Career":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Award":
        return "bg-red-100 text-red-800 border-red-200"
      case "Social Experience":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Speaking":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="w-full">
      {/* Timeline Years */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#e0e7d7] -translate-y-1/2 z-0"></div>
        {Object.keys(timelineData).map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              activeYear === year
                ? "bg-[#2c5e2e] text-white"
                : "bg-white text-[#4a6b4d] border border-[#e0e7d7] hover:border-[#2c5e2e]/50"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="bg-white rounded-xl p-6 border border-[#e0e7d7]">
        <h4 className="text-lg font-medium text-[#2c5e2e] mb-4">{activeYear} Highlights</h4>
        <div className="space-y-4">
          {(timelineData[activeYear] || []).map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-2 h-full bg-[#e0e7d7] rounded-full mt-2"></div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-[#2c5e2e]">{item.title}</h5>
                  <Badge className={`text-xs ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                </div>
                <p className="text-sm text-[#4a6b4d]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
