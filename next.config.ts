import type { NextConfig } from "next";

// Base path for subpath deployments (e.g. GitHub Pages: "/<repo>").
// Leave NEXT_PUBLIC_BASE_PATH unset for root deployments (e.g. Vercel).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
