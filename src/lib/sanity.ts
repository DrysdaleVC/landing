import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity image source type
type SanityImageSource = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const isSanityConfigured = !!projectId;

console.log({
  projectId,
  dataset,
  isSanityConfigured,
});

// Create client only if configured
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

// Image URL builder
type ImageUrlBuilder = ReturnType<typeof imageUrlBuilder>;
let builder: ImageUrlBuilder | null = null;
if (client) {
  builder = imageUrlBuilder(client);
}

// Chainable placeholder that returns placeholder URL
const placeholderBuilder = {
  url: () => "/placeholder.svg",
  width: () => placeholderBuilder,
  height: () => placeholderBuilder,
  fit: () => placeholderBuilder,
  auto: () => placeholderBuilder,
  format: () => placeholderBuilder,
  quality: () => placeholderBuilder,
};

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a chainable placeholder when not configured
    return placeholderBuilder;
  }
  return builder.image(source);
}

// Types
export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  photo: SanityImageSource;
  linkedInUrl: string;
  order?: number;
};

export type PortfolioCompany = {
  _id: string;
  name: string;
  logo: SanityImageSource;
  linkedInUrl: string;
  order?: number;
};

export type Partner = {
  _id: string;
  name: string;
  logo: SanityImageSource;
  linkedInUrl: string;
  order?: number;
};

// GROQ Queries
export const teamQuery = `*[_type == "team"] | order(order asc) {
  _id,
  name,
  role,
  photo,
  linkedInUrl,
  order
}`;

export const portfolioQuery = `*[_type == "portfolio"] | order(order asc) {
  _id,
  name,
  logo,
  linkedInUrl,
  order
}`;

export const partnersQuery = `*[_type == "partners"] | order(order asc) {
  _id,
  name,
  logo,
  linkedInUrl,
  order
}`;

// Fetch functions with fallback for unconfigured state
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!client) return [];
  try {
    return await client.fetch(teamQuery);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function getPortfolioCompanies(): Promise<PortfolioCompany[]> {
  if (!client) return [];
  try {
    return await client.fetch(portfolioQuery);
  } catch (error) {
    console.error("Failed to fetch portfolio companies:", error);
    return [];
  }
}

export async function getPartners(): Promise<Partner[]> {
  if (!client) return [];
  try {
    return await client.fetch(partnersQuery);
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

// Fetch all data at once for the landing page
export async function getAllLandingData() {
  const [team, portfolio, partners] = await Promise.all([
    getTeamMembers(),
    getPortfolioCompanies(),
    getPartners(),
  ]);

  return { team, portfolio, partners };
}
