'use client';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/** Desktop-only enhancements: custom cursor, magnetic buttons, 3D card tilt. Off for touch and reduced motion. */
export function CursorFX() {
  const ref = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  useEffect(() => { if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion()) setFine(true); }, []);

  useEffect(() => {
    const cu = ref.current;
    if (!fine || !cu) return;
    document.body.classList.add('cur');
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    let magnet: HTMLElement | null = null, card: HTMLElement | null = null;
    const tiltTarget = (c: HTMLElement | null) => c?.firstElementChild as HTMLElement | null;
    const loop = () => { cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2; cu.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
    loop();
    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      const t = e.target as Element | null;
      if (!t?.closest) return;
      cu.classList.toggle('big', !!t.closest('a,button,.card,.th'));
      const b = t.closest<HTMLElement>('.btn:not([disabled])');
      if (magnet && magnet !== b) magnet.style.transform = '';
      if (b) { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`; }
      magnet = b;
      const c = t.closest<HTMLElement>('.card');
      if (card && card !== c) { const p = tiltTarget(card); if (p) p.style.transform = ''; }
      const im = tiltTarget(c);
      if (c && im) {
        const q = im.getBoundingClientRect();
        const dx = (e.clientX - q.left) / q.width - 0.5, dy = (e.clientY - q.top) / q.height - 0.5;
        im.style.transform = `perspective(800px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) scale(1.02)`;
      }
      card = c;
    };
    window.addEventListener('pointermove', move);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); document.body.classList.remove('cur'); };
  }, [fine]);

  return fine ? <div ref={ref} className="cursor" aria-hidden="true" /> : null;
}
