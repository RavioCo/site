'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { clamp, prefersReducedMotion } from '@/lib/motion';
import { SceneImage } from './ImageSlot';
import { TLink } from './TransitionProvider';
import { PHILOSOPHY } from '@/lib/content';

const TEXT = 'Ordinary things deserve more care.';

/** Pinned statement: words light up and the image unmasks with scroll progress (CSS sticky + GSAP ScrollTrigger). */
export function StickyStatement() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sec.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>('.w');
    const n = words.length;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: 'top top', end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          el.style.setProperty('--p', String(p));
          words.forEach((w, i) => { w.style.opacity = String(0.14 + 0.86 * clamp(p * 1.3 * n - i, 0, 1)); });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="pin stm" ref={sec}>
      <div className="stick">
        <div>
          <p className="big words">{TEXT.split(' ').map((w, i) => <span className="w" key={i}>{w} </span>)}</p>
          <p className="stp">{PHILOSOPHY[0]}</p>
          <TLink className="ul" href="/about">Read our philosophy</TLink>
          <p className="tag" style={{ marginTop: 18 }}>Image: conceptual piqué close-up.</p>
        </div>
        <div className="stimg im"><SceneImage scene="pique" /></div>
      </div>
    </section>
  );
}
