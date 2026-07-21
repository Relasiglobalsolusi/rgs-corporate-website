import type { NextConfig } from "next";
import { cmsImageRemotePatterns } from "./lib/cms-images";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cmsImageRemotePatterns(),
  },
};

export default nextConfig;
