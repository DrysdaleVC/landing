"use client";

import type { Batch, TeamMember } from "@/lib/sanity";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CompaniesSection } from "./companies-section";
import { OutroSection } from "./outro-section";
import { TeamSection } from "./team-section";
import { Terminal } from "./terminal";

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
  }, [sections]);

  // Scroll to a specific section by name
  const scrollToSection = useCallback((section: string) => {
    const index = sections.indexOf(section);
    if (index !== -1) {
      scrollToSectionByIndex(index);
    }
  }, [sections, scrollToSectionByIndex]);

  // Navigate to next section or LinkedIn if on outro
  const navigateToNextSection = useCallback(() => {
    const currentIndex = currentIndexRef.current;
    if (currentIndex >= sections.length - 1) {
      // On outro (last section), navigate to LinkedIn
      window.location.href = "https://www.linkedin.com/company/drysdaleventures/about/";
    } else {
      scrollToSectionByIndex(currentIndex + 1);
    }
  }, [sections, scrollToSectionByIndex]);

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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSection === section
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
