import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // The sample photos and videos in the card defaults live on tilevue.com; they aren't part of this repo.
  async rewrites() {
    return [
      { source: "/images/:path*", destination: "https://tilevue.com/images/:path*" },
      { source: "/videos/:path*", destination: "https://tilevue.com/videos/:path*" },
    ];
  },
};

export default nextConfig;
