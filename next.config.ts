import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from a sub-path (e.g. /essentience-the-deck/),
 * so we set basePath/assetPrefix only when building for Pages. Local `npm run dev`
 * and `npm run build` keep serving from root.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "essentience-the-deck";

const nextConfig: NextConfig = {
  output: "export", // emit a fully static site into ./out
  images: { unoptimized: true }, // next/image needs this for static export
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  trailingSlash: true, // friendlier paths for static file hosting
  // Exposed to the client so <Image src> pointing at /public can be prefixed too
  // (next/image with unoptimized does not auto-apply basePath to literal src strings).
  env: { NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repo}` : "" },
};

export default nextConfig;
