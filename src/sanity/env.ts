export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-13";

console.log({ env: process.env });

export const dataset = assertValue(
  process.env.SANITY_STUDIO_SANITY_DATASET,
  "Missing environment variable: SANITY_STUDIO_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
