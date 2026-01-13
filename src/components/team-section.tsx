"use client"

import { urlFor, type TeamMember } from "@/lib/sanity"

type TeamSectionProps = {
  team: TeamMember[]
}

export function TeamSection({ team }: TeamSectionProps) {
  return (
    <section className="min-h-full w-full flex flex-col py-6">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-6">
        <span className="text-secondary">&gt;</span> team --list-members
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {team.map((member) => (
          <a
            key={member._id}
            href={member.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square bg-primary/5 dark:bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {/* Photo */}
            <img
              src={urlFor(member.photo).width(400).height(400).url()}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h3 className="font-mono text-xs md:text-sm text-white font-medium truncate">
                {member.name}
              </h3>
              <p className="font-mono text-[10px] md:text-xs text-white/70 truncate">
                {member.role}
              </p>
            </div>

            {/* LinkedIn indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {team.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-secondary">
            No team members found. Add them in Sanity Studio.
          </p>
        </div>
      )}
    </section>
  )
}
