'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/** Moves its child against the scroll across its parent section. Negative factor reverses direction. */
export function Parallax({ factor, className, children, ...rest }: { factor: number; className?: string; children?: ReactNode; 'aria-hidden'?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement || prefersReducedMotion()) return;
    const span = () => (window.innerHeight / 2 + el.offsetHeight / 2) * factor;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: () => span() }, {
        y: () => -span(), ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, [factor]);
  return <div ref={ref} className={className} {...rest}>{children}</div>;
}
