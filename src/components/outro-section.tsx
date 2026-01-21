"use client";

export function OutroSection() {
  return (
    <section className="min-h-full w-[80%] flex flex-col py-2 font-mono text-xs md:text-sm">
      <div className="flex flex-col gap-1">
        <div className="text-primary">
          <span className="text-secondary">&gt;</span> halt && catch-fire
        </div>
        <div className="text-primary font-bold">
          Warning: Undocumented instruction detected.
        </div>
        <div className="text-primary">
          Switching bus lines too fast may lead to overheating.
        </div>
      </div>

      {/* Prompt to continue to LinkedIn */}
      <div className="font-mono text-xs md:text-sm text-primary mt-4 flex items-center">
        <span className="hidden md:inline">Press ENTER to visit LinkedIn...</span>
        <span className="md:hidden">Click <span className="font-bold">HERE</span> to continue...</span>
        <span className="inline-block w-2 h-4 bg-gray-800 dark:bg-gray-200 ml-1 animate-blink" />
      </div>
    </section>
  );
}
