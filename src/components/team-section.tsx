"use client";

import { urlFor, type TeamMember } from "@/lib/sanity";
import { useCallback, useEffect, useRef, useState } from "react";
import { TypingText } from "./typing-text";

type TeamSectionProps = {
  team: TeamMember[];
  onNavigate?: () => void;
};

export function TeamSection({ team, onNavigate }: TeamSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const autoScrollActiveRef = useRef(false);
  const lastScrollTopRef = useRef(0);

  // Detect when section enters viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Get the scroll container (parent with overflow-y-auto)
  const getScrollContainer = useCallback(() => {
    let parent = sectionRef.current?.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }, []);

  // Auto-scroll as items appear
  useEffect(() => {
    if (!showContent || team.length === 0) return;

    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    autoScrollActiveRef.current = true;
    lastScrollTopRef.current = scrollContainer.scrollTop;

    // Detect manual scroll to stop auto-scroll
    const handleManualScroll = () => {
      if (!autoScrollActiveRef.current) return;

      const currentScrollTop = scrollContainer.scrollTop;
      const diff = Math.abs(currentScrollTop - lastScrollTopRef.current);

      // If scroll difference is large and not from our auto-scroll, user scrolled manually
      if (diff > 50) {
        autoScrollActiveRef.current = false;
      }
      lastScrollTopRef.current = currentScrollTop;
    };

    scrollContainer.addEventListener("scroll", handleManualScroll, { passive: true });

    // Scroll to each item as it appears
    const timers: NodeJS.Timeout[] = [];

    team.forEach((_, index) => {
      const timer = setTimeout(() => {
        if (!autoScrollActiveRef.current) return;

        const item = itemRefs.current[index];
        if (!item) return;

        const containerRect = scrollContainer.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // Check if item is below the visible area
        if (itemRect.bottom > containerRect.bottom) {
          const scrollAmount = itemRect.bottom - containerRect.bottom + 20; // 20px padding
          lastScrollTopRef.current = scrollContainer.scrollTop + scrollAmount;
          scrollContainer.scrollBy({
            top: scrollAmount,
            behavior: "smooth",
          });
        }
      }, index * 100 + 50); // Match the stagger delay + small buffer

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
      scrollContainer.removeEventListener("scroll", handleManualScroll);
      autoScrollActiveRef.current = false;
    };
  }, [showContent, team.length, getScrollContainer]);

  return (
    <section ref={sectionRef} className="h-full w-full px-4 md:px-0 md:w-[80%] flex flex-col py-2">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-2 shrink-0">
        <TypingText
          lines={[
            { text: "> system_core --team", className: "text-primary" },
            { text: "Loading team...", className: "text-secondary" },
          ]}
          typingSpeed={30}
          lineDelay={200}
          startTyping={isInView}
          onComplete={() => setShowContent(true)}
        />
      </h2>

      <div
        className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-[#333537]/20 dark:border-[#e6e6e6]/20 transition-opacity duration-150"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        {team.map((member, index) => {
          const hasLightImage = member.photoLight?.asset?._ref;
          const hasDarkImage = member.photoDark?.asset?._ref;
          const hasAnyImage = hasLightImage || hasDarkImage;

          return (
            <a
              key={member._id}
              ref={(el) => { itemRefs.current[index] = el; }}
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden bg-[#f0f0e8] dark:bg-background border-r border-b border-[#333537]/20 dark:border-[#e6e6e6]/20"
              style={{
                opacity: showContent ? 1 : 0,
                transition: "opacity 150ms ease-in-out",
                transitionDelay: showContent ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Photo container */}
              <div className="relative aspect-square bg-primary/5 dark:bg-white/5 overflow-hidden">
                {hasAnyImage ? (
                  <>
                    {/* Photo - Light mode */}
                    <img
                      src={urlFor(hasLightImage ? member.photoLight : member.photoDark)
                        .width(400)
                        .height(400)
                        .url()}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-125 grayscale group-hover:grayscale-0 group-hover:contrast-175 transition-all duration-300 ease-in-out dark:hidden"
                    />
                    {/* Photo - Dark mode */}
                    <img
                      src={urlFor(hasDarkImage ? member.photoDark : member.photoLight)
                        .width(400)
                        .height(400)
                        .url()}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:brightness-[1.5] transition-all duration-300 ease-in-out hidden dark:block"
                    />
                  </>
                ) : (
                  /* Fallback: show initials if no image */
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 dark:bg-white/10">
                    <span className="font-mono text-2xl text-primary/50 dark:text-white/50">
                      {member.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Info section below photo */}
              <div className="p-2 md:p-3 flex flex-col gap-0.5 border-t border-[#333537]/20 dark:border-[#e6e6e6]/20">
                <h3 className="font-mono text-xs md:text-sm text-primary dark:text-white font-medium truncate">
                  {member.name}
                </h3>
                <p className="font-mono font-text-xs md:text-sm text-primary/80 dark:text-white/60 truncate">
                  {member.position}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {team.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-secondary">
            No team members found. Add them in Sanity Studio.
          </p>
        </div>
      )}

      {/* Team count and prompt to continue */}
      {showContent && team.length > 0 && (
        <div className="font-mono text-xs md:text-sm text-primary mt-4">
          <p className="mb-1">{team.length} team member{team.length !== 1 ? 's' : ''} loaded.</p>
          <div className="flex items-center">
            <span className="hidden md:inline">Press <span className="font-bold">ENTER</span> to display portfolio...</span>
            <button
              className="md:hidden text-left"
              onClick={onNavigate}
            >
              Click <span className="font-bold">HERE</span> to display portfolio...
            </button>
            <span className="inline-block w-2 h-4 bg-gray-800 dark:bg-gray-200 ml-1 animate-blink" />
          </div>
        </div>
      )}
    </section>
  );
}
