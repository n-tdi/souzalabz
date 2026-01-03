import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.cults3d.com" },
      { protocol: "https", hostname: "fbi.cults3d.com" },
      // sometimes they serve via other subdomains; add if you see errors:
      { protocol: "https", hostname: "*.cults3d.com" },
    ],
  }
};

export default nextConfig;
