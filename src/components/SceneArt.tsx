'use client';
import { useId } from 'react';
import { draw, productPlaceholder, type Scene } from '@/lib/conceptArt';

const uid = (raw: string) => raw.replace(/\W/g, '');

/** Conceptual scene (not photography). */
export function SceneArt({ scene }: { scene: Scene }) {
  const u = uid(useId());
  return <div className="fbw" aria-hidden="true" dangerouslySetInnerHTML={{ __html: draw(scene, u) }} />;
}

/** Studio frame for a product slot that is awaiting photography. */
export function ProductPlaceholder({ name, view, slotKey }: { name: string; view: string; slotKey: string }) {
  const u = uid(useId());
  return <div className="fbw" dangerouslySetInnerHTML={{ __html: productPlaceholder(name, view, slotKey, u) }} />;
}
