"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

// Define the structure of a terminal line
type TerminalLine = {
  content: string
  type: "input" | "output" | "empty"
  color: "normal" | "bold" | "light"
}

// Define the structure of a sequence step
type SequenceStep =
  | { action: "type"; content: string; delay: number }
  | { action: "output"; content: string; delay: number; bold?: boolean }
  | { action: "empty"; count?: number; delay: number }
  | { action: "pause"; delay: number }
  | { action: "prompt"; delay: number }

// Typing speed and delays
const TYPING_SPEED = 50 // ms per character
const RESPONSE_DELAY = 500 // ms before computer responds
const MODULE_DELAY = 300 // ms delay between module loading messages
const COMMAND_DELAY = 1000 // ms delay before starting a new command

export function Terminal() {
  // State to track the displayed lines
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([])
  // State to track the current typing content
  const [currentTyping, setCurrentTyping] = useState("")
  // State to track if we're at the end with the blinking prompt
  const [showPrompt, setShowPrompt] = useState(false)
  // State to track the fading effect
  const [_, setIsFading] = useState(false)
  // Reference to the terminal container for scrolling
  const terminalRef = useRef<HTMLDivElement>(null)

  // Define the sequence of lines to display
  const sequence: SequenceStep[] = [
    // First command
    {
      action: "type",
      content: "> auth --token drysdale-ventures",
      delay: TYPING_SPEED,
    },
    { action: "pause", delay: RESPONSE_DELAY },
    {
      action: "output",
      content: "Access granted. Welcome, bold founder!",
      delay: 0,
    },
    { action: "empty", count: 1, delay: 0 }, // Add an empty line after welcome
    { action: "pause", delay: COMMAND_DELAY },

    // Second command
    {
      action: "type",
      content: "> system_core --load modules",
      delay: TYPING_SPEED,
    },
    { action: "pause", delay: RESPONSE_DELAY },
    { action: "output", content: "Loading modules...", delay: 0 },
    { action: "pause", delay: MODULE_DELAY },
    {
      action: "output",
      content: "Module 'fintech-and-defi' loaded.",
      delay: MODULE_DELAY,
    },
    { action: "pause", delay: MODULE_DELAY },
    {
      action: "output",
      content: "Module 'infra-and-tooling' loaded.",
      delay: MODULE_DELAY,
    },
    { action: "pause", delay: MODULE_DELAY },
    {
      action: "output",
      content: "Module 'consumer-and-gaming' loaded.",
      delay: MODULE_DELAY,
    },
    { action: "pause", delay: MODULE_DELAY },
    {
      action: "output",
      content: "Module 'vertical-solutions' loaded.",
      delay: MODULE_DELAY,
    },
    { action: "pause", delay: MODULE_DELAY },
    { action: "output", content: "All AI capabilities integrated.", delay: 0 },
    { action: "empty", count: 1, delay: 0 }, // Add an empty line after modules loaded
    { action: "pause", delay: COMMAND_DELAY },

    // Third command
    {
      action: "type",
      content: "> system_core -- pre-seed round",
      delay: TYPING_SPEED,
    },
    { action: "pause", delay: RESPONSE_DELAY },
    {
      action: "output",
      content: "Angel ticket validated. All permissions granted.",
      delay: 0,
    },
    { action: "empty", count: 1, delay: 0 }, // Add an empty line after permissions granted
    { action: "pause", delay: COMMAND_DELAY },

    // Fourth command
    { action: "type", content: "> halt and catch fire", delay: TYPING_SPEED },
    { action: "pause", delay: RESPONSE_DELAY },
    {
      action: "output",
      content: "Warning: Undocumented instruction detected.",
      delay: 0,
      bold: true,
    },
    { action: "pause", delay: MODULE_DELAY },
    {
      action: "output",
      content: "Switching bus lines too fast may lead to overheating.",
      delay: 0,
    },
    { action: "pause", delay: MODULE_DELAY },
    { action: "empty", count: 1, delay: 0 }, // Add an empty line before the prompt
    { action: "output", content: "Press ENTER to continue..", delay: 0 },
    { action: "prompt", delay: 0 },
  ]

  // Function to run the animation sequence
  useEffect(() => {
    let currentIndex = 0
    let typingIndex = 0
    let timeoutId: NodeJS.Timeout | null = null

    // Function to process the next step in the sequence
    const processNextStep = () => {
      if (currentIndex >= sequence.length) {
        return
      }

      const step = sequence[currentIndex]

      if (step.action === "type") {
        // Start typing an input line character by character
        typingIndex = 0
        const typeNextChar = () => {
          if (typingIndex < step.content.length) {
            setCurrentTyping(step.content.substring(0, typingIndex + 1))
            typingIndex++
            timeoutId = setTimeout(typeNextChar, step.delay)
          } else {
            // Typing complete, add the line to displayed lines
            setDisplayedLines(prev => [
              ...prev,
              { content: step.content, type: "input", color: "normal" },
            ])
            setCurrentTyping("")
            currentIndex++
            timeoutId = setTimeout(processNextStep, 10)
          }
        }
        typeNextChar()
      } else if (step.action === "output") {
        // Add an output line immediately
        setDisplayedLines(prev => [
          ...prev,
          {
            content: step.content,
            type: "output",
            color: step.bold ? "bold" : "normal",
          },
        ])
        currentIndex++
        timeoutId = setTimeout(processNextStep, step.delay)
      } else if (step.action === "empty") {
        // Add empty lines for spacing
        const count = step.count || 1
        const emptyLines = Array(count)
          .fill(null)
          .map(() => ({
            content: "",
            type: "empty" as const,
            color: "normal" as const,
          }))

        setDisplayedLines(prev => [...prev, ...emptyLines])
        currentIndex++
        timeoutId = setTimeout(processNextStep, step.delay)
      } else if (step.action === "pause") {
        // Just pause for the specified delay
        currentIndex++
        timeoutId = setTimeout(processNextStep, step.delay)
      } else if (step.action === "prompt") {
        // Show the blinking prompt at the end
        setShowPrompt(true)
        setTimeout(() => setIsFading(true), 1000)
        currentIndex++
      }
    }

    // Start the sequence after a short initial delay
    timeoutId = setTimeout(processNextStep, 500)

    // Clean up on unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Apply light gray color to previous command sections
  const getLineColor = (index: number, line: TerminalLine) => {
    if (line.color === "bold")
      return "font-bold text-gray-800 dark:text-gray-200"
    if (line.color === "light") return "text-gray-400 dark:text-gray-600"
    if (line.type === "empty") return ""

    // Find the indices where commands start
    const commandIndices = displayedLines
      .map((l, i) => (l.type === "input" && l.content.startsWith(">") ? i : -1))
      .filter(i => i !== -1)

    // Find the next command after this line
    const nextCommandIndex = commandIndices.find(cmdIdx => cmdIdx > index)

    // If there's a command after this line and this line is before it, make it light
    if (nextCommandIndex !== undefined) {
      return "text-gray-400 dark:text-gray-600"
    }

    return "text-gray-800 dark:text-gray-200"
  }

  // Auto-scroll to the bottom of the terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedLines, currentTyping, showPrompt])

  // Handle Enter key press to navigate to LinkedIn
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showPrompt) {
        // navigate in new tab
        window.open(
          "https://www.linkedin.com/company/drysdaleventures/about/",
          "_blank"
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showPrompt])

  return (
    <div ref={terminalRef} className="h-full overflow-y-auto px-2 py-4">
      {/* Render all completed lines */}
      {displayedLines.map((line, index) => (
        <div
          key={index}
          className={cn(
            "font-mono flex flex-row items-center",
            getLineColor(index, line),
            line.type === "empty" ? "h-4" : ""
          )}
        >
          {line.content}
          {/* Add blinking caret to the last line with content */}
          {index === displayedLines.length - 1 &&
            line.type === "output" &&
            line.content === "Press ENTER to continue.." && (
              <span className="inline-block w-2 h-4 bg-gray-800 dark:bg-gray-200 ml-1 animate-blink"></span>
            )}
        </div>
      ))}

      {/* Render currently typing line with cursor */}
      {currentTyping && (
        <div className="font-mono text-gray-800 dark:text-gray-200">
          {currentTyping}
          <span className="inline-block w-2 h-4 bg-gray-800 dark:bg-gray-200 ml-1 animate-blink"></span>
        </div>
      )}
    </div>
  )
}
