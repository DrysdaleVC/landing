import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Allow images from Sanity CDN
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig
