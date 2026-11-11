/**
 * RAVIO Responsive Image Optimization Utility
 * Generates responsive `srcSet` and `sizes` for Unsplash-hosted editorial and catalog imagery
 * using modern WebP delivery (`auto=format&fm=webp`) without sacrificing visual fidelity.
 */

export interface ResponsiveImageAttributes {
  src: string;
  srcSet?: string;
  sizes?: string;
}

export function getResponsiveImageAttrs(
  rawUrl: string,
  widths: number[] = [400, 800, 1200, 1600],
  sizes: string = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
): ResponsiveImageAttributes {
  if (!rawUrl || !rawUrl.includes('images.unsplash.com')) {
    return { src: rawUrl };
  }

  try {
    const baseUrl = rawUrl.split('?')[0];
    const srcSet = widths
      .map((w) => `${baseUrl}?auto=format&fm=webp&fit=crop&w=${w}&q=85 ${w}w`)
      .join(', ');
    const defaultWidth = widths[Math.min(2, widths.length - 1)] || 1200;
    const optimizedSrc = `${baseUrl}?auto=format&fm=webp&fit=crop&w=${defaultWidth}&q=85`;

    return {
      src: optimizedSrc,
      srcSet,
      sizes,
    };
  } catch {
    return { src: rawUrl };
  }
}
