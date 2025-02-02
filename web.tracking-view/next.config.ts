import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_MS_TRACKING_API_URL:
      process.env.NEXT_PUBLIC_MS_TRACKING_API_URL,
  },
};

export default nextConfig;
