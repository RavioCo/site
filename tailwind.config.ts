import type { Config } from 'tailwindcss';

// Preflight is disabled on purpose: the approved design ships its own base styles
// (src/styles/globals.css, ported 1:1 from the Artifact). Tailwind provides tokens + utilities.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: { ivory: '#EFE9DF', charcoal: '#23211F', stone: '#E2D9C8', umber: '#7A5C45' },
      fontFamily: { serif: ['var(--font-serif)', 'Georgia', 'serif'], sans: ['var(--font-sans)', 'system-ui', 'sans-serif'] },
    },
  },
} satisfies Config;
