"use client";

import { urlFor, type Batch } from "@/lib/sanity";

type CompaniesSectionProps = {
  batch: Batch;
};

export function CompaniesSection({ batch }: CompaniesSectionProps) {
  const { year, companies } = batch;

  return (
    <section className="h-full w-[80%] flex flex-col py-2">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-2 shrink-0">
        <span className="text-secondary">&gt;</span> system_core --portfolio --year={year}<br />
        <span className="text-secondary">Loading {year} batch...</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-[#333537]/20 dark:border-[#e6e6e6]/20">
        {companies?.map((company) => {
          const hasLightImage = company.photoLight?.asset?._ref;
          const hasDarkImage = company.photoDark?.asset?._ref;
          const hasAnyImage = hasLightImage || hasDarkImage;

          return (
            <a
              key={company._id}
              href={company.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-200/88 bg-transparent overflow-hidden flex items-center justify-center border-r border-b border-[#333537]/20 dark:border-[#e6e6e6]/20"
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
                /* Fallback: show company name if no image */
                <span className="font-mono text-xs md:text-sm text-primary/70 dark:text-white/70 text-center">
                  {company.name}
                </span>
              )}
            </a>
          );
        })}
      </div>

      {(!companies || companies.length === 0) && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-secondary">
            No companies in this batch. Add them in Sanity Studio.
          </p>
        </div>
      )}
    </section>
  );
}
