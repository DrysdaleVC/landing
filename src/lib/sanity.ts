import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Re-export urlFor for convenience
export { urlFor };

// Types matching your Sanity schemas
export type TeamMember = {
  _id: string;
  name: string;
  position: string;
  photoDark: {
    asset: {
      _ref: string;
    };
  };
  photoLight: {
    asset: {
      _ref: string;
    };
  };
  linkedinUrl: string;
};

export type Company = {
  _id: string;
  name: string;
  description?: string;
  photoDark: {
    asset: {
      _ref: string;
    };
  };
  photoLight: {
    asset: {
      _ref: string;
    };
  };
  linkedinUrl: string;
};

export type Batch = {
  _id: string;
  year: number;
  companies: Company[];
};

// GROQ Queries
const teamQuery = `*[_type == "team-member"] {
  _id,
  name,
  position,
  photoDark,
  photoLight,
  linkedinUrl
}`;

const companyQuery = `*[_type == "company"] {
  _id,
  name,
  description,
  photoDark,
  photoLight,
  linkedinUrl
}`;

const batchQuery = `*[_type == "batch"] | order(year desc) {
  _id,
  year,
  companies[]-> {
    _id,
    name,
    description,
    photoDark,
    photoLight,
    linkedinUrl
  }
}`;

// Fetch functions
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await client.fetch(teamQuery);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function getCompanies(): Promise<Company[]> {
  try {
    return await client.fetch(companyQuery);
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return [];
  }
}

export async function getBatches(): Promise<Batch[]> {
  try {
    return await client.fetch(batchQuery);
  } catch (error) {
    console.error("Failed to fetch batches:", error);
    return [];
  }
}

// Fetch all data at once for the landing page
export async function getAllLandingData() {
  const [team, batches] = await Promise.all([
    getTeamMembers(),
    getBatches(),
  ]);

  return { team, batches };
}
