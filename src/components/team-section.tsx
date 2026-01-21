"use client";

import { urlFor, type TeamMember } from "@/lib/sanity";

type TeamSectionProps = {
  team: TeamMember[];
};

export function TeamSection({ team }: TeamSectionProps) {
  // Debug: log team data
  console.log("Team data:", team);

  return (
    <section className="h-full w-[80%] flex flex-col py-2">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-2 shrink-0">
        <span className="text-secondary">&gt;</span> system_core --team <br />
        <span className="text-secondary">Loading team...</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {team.map((member) => {
          const hasLightImage = member.photoLight?.asset?._ref;
          const hasDarkImage = member.photoDark?.asset?._ref;
          const hasAnyImage = hasLightImage || hasDarkImage;

          return (
            <a
              key={member._id}
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden transition-all duration-300 bg-[#f0f0e8] dark:bg-background border border-[#333537]/20 dark:border-[#e6e6e6]/20"
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

      {/* Prompt to continue */}
      <div className="font-mono text-xs md:text-sm text-primary mt-4 flex items-center">
        Press ENTER to display portfolio...
        <span className="inline-block w-2 h-4 bg-gray-800 dark:bg-gray-200 ml-1 animate-blink" />
      </div>
    </section>
  );
}
