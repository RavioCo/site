/**
 * RAVIO Visual Design System Tokens
 * Brand: RAVIO by Ravio & Co.
 * Tagline: ELEVATION REFINED.
 * Creative Direction: Understated luxury, editorial elegance, timeless sophistication.
 */

export const RAVIO_TOKENS = {
  brand: {
    name: 'RAVIO',
    company: 'Ravio & Co.',
    tagline: 'ELEVATION REFINED.',
    domain: 'ravioco.com',
    status: 'Provisional Design System Reference',
  },

  // 1. Color Palette System
  colors: {
    // Primary palette
    primary: {
      charcoal: {
        hex: '#171717',
        rgb: '23, 23, 23',
        name: 'Charcoal',
        role: 'Primary dark, high-contrast typography, primary buttons, inverted canvas',
        cssVar: '--color-ravio-charcoal',
      },
      warmIvory: {
        hex: '#F4F1EA',
        rgb: '244, 241, 234',
        name: 'Warm Ivory',
        role: 'Signature atmospheric canvas, primary background, tactile textile warmth',
        cssVar: '--color-ravio-ivory',
      },
      pureWhite: {
        hex: '#FFFFFF',
        rgb: '255, 255, 255',
        name: 'Pure White',
        role: 'Crisp product display planes, modal backgrounds, high-clarity surfaces',
        cssVar: '--color-ravio-white',
      },
    },

    // Secondary palette
    secondary: {
      mutedGold: {
        hex: '#B7A17A',
        rgb: '183, 161, 122',
        name: 'Muted Gold',
        role: 'Restrained accent: craftsmanship seals, fine thread notes, subtle active markers. Used sparingly.',
        cssVar: '--color-ravio-gold',
      },
      softStone: {
        hex: '#E8E4DC',
        rgb: '232, 228, 220',
        name: 'Soft Stone',
        role: 'Secondary background, subtle neutral card fill, architectural divider lines',
        cssVar: '--color-ravio-stone',
      },
      warmGrey: {
        hex: '#77736C',
        rgb: '119, 115, 108',
        name: 'Warm Grey',
        role: 'Secondary and metadata typography, breadcrumbs, kickers, subtle borders',
        cssVar: '--color-ravio-grey',
      },
    },

    // Semantic roles
    semantic: {
      backgroundPrimary: '#F4F1EA',
      backgroundSecondary: '#E8E4DC',
      backgroundSurface: '#FFFFFF',
      backgroundInverted: '#171717',

      textMain: '#171717',
      textSecondary: '#5A5A5A',
      textInverted: '#F4F1EA',
      textAccent: '#604D2C', // 7.17:1 on warm ivory (AAA normal text)
      textAccentInverted: '#B7A17A',
      accentDecorative: '#B7A17A',

      borderDefault: 'rgba(23, 23, 23, 0.12)',
      borderSubtle: 'rgba(23, 23, 23, 0.06)',
      borderInverted: 'rgba(244, 241, 234, 0.15)',
      borderAccent: 'rgba(183, 161, 122, 0.40)',

      buttonPrimaryBg: '#171717',
      buttonPrimaryText: '#F4F1EA',
      buttonPrimaryHover: '#2A2A2A',

      buttonSecondaryBg: '#FFFFFF',
      buttonSecondaryText: '#171717',
      buttonSecondaryBorder: 'rgba(23, 23, 23, 0.15)',
      buttonSecondaryHover: '#F4F1EA',

      // Restrained feedback states (no garish neon colors)
      error: {
        main: '#9E3B3B', // Restrained bordeaux / burgundy
        bg: '#F9F2F2',
        border: 'rgba(158, 59, 59, 0.3)',
      },
      success: {
        main: '#3D6E50', // Restrained forest / sage
        bg: '#F0F5F2',
        border: 'rgba(61, 110, 80, 0.3)',
      },
      warning: {
        main: '#A37237', // Warm brass
        bg: '#F9F5EE',
        border: 'rgba(163, 114, 55, 0.3)',
      },
    },
  },

  // 2. Typography Hierarchy System
  typography: {
    fontFamilies: {
      serif: "'Cormorant Garamond', Georgia, serif",
      sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    },
    scale: {
      display: {
        name: 'Display Heading',
        fontFamily: 'serif',
        fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)', // 44px - 72px
        lineHeight: '1.06',
        letterSpacing: '-0.025em',
        fontWeight: '400',
        usage: 'Hero editorial statement, primary campaign impact',
      },
      h1: {
        name: 'Heading 1',
        fontFamily: 'serif',
        fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', // 36px - 52px
        lineHeight: '1.12',
        letterSpacing: '-0.02em',
        fontWeight: '400',
        usage: 'Page titles, collection hero titles, major editorial chapter openings',
      },
      h2: {
        name: 'Heading 2',
        fontFamily: 'serif',
        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', // 28px - 40px
        lineHeight: '1.2',
        letterSpacing: '-0.015em',
        fontWeight: '400',
        usage: 'Section headings, storytelling subtitles',
      },
      h3: {
        name: 'Heading 3',
        fontFamily: 'serif',
        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', // 20px - 28px
        lineHeight: '1.28',
        letterSpacing: '-0.01em',
        fontWeight: '400',
        usage: 'Product titles, card titles, drawer headers',
      },
      h4: {
        name: 'Heading 4',
        fontFamily: 'serif',
        fontSize: '1.125rem', // 18px
        lineHeight: '1.35',
        letterSpacing: '0em',
        fontWeight: '500',
        usage: 'Feature callouts, minor editorial blocks',
      },
      bodyLarge: {
        name: 'Body Large',
        fontFamily: 'sans',
        fontSize: '1.125rem', // 18px
        lineHeight: '1.7',
        letterSpacing: '-0.005em',
        fontWeight: '300',
        usage: 'Philosophy quotes, lead editorial paragraphs',
      },
      bodyRegular: {
        name: 'Body Regular',
        fontFamily: 'sans',
        fontSize: '0.9375rem', // 15px
        lineHeight: '1.65',
        letterSpacing: '0em',
        fontWeight: '400',
        usage: 'Standard body text, descriptions, narrative copy',
      },
      bodySmall: {
        name: 'Body Small',
        fontFamily: 'sans',
        fontSize: '0.8125rem', // 13px
        lineHeight: '1.55',
        letterSpacing: '0.01em',
        fontWeight: '400',
        usage: 'Secondary details, specs, footer links',
      },
      productTitle: {
        name: 'Product Title',
        fontFamily: 'serif',
        fontSize: '1.1875rem', // 19px
        lineHeight: '1.25',
        letterSpacing: '-0.01em',
        fontWeight: '500',
        usage: 'Product card headings and catalog listings',
      },
      price: {
        name: 'Price',
        fontFamily: 'sans',
        fontSize: '0.9375rem', // 15px
        lineHeight: '1.4',
        letterSpacing: '0.02em',
        fontWeight: '500',
        usage: 'Product pricing in BDT and USD',
      },
      navigation: {
        name: 'Navigation',
        fontFamily: 'sans',
        fontSize: '0.75rem', // 12px
        lineHeight: '1.2',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        fontWeight: '500',
        usage: 'Desktop header links, category navigation bar',
      },
      buttonText: {
        name: 'Button Typography',
        fontFamily: 'sans',
        fontSize: '0.6875rem', // 11px
        lineHeight: '1.2',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: '600',
        usage: 'All interactive buttons and action triggers',
      },
      caption: {
        name: 'Caption',
        fontFamily: 'sans',
        fontSize: '0.6875rem', // 11px
        lineHeight: '1.45',
        letterSpacing: '0.05em',
        fontWeight: '400',
        usage: 'Legal notices, microcopy, photography credits',
      },
      overline: {
        name: 'Overline / Kicker',
        fontFamily: 'sans',
        fontSize: '0.6875rem', // 11px
        lineHeight: '1.2',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontWeight: '600',
        usage: 'Editorial category badges, chapter markers (no pills)',
      },
    },
  },

  // 3. Spacing & Layout Architecture
  spacing: {
    baseUnit: '4px',
    scale: {
      1: '0.25rem', // 4px
      2: '0.5rem',  // 8px
      3: '0.75rem', // 12px
      4: '1rem',    // 16px
      5: '1.25rem', // 20px
      6: '1.5rem',  // 24px
      8: '2rem',    // 32px
      10: '2.5rem', // 40px
      12: '3rem',   // 48px
      16: '4rem',   // 64px
      20: '5rem',   // 80px
      24: '6rem',   // 96px
      32: '8rem',   // 128px
    },
    containers: {
      flagship: '1440px', // Maximum flagship viewport limit
      content: '1200px',  // Standard grid & catalog content
      editorial: '880px', // Focused reading & storytelling column
      narrow: '640px',    // Form & dialogue containers
    },
    margins: {
      mobile: '1.25rem',  // 20px
      tablet: '2rem',     // 32px
      desktop: '3rem',    // 48px
    },
    sections: {
      mobile: '4rem',     // 64px
      desktop: '7rem',    // 112px
    },
  },

  // 4. Image Aspect Ratios System
  imageRatios: {
    portraitTall: {
      ratio: '3/4',
      decimal: 0.75,
      name: 'Portrait Tall (3:4)',
      usage: 'Standard full-length garment catalog, model standing',
      tailwindClass: 'aspect-[3/4]',
    },
    portraitMedium: {
      ratio: '4/5',
      decimal: 0.8,
      name: 'Portrait Editorial (4:5)',
      usage: 'Editorial lookbook photography, waist-up tailoring portrait',
      tailwindClass: 'aspect-[4/5]',
    },
    square: {
      ratio: '1/1',
      decimal: 1.0,
      name: 'Square Detail (1:1)',
      usage: 'Fabric weave macros, stitch details, accessories, horn buttons',
      tailwindClass: 'aspect-square',
    },
    landscapeWide: {
      ratio: '16/9',
      decimal: 1.77,
      name: 'Landscape Cinema (16:9)',
      usage: 'Editorial campaign landscape, workshop and atelier stories',
      tailwindClass: 'aspect-[16/9]',
    },
    cinematicBanner: {
      ratio: '21/9',
      decimal: 2.33,
      name: 'Cinematic Banner (21:9)',
      usage: 'Full-bleed collection header, atmosphere divider',
      tailwindClass: 'aspect-[21/9]',
    },
  },

  // 5. Hairline Borders & Shadows
  geometry: {
    hairline: '1px solid rgba(23, 23, 23, 0.12)',
    hairlineSubtle: '1px solid rgba(23, 23, 23, 0.06)',
    hairlineLight: '1px solid rgba(244, 241, 234, 0.15)',
    hairlineGold: '1px solid rgba(183, 161, 122, 0.35)',
    radius: {
      none: '0px',
      sharp: '1px', // Crisp luxury tailoring finish
      subtle: '2px', // Slight optical softness for small controls
    },
  },

  // 6. Micro-Interactions & Transitions
  motion: {
    durations: {
      fast: '180ms',
      base: '300ms',
      slow: '500ms',
    },
    easing: {
      editorial: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth deceleration settle
      subtle: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
} as const;

export type RavioTokens = typeof RAVIO_TOKENS;
