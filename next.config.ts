import type { NextConfig } from 'next';

/**
 * Runtime deployment (Cloudflare Workers via @opennextjs/cloudflare). `output: 'export'` was removed
 * because the storefront now needs route handlers (the same-origin Store API proxy) and live catalog pages.
 * Security headers live here (not in public/_headers) because _headers only applies to static assets.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",            // Next inline bootstrap; replace with nonces once middleware CSP is added
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://commerce.ravioco.com", // WooCommerce product images
  "font-src 'self'",
  "connect-src 'self'",                             // browser talks ONLY to this origin (the proxy)
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const SECURITY = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: CSP },
];
const NO_STORE = [{ key: 'Cache-Control', value: 'private, no-store, max-age=0' }];

const config: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/:path*', headers: SECURITY },
      // Personalised commerce surfaces must never be cached by the CDN or the browser.
      { source: '/api/store/:path*', headers: NO_STORE },
      { source: '/bag/:path*', headers: NO_STORE },
      { source: '/checkout/:path*', headers: NO_STORE },
      { source: '/order/:path*', headers: NO_STORE },
    ];
  },
};
export default config;
