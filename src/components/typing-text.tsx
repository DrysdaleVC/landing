"use client";

import { useEffect, useState } from "react";

type TypingTextLine = {
  text: string;
  className?: string;
  boldWords?: string[]; // Words to render in bold
};

type TypingTextProps = {
  lines: TypingTextLine[];
  typingSpeed?: number;
  lineDelay?: number;
  onComplete?: () => void;
  startTyping?: boolean; // Control when typing starts
};

// Helper function to render text with bold words
function renderTextWithBold(text: string, boldWords?: string[]) {
  if (!boldWords || boldWords.length === 0) {
    return text;
  }

  // Create a regex to match any of the bold words
  const pattern = new RegExp(`(${boldWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (boldWords.includes(part)) {
      return <span key={i} className="font-bold">{part}</span>;
    }
    return part;
  });
}

export function TypingText({
  lines,
  typingSpeed = 30,
  lineDelay = 200,
  onComplete,
  startTyping = true,
}: TypingTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Start typing when startTyping becomes true
  useEffect(() => {
    if (startTyping && !hasStarted) {
      setHasStarted(true);
    }
  }, [startTyping, hasStarted]);

  useEffect(() => {
    // Don't start until triggered
    if (!hasStarted) return;

    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex].text;

    if (currentCharIndex < currentLine.length) {
      // Type next character
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);

      return () => clearTimeout(timeout);
    }
  }, [hasStarted, currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay, onComplete]);

  return (
    <div className="font-mono text-xs md:text-sm">
      {lines.map((line, index) => (
        <div key={index} className={line.className}>
          {renderTextWithBold(displayedLines[index] || "", line.boldWords)}
          {/* Show blinking caret on current line */}
          {index === currentLineIndex && hasStarted && !isComplete && (
            <span className="inline-block w-1.5 h-3.5 bg-gray-800 dark:bg-gray-200 ml-0.5 animate-blink align-middle" />
          )}
        </div>
      ))}
    </div>
  );
}
