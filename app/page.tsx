"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  Mail,
  MapPin,
  Linkedin,
  Landmark,
  BookOpen,
  Award,
  FileText,
  Users,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Globe,
  Leaf,
  BarChart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ResearchChart } from "@/components/research-chart"
import { BiodiversityMap } from "@/components/biodiversity-map"
import { PublicationsList } from "@/components/publications-list"
import { EducationTimeline } from "@/components/education-timeline"
import ProjectDetailModal, { ProjectDetailType } from "../components/ui/project-detail-modal"


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDetailType | null>(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSfdrSW_I6P22iHxeEBHSMB8QHSmU2ZyNr0CrSB3N-Fa3RRSRQ/viewform?entry.1806414786=${encodeURIComponent(name)}&entry.1577174129=${encodeURIComponent(email)}&entry.162820519=${encodeURIComponent(subject)}&entry.847912545=${encodeURIComponent(message)}`;

    window.location.href = url; // Not ideal, tapi kalau Google Form, oke aja
  };

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Get all sections for intersection observation
      const sections = ["hero", "about", "research", "skills", "publications", "contact"]

      // Find the current active section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effect calculation for hero section
  const parallaxOffset = scrollY * 0.4
  const opacityValue = Math.max(1 - scrollY * 0.002, 0)

  // Helper to open modal with project data
  const handleViewDetails = (project: ProjectDetailType) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f8faf5]">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e0e7d7] bg-[#f8faf5]/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-medium tracking-wider text-[#2c5e2e]">
            <span className="text-xl font-bold">NH</span>
          </div>
          <nav className="hidden md:flex gap-6">
            {["about", "portofolio", "skills", "publications", "contact"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === section ? "text-[#2c5e2e]" : "text-[#4a6b4d] hover:text-[#2c5e2e]"
                }`}
              >
                <span className="capitalize">{section}</span>
                {activeSection === section && <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#2c5e2e]" />}
              </Link>
            ))}
          </nav>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-[#2c5e2e] text-[#2c5e2e] hover:bg-[#e0e7d7] hover:text-[#2c5e2e] transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Connect with me for research collaborations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section id="hero" ref={heroRef} className="relative overflow-hidden bg-[#e0e7d7]/30 py-32 md:py-40">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            opacity: opacityValue * 0.2,
          }}
        >
          <Image
            src="/bg.jpg?height=1080&width=1920"
            alt="Nature pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className="container relative z-10 flex flex-col items-center text-center"
          style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
        >
          <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-4xl font-bold tracking-tight text-[#2c5e2e] sm:text-5xl md:text-6xl">
              Nurhayatul Hanifah
            </h1>
            <p className="mt-4 text-lg text-[#4a6b4d] opacity-90 md:text-xl max-w-2xl mx-auto">
              <span className="font-semibold">Biodiversity Specialist</span> |{" "}
              <span className="font-semibold">Project Management Officer</span> |{" "}
              <span className="font-semibold">Video Editor</span>
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-[#2c5e2e]" />
              <span className="text-sm text-[#4a6b4d]">Jakarta, Indonesia</span>
            </div>
          </div>

          <div
            className={`mt-12 flex gap-4 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <Link href="#about">
              <Button className="bg-[#2c5e2e] hover:bg-[#1f4521] transition-all duration-300">
                Discover My Work
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                variant="outline"
                className="border-[#2c5e2e] text-[#2c5e2e] hover:bg-[#e0e7d7] hover:text-[#2c5e2e] transition-all duration-300"
              >
                Connect
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-[#2c5e2e]">1</div>
              <div className="text-sm text-[#4a6b4d] mt-1">Research Projects</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-[#2c5e2e]">1</div>
              <div className="text-sm text-[#4a6b4d] mt-1">Publications</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-[#2c5e2e]">4</div>
              <div className="text-sm text-[#4a6b4d] mt-1">Conservation Projects</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-[#2c5e2e]">1+</div>
              <div className="text-sm text-[#4a6b4d] mt-1">Year Work Experience</div>
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <Link href="#about">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 border border-[#2c5e2e]/20 text-[#2c5e2e] hover:bg-[#e0e7d7]/50 hover:text-[#2c5e2e]"
              >
                <ChevronDown className="h-5 w-5" />
                <span className="sr-only">Scroll down</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center mb-8">
              <div className="h-px flex-1 bg-[#e0e7d7]"></div>
              <h2 className="text-2xl font-bold text-[#2c5e2e] md:text-3xl px-4">About Me</h2>
              <div className="h-px flex-1 bg-[#e0e7d7]"></div>
            </div>

            <div className="mt-8 grid gap-12 md:grid-cols-[2fr_3fr] items-start">
              <div className="space-y-8">
                <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-[#e0e7d7] shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                  <Image
                    src="/hani.jpg?height=400&width=400"
                    alt="Nurhayatul Hanifah"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-[#e0e7d7]/50 p-4 transition-all hover:bg-[#e0e7d7]">
                    <BookOpen className="h-6 w-6 text-[#2c5e2e] mb-2" />
                    <span className="text-sm font-medium text-[#2c5e2e]">S.Si. Biology</span>
                    <span className="text-xs text-[#4a6b4d]">Andalas University</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg bg-[#e0e7d7]/50 p-4 transition-all hover:bg-[#e0e7d7]">
                    <Award className="h-6 w-6 text-[#2c5e2e] mb-2" />
                    <span className="text-sm font-medium text-[#2c5e2e]">LAB Assistant</span>
                    <span className="text-xs text-[#4a6b4d] text-center">Andalas Ecological Laboratory</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg bg-[#e0e7d7]/50 p-4 transition-all hover:bg-[#e0e7d7]">
                    <FileText className="h-6 w-6 text-[#2c5e2e] mb-2" />
                    <span className="text-sm font-medium text-[#2c5e2e]">1 Publications</span>
                    <span className="text-xs text-[#4a6b4d]">Peer-reviewed Journals</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg bg-[#e0e7d7]/50 p-4 transition-all hover:bg-[#e0e7d7]">
                    <Users className="h-6 w-6 text-[#2c5e2e] mb-2" />
                    <span className="text-sm font-medium text-[#2c5e2e]">3+ Collaborations</span>
                    <span className="text-xs text-[#4a6b4d]">Multidiscipline Research</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#2c5e2e]">
                  As a Sustainable Conservator
                </h3>

                <p className="text-[#4a6b4d] leading-relaxed">
                I am a biodiversity specialist with a strong background in tropical ecology and conservation, focusing 
                on rapidly transforming aquatic ecosystems. My academic foundation in <b>ecology and conservation</b> biology 
                was driven by a deep interest in tropical megadiversity. I investigate biodiversity patterns across 
                disturbance gradients in freshwater and coastal systems using ecological field surveys, GIS mapping, 
                and ecological modeling. My work examines how anthropogenic pressures impact species composition, 
                ecosystem functionality, and ecological resilience, particularly in high-risk coastal zones.


                </p>

                <p className="text-[#4a6b4d] leading-relaxed">
                In addition to scientific research, I bring experience in <b>project coordination</b> and environmental 
                impact assessments (AMDAL), ensuring that biodiversity data contributes to informed decision-making 
                and sustainable development planning. With a multidisciplinary approach that bridges science, policy, 
                and public outreach, I also integrate <b>visual storytelling</b> into my work—producing video content that 
                communicates ecological insights to broader audiences. This combination of scientific expertise, 
                project management, and media production allows me to effectively contribute to conservation efforts, 
                stakeholder engagement, and environmental education initiatives.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[#2c5e2e] font-medium">Current Focus</AccordionTrigger>
                    <AccordionContent className="text-[#4a6b4d]">
                      Currently, I am working in the field of Learning and Development, where I manage the 
                      implementation and monitoring of educational programs, coordinate with stakeholders, and 
                      ensure high-quality customer engagement. In parallel, I have experience supporting 
                      biodiversity assessments and environmental analysis projects, particularly within land-based 
                      ecosystems such as palm oil plantations. My previous work involved managing project 
                      documentation, coordinating field logistics, and contributing to ecological data collection 
                      and analysis. These efforts support sustainability initiatives and environmental compliance. 
                      Additionally, I utilize tools such as Quantum GIS and environmental monitoring methods to 
                      assist in conservation-related activities.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-[#2c5e2e] font-medium">Academic Background</AccordionTrigger>
                    <AccordionContent className="text-[#4a6b4d]">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>S.Si. in Biology, Andalas University (2023)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex gap-4 pt-4">
                  <Link href="#portofolio">
                    <Button className="bg-[#2c5e2e] hover:bg-[#1f4521] transition-all duration-300">
                      View Portofolio
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/cv.pdf" target="_blank">
                    <Button
                      variant="outline"
                      className="border-[#2c5e2e] text-[#2c5e2e] hover:bg-[#e0e7d7] hover:text-[#2c5e2e] transition-all duration-300"
                    >
                      Download CV
                      <FileText className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Timeline */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h3 className="text-xl font-semibold text-[#2c5e2e] mb-8 text-center">Experience Journey</h3>
            <EducationTimeline />
          </div>
        </div>
      </section>

      {/* Research/Projects Section */}
      <section id="portofolio" className="bg-[#f8faf5] py-20 md:py-28">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
            <h2 className="text-2xl font-bold text-[#2c5e2e] md:text-3xl px-4">My Portfolio</h2>
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
          </div>

          <p className="mt-4 text-[#4a6b4d] max-w-3xl mx-auto text-center mb-12">
            My experiences encompasses various environmental projects, contributing to Learning and Development program and involved in the production and video editing of educational and promotional content to support environmental learning and awareness campaigns.
          </p>

          <Tabs defaultValue="featured" className="w-full">
            {/* <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="featured" className="data-[state=active]:bg-[#2c5e2e] data-[state=active]:text-white">
                Featured
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="data-[state=active]:bg-[#2c5e2e] data-[state=active]:text-white">
                Ongoing
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-[#2c5e2e] data-[state=active]:text-white"
              >
                Completed
              </TabsTrigger>
            </TabsList> */}

            <TabsContent value="featured" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Project 1 */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/porto/porto_1.jpeg?height=300&width=500"
                      alt="Ecosystem Analysis"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white" onClick={() => handleViewDetails({
                        imageUrl: "/porto/porto_1.jpeg",
                        title: "Field Survey, Sampling, and Data Collection",
                        date: "2020-2023",
                        location: "Padang, West Sumatra, Indonesia",
                        description: "A fieldwork activity focused on environmental data collection and research. Field data collection includes physicochemical parameters such as temperature, salinity, pH, brightness, BOD₅, DO, free CO₂, TSS, phosphate, and nitrate.",
                        category: "Ecosystem Analysis",
                        tags: ["Carbon Cycling", "Remote Sensing", "Climate Change"]
                      })}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Ecosystem Analysis</Badge>
                      <span className="text-xs text-[#4a6b4d]">2020-2023</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Field Survey, Sampling, and Data Collection</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      A fieldwork activity focused on environmental data collection and research. Field data collection includes physicochemical parameters such as temperature, salinity, pH, brightness, BOD₅, DO, free CO₂, TSS, phosphate, and nitrate.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Environment Field Sampling
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Water Quality Analysis
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Ecological Data Collection
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">Padang, West Sumatra, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">10 Collaborators</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Project 2 */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/porto/porto_2.png?height=300&width=500"
                      alt="Coral Reef Monitoring"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white" onClick={() => handleViewDetails({
                        imageUrl: "/porto/porto_2.png",
                        title: "Harmful Algal Blooms (HABs) Species",
                        date: "2021-Present",
                        location: "Padang, West Sumatra, Indonesia",
                        description: "The discovery of 25 phytoplankton species in the coastal waters of Padang, West Sumatra, that have the potential to cause Harmful Algal Blooms (HABs) represents a crucial step in understanding the dynamics and ecological impacts of HABs. By providing detailed insights into species composition and bloom behavior, this study supports sustainable marine management and the development of early warning strategies for environmental protection.",
                        category: "Marine Ecology",
                        tags: ["Resilience", "Marine Conservation", "Biodiversity"]
                      })}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Marine Ecology</Badge>
                      <span className="text-xs text-[#4a6b4d]">2021-Present</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Harmful Algal Blooms (HABs) Species</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      The discovery of 25 phytoplankton species in the coastal waters of Padang, West Sumatra, that have the potential to cause Harmful Algal Blooms (HABs) represents a crucial step in understanding the dynamics and ecological impacts of HABs. By providing detailed insights into species composition and bloom behavior, this study supports sustainable marine management and the development of early warning strategies for environmental protection.


                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Harmful Algal Blooms (HABs)
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Phytoplankton Monitoring
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Coastal Water Ecology
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">Padang, West Sumatra, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">4 Collaborators</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Project 3 */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/porto/porto_3.jpeg?height=300&width=500"
                      alt="Reforestation Project"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white" onClick={() => handleViewDetails({
                        imageUrl: "/porto/porto_3.jpeg",
                        title: "Spatial Distribution Heatmap",
                        date: "2019-2022",
                        location: "Padang, West Sumatra, Indonesia",
                        description: "Harnessing the power of Quantum GIS (QGIS) to create dynamic heatmaps for environmental analysis—visualizing and revealing the complex spatial patterns of biodiversity. This innovative approach offers deeper insights into the distribution of harmful algal bloom (HAB) species, paving the way for smarter ecological monitoring and management.",
                        category: "Digital Mapping",
                        tags: ["Reforestation", "Succession", "Ecosystem Services"]
                      })}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Digital Mapping</Badge>
                      <span className="text-xs text-[#4a6b4d]">2019-2022</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Spatial Distribution Heatmap</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Harnessing the power of Quantum GIS (QGIS) to create dynamic heatmaps for environmental analysis—visualizing and revealing the complex spatial patterns of biodiversity. This innovative approach offers deeper insights into the distribution of harmful algal bloom (HAB) species, paving the way for smarter ecological monitoring and management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        QGIS Heatmap
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Spatial Analysis
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Biodiversity Mapping
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">Padang, West Sumatra, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">4 Collaborators</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Project 4 */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/porto/porto_4.jpeg?height=300&width=500"
                      alt="Reforestation Project"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white" onClick={() => handleViewDetails({
                        imageUrl: "/porto/porto_4.jpeg",
                        title: "Biodiversity Identification Process",
                        date: "2019-2023",
                        location: "Padang, West Sumatra, Indonesia",
                        description: "As part of the biodiversity identification process in the laboratory, I conducted plankton species analysis using a microscope. This activity aimed to observe and classify morphological characteristics of each species, serving as a scientific basis for assessing aquatic ecosystem conditions and supporting accurate environmental monitoring efforts.",
                        category: "Restoration Ecology",
                        tags: ["Reforestation", "Succession", "Ecosystem Services"]
                      })}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Restoration Ecology</Badge>
                      <span className="text-xs text-[#4a6b4d]">2019-2023</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Biodiversity Identification Process</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      As part of the biodiversity identification process in the laboratory, I conducted plankton species analysis using a microscope. This activity aimed to observe and classify morphological characteristics of each species, serving as a scientific basis for assessing aquatic ecosystem conditions and supporting accurate environmental monitoring efforts.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Plankton Identification
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Microscopic Analysis
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Aquatic Ecosystem Monitoring
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">Padang, West Sumatra, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">4 Collaborators</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Project 5 */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/porto/porto_5.jpeg?height=300&width=500"
                      alt="Reforestation Project"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white" onClick={() => handleViewDetails({
                        imageUrl: "/porto/porto_5.jpeg",
                        title: "Student Success Intern",
                        date: "2024-2025",
                        location: "Tangerang, Indonesia",
                        description: "Managed educational programs in Learning and Development through active supervision and teamwork. Analyzed learning outcomes and mentor performance to drive improvement and ensure customer satisfaction. Maintained clear communication to support smooth program execution and a positive learning experience.",
                        category: "Learning and Development",
                        tags: ["Reforestation", "Succession", "Ecosystem Services"]
                      })}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Learning and Development</Badge>
                      <span className="text-xs text-[#4a6b4d]">2024-2025</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Student Success Intern</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Managed educational programs in Learning and Development through active supervision and teamwork. Analyzed learning outcomes and mentor performance to drive improvement and ensure customer satisfaction. Maintained clear communication to support smooth program execution and a positive learning experience.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Program Management
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Learning Evaluation
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Coordination
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">Tangerang, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">4 Collaborators</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Project 6 */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/porto/porto_6.png?height=300&width=500"
                      alt="Reforestation Project"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white" onClick={() => handleViewDetails({
                        imageUrl: "/porto/porto_7.png",
                        title: "Video Editor",
                        date: "2025-Present",
                        location: "Jakarta, Indonesia",
                        description: "Oversee the production of educational and promotional videos, including editing visuals, audio, and animations. I ensure the content effectively supports learning goals and marketing strategies. My work focuses on creating engaging videos that educate and captivate audiences.",
                        category: "Creative",
                        tags: ["Reforestation", "Succession", "Ecosystem Services"]
                      })}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Creative</Badge>
                      <span className="text-xs text-[#4a6b4d]">2025-Present</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Video Editor</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Oversee the production of educational and promotional videos, including editing visuals, audio, and animations. I ensure the content effectively supports learning goals and marketing strategies. My work focuses on creating engaging videos that educate and captivate audiences.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Video Editing
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Educational Content
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-transparent border-[#2c5e2e]/30 text-[#4a6b4d]">
                        Visual Storytelling
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">Jakarta, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2c5e2e]" />
                      <span className="text-xs text-[#4a6b4d]">3 Collaborators</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ongoing" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* More project cards for ongoing research */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="eDNA Sampling"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Molecular Ecology</Badge>
                      <span className="text-xs text-[#4a6b4d]">2022-Present</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">eDNA Biodiversity Monitoring</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Developing and validating environmental DNA (eDNA) protocols for comprehensive biodiversity
                      assessment in tropical aquatic ecosystems, with applications for conservation planning and
                      invasive species detection.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Climate Change Research"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Climate Ecology</Badge>
                      <span className="text-xs text-[#4a6b4d]">2023-Present</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Climate Vulnerability Assessment</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Assessing the vulnerability of key ecosystems and endemic species to climate change impacts,
                      developing adaptation strategies and identifying climate refugia across Southeast Asia.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* More project cards for completed research */}
                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Pollination Study"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Pollination Ecology</Badge>
                      <span className="text-xs text-[#4a6b4d]">2018-2020</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Pollinator Networks in Agroforestry</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Investigated pollinator diversity and plant-pollinator interaction networks in traditional
                      agroforestry systems compared to monoculture plantations in Java, Indonesia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-[#e0e7d7] transition-all hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Wetland Conservation"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className="bg-[#e0e7d7] text-[#2c5e2e] hover:bg-[#d0dbc5]">Wetland Ecology</Badge>
                      <span className="text-xs text-[#4a6b4d]">2017-2019</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2c5e2e] mb-2">Urban Wetland Ecosystem Services</h3>
                    <p className="text-sm text-[#4a6b4d] mb-4">
                      Quantified multiple ecosystem services provided by urban wetlands, including water purification,
                      flood mitigation, and biodiversity support, to inform urban planning policies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
            <h2 className="text-2xl font-bold text-[#2c5e2e] md:text-3xl px-4">Publications</h2>
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
          </div>

          <p className="mt-4 text-[#4a6b4d] max-w-3xl mx-auto text-center mb-12">
            Publications in ecology, conservation biology, and environmental science.
          </p>

          <PublicationsList />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-[#ffffff] py-20 md:py-28">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
            <h2 className="text-2xl font-bold text-[#2c5e2e] md:text-3xl px-4">Expertise & Methodologies</h2>
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
          </div>

          <p className="mt-4 text-[#4a6b4d] max-w-3xl mx-auto text-center mb-12">
            My interdisciplinary skill set combines field ecology, data science, and conservation planning to address
            complex environmental challenges.
          </p>

          {/* <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4 flex items-center">
                  <Leaf className="mr-2 h-5 w-5" />
                  Field Research Methodologies
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Biodiversity Surveys</span>
                      <span className="text-sm text-[#4a6b4d]">Expert</span>
                    </div>
                    <Progress value={95} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Ecological Sampling</span>
                      <span className="text-sm text-[#4a6b4d]">Expert</span>
                    </div>
                    <Progress value={90} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Environmental Monitoring</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={85} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Experimental Design</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={80} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4 flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Data Analysis & Modeling
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Statistical Analysis (R)</span>
                      <span className="text-sm text-[#4a6b4d]">Expert</span>
                    </div>
                    <Progress value={90} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">GIS & Spatial Analysis</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={85} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Ecological Modeling</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={80} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Remote Sensing Analysis</span>
                      <span className="text-sm text-[#4a6b4d]">Intermediate</span>
                    </div>
                    <Progress value={70} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Conservation Planning
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Protected Area Design</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={85} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Ecosystem Services Assessment</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={80} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Stakeholder Engagement</span>
                      <span className="text-sm text-[#4a6b4d]">Intermediate</span>
                    </div>
                    <Progress value={75} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Policy Development</span>
                      <span className="text-sm text-[#4a6b4d]">Intermediate</span>
                    </div>
                    <Progress value={65} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Communication & Outreach
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Scientific Writing</span>
                      <span className="text-sm text-[#4a6b4d]">Expert</span>
                    </div>
                    <Progress value={90} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Research Presentation</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={85} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Science Communication</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={80} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#4a6b4d]">Grant Writing</span>
                      <span className="text-sm text-[#4a6b4d]">Advanced</span>
                    </div>
                    <Progress value={80} className="h-2 bg-[#e0e7d7]" indicatorClassName="bg-[#2c5e2e]" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#e0e7d7] bg-[#f8faf5] p-6 transition-all hover:shadow-md hover:translate-y-[-5px]">
              <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4">Specialized Techniques</h3>
              <ul className="space-y-3 text-[#4a6b4d]">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Environmental Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Ecological Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Water Quality Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Environmental Impact Assessment</span>
                </li> 
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Scientific Report & Visualization</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#e0e7d7] bg-[#f8faf5] p-6 transition-all hover:shadow-md hover:translate-y-[-5px]">
              <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4">Software Proficiency</h3>
              <ul className="space-y-3 text-[#4a6b4d]">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>QGIS & ArcGIS</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Google Earth Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Microsoft Excel</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Google Workspace</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Slack / Discord</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>CapCut</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#e0e7d7] bg-[#f8faf5] p-6 transition-all hover:shadow-md hover:translate-y-[-5px]">
              <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4">Ecosystem Expertise</h3>
              <ul className="space-y-3 text-[#4a6b4d]">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Estuarine Ecosystem</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Freshwater Ecosystem</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Marine Ecosystem</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Anthropogenic Ecosystem</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#e0e7d7] bg-[#f8faf5] p-6 transition-all hover:shadow-md hover:translate-y-[-5px]">
              <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4">Languages</h3>
              <ul className="space-y-3 text-[#4a6b4d]">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Indonesian (Native)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>English (Proficient)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                  <span>Malay (Proficient)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h3 className="text-xl font-semibold text-[#2c5e2e] mb-8 text-center">Collaborator Testimonials</h3>

          {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"> */}
          <div className="flex gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <div className="bg-[#f8faf5] p-6 rounded-xl border border-[#e0e7d7]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonial/alif.jpg?height=100&width=100"
                    alt="Alif Firdi"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[#2c5e2e] font-medium">Alif Firdi</h4>
                  <p className="text-xs text-[#4a6b4d]">PT. Darinol Inovasi Indonesia</p>
                </div>
              </div>
              <p className="text-sm text-[#4a6b4d] italic">
                "Hani's expertise in laboratory techniques and meticulous data curation has been invaluable to our AI-driven plankton research. Her precision in sample collection, classification, and dataset preparation enabled the development of highly accurate machine learning models. Her collaborative spirit and deep understanding of marine biodiversity bridged the gap between ecological fieldwork and computational innovation, making her an indispensable partner in this multidisciplinary project."
              </p>
            </div>

            {/* <div className="bg-[#f8faf5] p-6 rounded-xl border border-[#e0e7d7]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Prof. James Wong"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[#2c5e2e] font-medium">Prof. James Wong</h4>
                  <p className="text-xs text-[#4a6b4d]">University of Queensland</p>
                </div>
              </div>
              <p className="text-sm text-[#4a6b4d] italic">
                "Working with Nurhayatul on the Coral Reef Resilience project has been incredibly productive. Her
                attention to detail and innovative thinking have helped us develop novel approaches to reef conservation
                in the face of climate change."
              </p>
            </div> */}

            {/* <div className="bg-[#f8faf5] p-6 rounded-xl border border-[#e0e7d7]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Dr. Maria Rodriguez"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[#2c5e2e] font-medium">Dr. Maria Rodriguez</h4>
                  <p className="text-xs text-[#4a6b4d]">Conservation International</p>
                </div>
              </div>
              <p className="text-sm text-[#4a6b4d] italic">
                "Nurhayatul bridges the gap between rigorous science and practical conservation. Her work on forest
                restoration has provided valuable insights that we've implemented in multiple restoration projects
                across Indonesia."
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#e0e7d7]/30 py-20 md:py-28">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
            <h2 className="text-2xl font-bold text-[#2c5e2e] md:text-3xl px-4">Connect & Collaborate</h2>
            <div className="h-px flex-1 bg-[#e0e7d7]"></div>
          </div>

          <p className="mt-4 text-[#4a6b4d] max-w-3xl mx-auto text-center mb-12">
            I'm open to research collaborations, speaking engagements, and consulting opportunities related to ecology,
            conservation, and sustainable development.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-[#2c5e2e] mb-6">Research Interests</h3>
                <div className="space-y-4">
                  <p className="text-[#4a6b4d]">I'm particularly interested in collaborative projects focusing on:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#2c5e2e]/10 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                      </div>
                      <span className="text-[#4a6b4d]">
                        Nature-based solutions for climate change mitigation and adaptation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#2c5e2e]/10 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                      </div>
                      <span className="text-[#4a6b4d]">
                        Innovative approaches to biodiversity monitoring and conservation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#2c5e2e]/10 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#2c5e2e]"></div>
                      </div>
                      <span className="text-[#4a6b4d]">Ecosystem restoration and ecological recovery assessment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c5e2e]/10">
                    <Mail className="h-5 w-5 text-[#2c5e2e]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4a6b4d]">Email</p>
                    <a href="mailto:nurhayatulhanifah1@gmail.com" className="font-medium text-[#2c5e2e]">nurhayatulhanifah1@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c5e2e]/10">
                    <Linkedin className="h-5 w-5 text-[#2c5e2e]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4a6b4d]">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/nurhayatul-hanifah/" className="font-medium text-[#2c5e2e]">https://www.linkedin.com/in/nurhayatul-hanifah</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c5e2e]/10">
                    <Landmark className="h-5 w-5 text-[#2c5e2e]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4a6b4d]">Research Gate</p>
                    <a href="https://www.researchgate.net/profile/Nurhayatul-Hanifah" className="font-medium text-[#2c5e2e]">researchgate.net/profile/Nurhayatul-Hanifah</a>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6 rounded-xl bg-white p-8 shadow-sm"
            onSubmit={e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    const url = `https://docs.google.com/forms/d/e/1FAIpQLSfdrSW_I6P22iHxeEBHSMB8QHSmU2ZyNr0CrSB3N-Fa3RRSRQ/viewform?entry.1806414786=${encodeURIComponent(name)}&entry.1577174129=${encodeURIComponent(email)}&entry.162820519=${encodeURIComponent(subject)}&entry.847912545=${encodeURIComponent(message)}`;
    window.location.href = url;
  }}>
              <h3 className="text-lg font-semibold text-[#2c5e2e] mb-4">Send a Message</h3>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-[#4a6b4d]">
                  Name
                </label>
                <input
                name="name"
                  id="name"
                  type="text"
                  className="rounded-md border border-[#e0e7d7] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5e2e]/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-[#4a6b4d]">
                  Email
                </label>
                <input
                name="email"
                  id="email"
                  type="email"
                  className="rounded-md border border-[#e0e7d7] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5e2e]/50 transition-all"
                  placeholder="Your email"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-[#4a6b4d]">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="rounded-md border border-[#e0e7d7] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5e2e]/50 transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="research">Research Collaboration</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="consulting">Consulting Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium text-[#4a6b4d]">
                  Message
                </label>
                <textarea
                name="message"
                  id="message"
                  className="min-h-[150px] rounded-md border border-[#e0e7d7] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5e2e]/50 transition-all"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-[#2c5e2e] hover:bg-[#1f4521] transition-all duration-300">
                Send Message
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e0e7d7] py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-[#4a6b4d]">
            © {new Date().getFullYear()} Nurhayatul Hanifah. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="mailto:nurhayatulhanifah1@gmail.com" className="text-[#4a6b4d] hover:text-[#2c5e2e] transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link href="https://www.linkedin.com/in/nurhayatul-hanifah/" className="text-[#4a6b4d] hover:text-[#2c5e2e] transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://www.researchgate.net/profile/Nurhayatul-Hanifah" className="text-[#4a6b4d] hover:text-[#2c5e2e] transition-colors">
              <Landmark className="h-5 w-5" />
              <span className="sr-only">ResearchGate</span>
            </Link>
          </div>
        </div>
      </footer>

      <ProjectDetailModal item={selectedProject} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
