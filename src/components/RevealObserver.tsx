'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Adds .in to .rv elements as they enter the viewport (also catches elements added later, e.g. filtered grids). */
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    const seen = new WeakSet<Element>();
    const scan = () => document.querySelectorAll('.rv:not(.in)').forEach((el) => {
      if (!seen.has(el)) { seen.add(el); io.observe(el); }
    });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [path]);
  return null;
}
