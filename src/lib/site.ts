export const SITE = {
  name: 'RAVIO & Co.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ravioco.com',
  tagline: 'Elevation refined.',
  email: 'info.ravioco@gmail.com',
  facebook: 'https://www.facebook.com/ravioco',
  instagram: 'https://www.instagram.com/ravioco/',
} as const;

/** Flip to 'true' only after a verified end-to-end test order AND merchant approval for each live gateway. */
export const ORDERING_OPEN = process.env.NEXT_PUBLIC_ORDERING_OPEN === 'true';
export const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? '';

export const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop/polo', label: 'Polos' },
  { href: '/about', label: 'The RAVIO Standard' },
  { href: '/contact', label: 'Contact' },
] as const;
