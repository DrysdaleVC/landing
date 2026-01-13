"use client"

import { urlFor, type PortfolioCompany } from "@/lib/sanity"

type PortfolioSectionProps = {
  portfolio: PortfolioCompany[]
}

export function PortfolioSection({ portfolio }: PortfolioSectionProps) {
  return (
    <section className="min-h-full w-full flex flex-col py-6">
      <h2 className="font-mono text-xs md:text-sm text-primary mb-6">
        <span className="text-secondary">&gt;</span> portfolio --list-companies
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {portfolio.map((company) => (
          <a
            key={company._id}
            href={company.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square bg-white dark:bg-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center p-4 md:p-6"
            title={company.name}
          >
            {/* Logo */}
            <img
              src={urlFor(company.logo).width(200).height(200).url()}
              alt={company.name}
              className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />

            {/* Hover border effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 dark:group-hover:border-white/30 rounded-lg transition-colors duration-300" />
          </a>
        ))}
      </div>

      {portfolio.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-secondary">
            No portfolio companies found. Add them in Sanity Studio.
          </p>
        </div>
      )}
    </section>
  )
}
