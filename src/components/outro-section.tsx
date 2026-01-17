"use client";

export function OutroSection() {
  return (
    <section className="min-h-full w-full flex flex-col py-6 font-mono text-xs md:text-sm">
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
    </section>
  );
}
