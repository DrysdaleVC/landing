"use client";

import { urlFor, type Batch } from "@/lib/sanity";
import { useCallback, useEffect, useRef, useState } from "react";
import { TypingText } from "./typing-text";

type PortfolioSectionProps = {
  batches: Batch[];
  onNavigate?: () => void;
};

export function PortfolioSection({ batches, onNavigate }: PortfolioSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  const [showLinkedInPrompt, setShowLinkedInPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const outroRef = useRef<HTMLDivElement>(null);
  const linkedInPromptRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Calculate total companies across all batches
  const totalCompanies = batches.reduce((sum, batch) => sum + (batch.companies?.length || 0), 0);

  // Calculate total delay for all company animations
  const getTotalAnimationDelay = () => {
    let count = 0;
    for (const batch of batches) {
      count += batch.companies?.length || 0;
    }
    return count * 100; // 100ms per company
  };

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

  // Detect user scroll via wheel/touch
  useEffect(() => {
    if (!showContent) return;

    const handleUserScroll = () => {
      userScrolledRef.current = true;
    };

    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
    };
  }, [showContent]);

  // Auto-scroll as items appear
  useEffect(() => {
    if (!showContent || totalCompanies === 0) return;

    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    userScrolledRef.current = false;

    // Scroll to each item as it appears
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < totalCompanies; i++) {
      const timer = setTimeout(() => {
        if (userScrolledRef.current) return;

        const item = itemRefs.current[i];
        if (!item) return;

        const containerRect = scrollContainer.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // Check if item is below the visible area
        if (itemRect.bottom > containerRect.bottom) {
          // More padding for last items to ensure they're clearly visible
          const isLastFew = i >= totalCompanies - 4;
          const padding = isLastFew ? 60 : 20;
          const scrollAmount = itemRect.bottom - containerRect.bottom + padding;
          scrollContainer.scrollBy({
            top: scrollAmount,
            behavior: "smooth",
          });
        }
      }, i * 100 + 50);

      timers.push(timer);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [showContent, totalCompanies, getScrollContainer]);

  // After all logos appear: show outro and scroll to bottom of it
  useEffect(() => {
    if (!showContent || totalCompanies === 0) return;

    const delay = getTotalAnimationDelay() + 300;

    const timer = setTimeout(() => {
      setShowOutro(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [showContent, totalCompanies]);

  // As soon as outro appears, scroll down to show all the text
  useEffect(() => {
    if (!showOutro) return;
    if (userScrolledRef.current) return;

    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    // Just scroll down by 300px to ensure the outro text is fully visible
    scrollContainer.scrollBy({
      top: 300,
      behavior: "smooth",
    });
  }, [showOutro, getScrollContainer]);

  // Scroll to LinkedIn prompt when it appears
  useEffect(() => {
    if (!showLinkedInPrompt) return;

    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    const scrollToPrompt = () => {
      if (userScrolledRef.current) return;

      const prompt = linkedInPromptRef.current;
      if (!prompt) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const promptRect = prompt.getBoundingClientRect();

      if (promptRect.bottom > containerRect.bottom - 20) {
        const scrollAmount = promptRect.bottom - containerRect.bottom + 80;
        scrollContainer.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    // Try multiple times
    const timer1 = setTimeout(scrollToPrompt, 100);
    const timer2 = setTimeout(scrollToPrompt, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [showLinkedInPrompt, getScrollContainer]);

  return (
    <section ref={sectionRef} className="min-h-full w-full px-4 md:px-0 md:w-[80%] flex flex-col py-2">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-2 shrink-0">
        <TypingText
          lines={[
            { text: "> system_core --portfolio", className: "text-primary" },
            { text: "Loading portfolio...", className: "text-secondary" },
          ]}
          typingSpeed={30}
          lineDelay={200}
          startTyping={isInView}
          onComplete={() => setShowContent(true)}
        />
      </h2>

      {/* All batches */}
      {batches.map((batch, batchIndex) => {
        const { year, companies } = batch;
        // Calculate the starting index for animation delay
        let startingIndex = 0;
        for (let i = 0; i < batchIndex; i++) {
          startingIndex += batches[i].companies?.length || 0;
        }

        return (
          <div key={batch._id} className="mb-4">
            {/* Batch year label */}
            <p
              className="font-mono text-xs md:text-sm text-secondary mb-2 transition-opacity duration-150"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: showContent ? `${startingIndex * 100}ms` : "0ms" }}
            >
              {year} vintage: {companies?.length} companies loaded.
            </p>

            {/* Companies grid */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-[#333537]/20 dark:border-[#e6e6e6]/20 transition-opacity duration-150"
              style={{ opacity: showContent ? 1 : 0 }}
            >
              {companies?.map((company, index) => {
                const hasLightImage = company.photoLight?.asset?._ref;
                const hasDarkImage = company.photoDark?.asset?._ref;
                const hasAnyImage = hasLightImage || hasDarkImage;
                const animationIndex = startingIndex + index;

                return (
                  <a
                    key={company._id}
                    ref={(el) => { itemRefs.current[animationIndex] = el; }}
                    href={company.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-200/88 bg-transparent overflow-hidden flex items-center justify-center border-r border-b border-[#333537]/20 dark:border-[#e6e6e6]/20"
                    title={company.name}
                    style={{
                      opacity: showContent ? 1 : 0,
                      transition: "opacity 150ms ease-in-out",
                      transitionDelay: showContent ? `${animationIndex * 100}ms` : "0ms",
                    }}
                  >
                    {hasAnyImage ? (
                      <>
                        {/* Logo - Light mode */}
                        <img
                          src={urlFor(hasLightImage ? company.photoLight : company.photoDark)
                            .width(400)
                            .height(176)
                            .url()}
                          alt={company.name}
                          className="max-w-full max-h-full object-contain brightness-75 contrast-150 grayscale group-hover:grayscale-0 group-hover:invert transition-all duration-300 ease-in-out dark:hidden"
                        />
                        {/* Logo - Dark mode */}
                        <img
                          src={urlFor(hasDarkImage ? company.photoDark : company.photoLight)
                            .width(400)
                            .height(176)
                            .url()}
                          alt={company.name}
                          className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 group-hover:brightness-[1.5] transition-all duration-300 ease-in-out hidden dark:block"
                        />
                      </>
                    ) : (
                      <span className="font-mono text-xs md:text-sm text-primary/70 dark:text-white/70 text-center">
                        {company.name}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}

      {batches.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-secondary">
            No companies found. Add them in Sanity Studio.
          </p>
        </div>
      )}

      {/* Outro footer - container always present for scrolling, content appears after scroll */}
      <div ref={outroRef} className="mt-4 min-h-[120px]">
        {showOutro && (
          <>
            <TypingText
              lines={[
                { text: "> halt && catch-fire", className: "text-primary font-mono text-xs md:text-sm" },
                { text: "Warning: Undocumented instruction detected.", className: "text-primary font-mono text-xs md:text-sm font-bold" },
                { text: "Switching bus lines too fast may lead to overheating.", className: "text-primary font-mono text-xs md:text-sm" },
              ]}
              typingSpeed={30}
              lineDelay={200}
              startTyping={true}
              onComplete={() => setShowLinkedInPrompt(true)}
            />

            {/* LinkedIn prompt */}
            {showLinkedInPrompt && (
              <div ref={linkedInPromptRef} className="mt-6 font-mono text-xs md:text-sm text-primary flex items-center">
                <span className="hidden md:inline">Press <span className="font-bold">ENTER</span> to continue...</span>
                <button
                  className="md:hidden text-left"
                  onClick={onNavigate}
                >
                  Click <span className="font-bold">HERE</span> to continue...
                </button>
                <span className="inline-block w-2 h-4 bg-gray-800 dark:bg-gray-200 ml-1 animate-blink" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
