'use client';
import { useState, type ReactNode } from 'react';
import type { Scene } from '@/lib/conceptArt';
import { IMAGES, SCENE_KEYS, VIEWS } from '@/lib/images';
import type { Product } from '@/lib/products';
import { ProductPlaceholder, SceneArt } from './SceneArt';

/** Renders the configured photo for a slot, or the fallback if unset or if the file fails to load. */
export function ImageSlot({ k, fallback }: { k: string; fallback: ReactNode }) {
  const a = IMAGES[k];
  const [bad, setBad] = useState(false);
  if (!a?.src || bad) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="art" src={a.src} srcSet={a.srcSet} sizes={a.sizes} alt={a.alt} width={a.width} height={a.height}
      loading={a.priority ? 'eager' : 'lazy'} decoding="async" data-status={a.status} onError={() => setBad(true)} />
  );
}

export const SceneImage = ({ scene }: { scene: Scene }) => (
  <ImageSlot k={SCENE_KEYS[scene]} fallback={<SceneArt scene={scene} />} />
);

/** Live WooCommerce image when one exists for this view; otherwise the labelled conceptual placeholder. */
export function ProductImage({ product, view }: { product: Product; view: number }) {
  const img = product.images[view];
  const [bad, setBad] = useState(false);
  if (img && !bad) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="art" src={img.src} srcSet={img.srcSet} alt={img.alt} width={1600} height={2000}
        loading={view === 0 ? 'eager' : 'lazy'} decoding="async" data-status="verified" onError={() => setBad(true)} />
    );
  }
  const k = `products/${product.id}/${view + 1}`;
  return <ProductPlaceholder name={product.name} view={VIEWS[view % VIEWS.length]} slotKey={k} />;
}
