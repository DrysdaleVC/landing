"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Terminal } from "./terminal";
import { TeamSection } from "./team-section";
import { CompaniesSection } from "./companies-section";
import { OutroSection } from "./outro-section";
import type { TeamMember, Batch } from "@/lib/sanity";

type ScreenContentProps = {
  team: TeamMember[];
  batches: Batch[];
};

export function ScreenContent({ team, batches }: ScreenContentProps) {
  // Build sections array dynamically based on batches
  const sections = useMemo(() => {
    const base: string[] = ["terminal", "team"];
    const batchSections = batches.map((_, i) => `batch-${i}`);
    return [...base, ...batchSections, "outro"];
  }, [batches]);

  const [currentSection, setCurrentSection] = useState<string>("terminal");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to a specific section
  const scrollToSection = useCallback((section: string) => {
    const sectionElement = sectionRefs.current[section];
    const container = containerRef.current;
    if (sectionElement && container) {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();
      const scrollTop = container.scrollTop + (sectionRect.top - containerRect.top);
      
      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
      setCurrentSection(section);
    }
  }, []);

  // Navigate to next section
  const navigateToNextSection = useCallback(() => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      scrollToSection(nextSection);
    }
  }, [currentSection, scrollToSection, sections]);

  // Handle Enter key for section navigation (when not on terminal section)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection !== "terminal") {
        e.preventDefault();
        navigateToNextSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, navigateToNextSection]);

  // Update current section based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerHeight = containerRect.height;

      let closestSection: string = "terminal";
      let closestDistance = Infinity;

      for (const section of sections) {
        const sectionElement = sectionRefs.current[section];
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          const distance = Math.abs(relativeTop);

          // Find the section closest to the top of the container
          if (distance < closestDistance && relativeTop <= containerHeight * 0.5) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      }

      setCurrentSection(closestSection);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Handle terminal navigation callback
  const handleTerminalNavigate = useCallback(() => {
    scrollToSection("team");
  }, [scrollToSection]);

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
        className="min-h-full flex-shrink-0 flex flex-col"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <Terminal onNavigate={handleTerminalNavigate} />
      </div>

      {/* Team Section */}
      <div
        ref={(el) => {
          sectionRefs.current.team = el;
        }}
        className="min-h-full flex-shrink-0"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <TeamSection team={team} />
      </div>

      {/* Batch Sections - dynamically rendered */}
      {batches.map((batch, index) => (
        <div
          key={batch._id}
          ref={(el) => {
            sectionRefs.current[`batch-${index}`] = el;
          }}
          className="min-h-full flex-shrink-0"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <CompaniesSection batch={batch} />
        </div>
      ))}

      {/* Outro Section */}
      <div
        ref={(el) => {
          sectionRefs.current.outro = el;
        }}
        className="min-h-full flex-shrink-0 flex flex-col"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <OutroSection />
      </div>


      {/* Section dots indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {sections.map((section) => (
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
  );
}
