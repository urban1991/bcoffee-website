import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Zdjęcia trzymamy w Sanity — ich CDN podaje warianty, next/image je optymalizuje.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
