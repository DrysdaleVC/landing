"use client";

import { useEffect, useRef, useState } from "react";
import { TypingText } from "./typing-text";

export function OutroSection() {
  const [isInView, setIsInView] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-full w-[80%] flex flex-col py-2 font-mono text-xs md:text-sm">
      <TypingText
        lines={[
          { text: "> halt && catch-fire", className: "text-primary" },
          { text: "Warning: Undocumented instruction detected.", className: "text-primary font-bold" },
          { text: "Switching bus lines too fast may lead to overheating.", className: "text-primary" },
        ]}
        typingSpeed={30}
        lineDelay={200}
        startTyping={isInView}
        onComplete={() => setShowPrompt(true)}
      />

      {/* Prompt to continue - with typing animation */}
      {showPrompt && (
        <div className="mt-4">
          <TypingText
            lines={[
              {
                text: isMobile ? "Click HERE to continue..." : "Press ENTER to continue...",
                className: "text-primary",
                boldWords: isMobile ? ["HERE"] : ["ENTER"],
              },
            ]}
            typingSpeed={30}
            lineDelay={0}
            startTyping
          />
        </div>
      )}
    </section>
  );
}
