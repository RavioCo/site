'use client';
import { useEffect, useRef } from 'react';
import { GALLERY } from '@/lib/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { SceneImage } from './ImageSlot';

/** Vertical scroll pans a horizontal editorial track. Reduced motion: native horizontal scroll (see CSS). */
export function HorizontalGallery() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current, t = track.current;
    if (!s || !t || prefersReducedMotion()) return;
    let total = 0;
    const layout = () => { total = Math.max(0, t.scrollWidth - window.innerWidth * 0.9); s.style.height = `${total + window.innerHeight}px`; };
    layout();
    const ctx = gsap.context(() => {
      ScrollTrigger.addEventListener('refreshInit', layout);
      ScrollTrigger.create({
        trigger: s, start: 'top top', end: 'bottom bottom',
        onUpdate: (self) => { t.style.transform = `translate3d(${-self.progress * total}px,0,0)`; },
      });
    }, s);
    return () => { ScrollTrigger.removeEventListener('refreshInit', layout); ctx.revert(); s.style.height = ''; t.style.transform = ''; };
  }, []);

  return (
    <section className="pin hz" ref={sec}>
      <div className="stick hs">
        <div className="track" ref={track}>
          <div className="hhd">
            <h2>Considered in every detail.</h2>
            <p className="tag">Conceptual images until photography is supplied. Keep scrolling.</p>
          </div>
          {GALLERY.map((g, i) => (
            <figure key={g.scene} className={`hp hp${i % 2}`}>
              <div className="im"><SceneImage scene={g.scene} /></div>
              <figcaption>{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
