import type { NextConfig } from 'next';

// Static export: deployable to Cloudflare Pages with no server.
// When a real commerce backend is added, move to @opennextjs/cloudflare (see docs/DEPLOYMENT.md).
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default config;
