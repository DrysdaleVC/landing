"use client";

import type { Batch, TeamMember } from "@/lib/sanity";
import { useCallback, useEffect, useRef, useState } from "react";
import { PortfolioSection } from "./portfolio-section";
import { TeamSection } from "./team-section";
import { Terminal } from "./terminal";

type ScreenContentProps = {
  team: TeamMember[];
  batches: Batch[];
};

// Fixed 3 sections
const sections = ["terminal", "team", "portfolio"];

export function ScreenContent({ team, batches }: ScreenContentProps) {

  const [currentSection, setCurrentSection] = useState<string>("terminal");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Track current index with a ref for reliable navigation
  const currentIndexRef = useRef(0);

  // Scroll to a specific section by index
  const scrollToSectionByIndex = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;

    const section = sections[index];
    const sectionElement = sectionRefs.current[section];
    const container = containerRef.current;

    if (sectionElement && container) {
      currentIndexRef.current = index;
      setCurrentSection(section);

      const containerRect = container.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();
      const scrollTop = container.scrollTop + (sectionRect.top - containerRect.top);

      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, []);

  // Scroll to a specific section by name
  const scrollToSection = useCallback((section: string) => {
    const index = sections.indexOf(section);
    if (index !== -1) {
      scrollToSectionByIndex(index);
    }
  }, [scrollToSectionByIndex]);

  // Navigate to next section or LinkedIn if on portfolio
  const navigateToNextSection = useCallback(() => {
    const currentIndex = currentIndexRef.current;
    if (currentIndex >= sections.length - 1) {
      // On portfolio (last section), navigate to LinkedIn
      window.location.href = "https://www.linkedin.com/company/drysdaleventures/about/";
    } else {
      scrollToSectionByIndex(currentIndex + 1);
    }
  }, [scrollToSectionByIndex]);

  // Handle Enter key for section navigation (when not on terminal section)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not on terminal (index 0)
      if (e.key === "Enter" && currentIndexRef.current > 0) {
        e.preventDefault();
        navigateToNextSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToNextSection]);

  // Handle terminal navigation callback
  const handleTerminalNavigate = useCallback(() => {
    scrollToSectionByIndex(1); // Navigate to team (index 1)
  }, [scrollToSectionByIndex]);

  // Handle team navigation callback
  const handleTeamNavigate = useCallback(() => {
    scrollToSectionByIndex(2); // Navigate to portfolio (index 2)
  }, [scrollToSectionByIndex]);

  // Handle portfolio navigation callback (go to LinkedIn)
  const handlePortfolioNavigate = useCallback(() => {
    window.location.href = "https://www.linkedin.com/company/drysdaleventures/about/";
  }, []);

  // Update current section based on scroll position (for manual scrolling)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();

      let closestSection: string = "terminal";
      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionElement = sectionRefs.current[section];
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          const distance = Math.abs(relativeTop);

          // Find the section closest to the top of the container
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
            closestIndex = i;
          }
        }
      }

      // Update both state and ref
      setCurrentSection(closestSection);
      currentIndexRef.current = closestIndex;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {/* Terminal Section */}
      <div
        ref={(el) => {
          sectionRefs.current.terminal = el;
        }}
        className="min-h-full shrink-0 flex flex-col"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <Terminal onNavigate={handleTerminalNavigate} isActive={currentSection === "terminal"} />
      </div>

      {/* Team Section */}
      <div
        ref={(el) => {
          sectionRefs.current.team = el;
        }}
        className="min-h-full shrink-0"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <TeamSection team={team} onNavigate={handleTeamNavigate} />
      </div>

      {/* Portfolio Section (all batches + outro footer) */}
      <div
        ref={(el) => {
          sectionRefs.current.portfolio = el;
        }}
        className="min-h-full shrink-0"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <PortfolioSection batches={batches} onNavigate={handlePortfolioNavigate} />
      </div>


      {/* Section dots indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`size-2 rounded-full transition-all duration-300 ${currentSection === section
              ? "bg-primary dark:bg-white scale-125"
              : "bg-primary/30 dark:bg-white/30 hover:bg-primary/60 dark:hover:bg-white/60"
              }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </div>
  );
}
