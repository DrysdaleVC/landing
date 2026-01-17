"use client";

import { urlFor, type Company } from "@/lib/sanity";

type CompaniesSectionProps = {
  companies: Company[];
};

export function CompaniesSection({ companies }: CompaniesSectionProps) {
  // Debug: log companies data
  console.log("Companies data:", companies);

  return (
    <section className="h-full w-[80%] flex flex-col py-2">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-2 flex-shrink-0">
        <span className="text-secondary">&gt;</span> system_core --portfolio<br />
        <span className="text-secondary">Loading portfolio...</span>
      </h2>

      <div className="grid grid-cols-4 border-l border-t border-[#e6e6e6]/20 dark:border-[#e6e6e6]/20">
        {companies.map((company) => {
          const hasLightImage = company.photoLight?.asset?._ref;
          const hasDarkImage = company.photoDark?.asset?._ref;
          const hasAnyImage = hasLightImage || hasDarkImage;

          return (
            <a
              key={company._id}
              href={company.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[200/88] bg-transparent overflow-hidden flex items-center justify-center p-4 border-r border-b border-[#e6e6e6]/20 dark:border-[#e6e6e6]/20"
              title={company.name}
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
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 dark:hidden"
                  />
                  {/* Logo - Dark mode */}
                  <img
                    src={urlFor(hasDarkImage ? company.photoDark : company.photoLight)
                      .width(400)
                      .height(176)
                      .url()}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 hidden dark:block"
                  />
                </>
              ) : (
                /* Fallback: show company name if no image */
                <span className="font-mono text-xs md:text-sm text-primary/70 dark:text-white/70 text-center">
                  {company.name}
                </span>
              )}
            </a>
          );
        })}
      </div>

      {companies.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-secondary">
            No companies found. Add them in Sanity Studio.
          </p>
        </div>
      )}
    </section>
  );
}
