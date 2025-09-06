import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local speaker images including query params (e.g., ?v=xyz)
    remotePatterns: [],
    localPatterns: [
      {
        pathname: "/speakers/**",
        search: "*",
      },
    ],
  },
  // Silence Turbopack root inference warning in CI if needed
  turbopack: {
    // root: __dirname, // uncomment if Vercel root detection is noisy
  },
};

export default nextConfig;
