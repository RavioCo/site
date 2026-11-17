'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '@/lib/images';
import { prefersReducedMotion } from '@/lib/motion';
import { SceneImage } from './ImageSlot';
import { TLink } from './TransitionProvider';

const ClothCanvas = dynamic(() => import('./ClothCanvas'), { ssr: false });
type Mode = 'fallback' | 'gl' | 'still';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('fallback');
  const asset = IMAGES['campaign/hero'];

  useEffect(() => {
    if (asset.src) return; // a real campaign photograph replaces the 3D concept
    let ok = false;
    try { const c = document.createElement('canvas'); ok = !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { /* no WebGL */ }
    if (!ok || (navigator.hardwareConcurrency || 8) <= 2) return; // unsupported or low-performance: keep fallback
    setMode(prefersReducedMotion() ? 'still' : 'gl');
  }, [asset.src]);

  const caption = asset.src
    ? asset.status === 'verified' ? null : 'Conceptual imagery, not product photography'
    : mode === 'fallback' ? 'Conceptual art direction, not product photography'
      : 'Real-time fabric study. Conceptual, not product photography.';

  return (
    <div className="hero" ref={ref}>
      <div className="bg" id="hbg">
        {mode === 'fallback' ? <SceneImage scene="sun" /> : <ClothCanvas animate={mode === 'gl'} eventSource={ref} />}
      </div>
      <div className="hc">
        <h1><span className="ln"><span>Elevation,</span></span><span className="ln"><span>refined.</span></span></h1>
        <p className="lede">The quiet decision to choose better. A modern house beginning with the polo.</p>
        <p>
          <TLink className="btn light" href="/shop/polo">Discover the polo</TLink>{' '}
          <TLink className="btn line" href="/about">The RAVIO Standard</TLink>
        </p>
      </div>
      {caption && <span className="cap">{caption}</span>}
    </div>
  );
}
