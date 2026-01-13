"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Terminal } from "./terminal"
import { TeamSection } from "./team-section"
import { PortfolioSection } from "./portfolio-section"
import { PartnersSection } from "./partners-section"
import type { TeamMember, PortfolioCompany, Partner } from "@/lib/sanity"

type ScreenContentProps = {
  team: TeamMember[]
  portfolio: PortfolioCompany[]
  partners: Partner[]
}

const SECTIONS = ["terminal", "team", "portfolio", "partners"] as const
type Section = (typeof SECTIONS)[number]

export function ScreenContent({
  team,
  portfolio,
  partners,
}: ScreenContentProps) {
  const [currentSection, setCurrentSection] = useState<Section>("terminal")
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<Section, HTMLDivElement | null>>({
    terminal: null,
    team: null,
    portfolio: null,
    partners: null,
  })

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Scroll to a specific section
  const scrollToSection = useCallback((section: Section) => {
    const sectionElement = sectionRefs.current[section]
    if (sectionElement && containerRef.current) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" })
      setCurrentSection(section)
    }
  }, [])

  // Navigate to next section
  const navigateToNextSection = useCallback(() => {
    const currentIndex = SECTIONS.indexOf(currentSection)
    if (currentIndex < SECTIONS.length - 1) {
      const nextSection = SECTIONS[currentIndex + 1]
      scrollToSection(nextSection)
    }
  }, [currentSection, scrollToSection])

  // Handle Enter key for section navigation (when not on terminal section)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection !== "terminal") {
        e.preventDefault()
        navigateToNextSection()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, navigateToNextSection])

  // Update current section based on scroll position
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top

      for (const section of SECTIONS) {
        const sectionElement = sectionRefs.current[section]
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect()
          const relativeTop = rect.top - containerTop

          // Section is considered active if its top is within the first half of the container
          if (relativeTop <= containerRect.height / 2 && relativeTop > -rect.height / 2) {
            if (currentSection !== section) {
              setCurrentSection(section)
            }
            break
          }
        }
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [currentSection])

  // Handle terminal navigation callback
  const handleTerminalNavigate = useCallback(() => {
    scrollToSection("team")
  }, [scrollToSection])

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scroll-smooth"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {/* Terminal Section */}
      <div
        ref={(el) => {
          sectionRefs.current.terminal = el
        }}
        className="min-h-full flex flex-col"
        style={{ scrollSnapAlign: "start" }}
      >
        <Terminal onNavigate={handleTerminalNavigate} />
      </div>

      {/* Team Section */}
      <div
        ref={(el) => {
          sectionRefs.current.team = el
        }}
        className="min-h-full"
        style={{ scrollSnapAlign: "start" }}
      >
        <TeamSection team={team} />
      </div>

      {/* Portfolio Section */}
      <div
        ref={(el) => {
          sectionRefs.current.portfolio = el
        }}
        className="min-h-full"
        style={{ scrollSnapAlign: "start" }}
      >
        <PortfolioSection portfolio={portfolio} />
      </div>

      {/* Partners Section */}
      <div
        ref={(el) => {
          sectionRefs.current.partners = el
        }}
        className="min-h-full"
        style={{ scrollSnapAlign: "start" }}
      >
        <PartnersSection partners={partners} />
      </div>

      {/* Navigation indicator */}
      {currentSection !== "partners" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="font-mono text-xs text-primary/60 dark:text-white/60 animate-pulse">
            {isMobile ? "Scroll or tap to continue" : "Press ENTER to continue"}
          </div>
        </div>
      )}

      {/* Section dots indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === section
                ? "bg-primary dark:bg-white scale-125"
                : "bg-primary/30 dark:bg-white/30 hover:bg-primary/60 dark:hover:bg-white/60"
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </div>
  )
}
