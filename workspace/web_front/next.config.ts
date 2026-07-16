import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.gympin.ir",
      },
      {
        protocol: "https",
        hostname: "trustseal.enamad.ir",
      },
    ],
  },
};

export default nextConfig;

