'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

const Ctx = createContext<{ go: (href: string) => void }>({ go: () => {} });
export const useTransition = () => useContext(Ctx);

/** Curtain wipe between routes. Disabled for reduced motion; the curtain never blocks navigation. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [on, setOn] = useState(true); // covers the first paint, lifts after hydration
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const t = window.setTimeout(() => setOn(false), prefersReducedMotion() ? 0 : 120);
    return () => window.clearTimeout(t);
  }, [path]);

  const go = useCallback((href: string) => {
    if (prefersReducedMotion() || href === path) { router.push(href); return; }
    setOn(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => router.push(href), 520);
  }, [router, path]);

  return (
    <Ctx.Provider value={{ go }}>
      <div className={'curt' + (on ? ' on' : '')} aria-hidden="true">RAVIO</div>
      {children}
    </Ctx.Provider>
  );
}

/** Internal link that plays the page transition (falls back to normal navigation for modified clicks). */
export function TLink({ href, children, onClick, ...rest }: ComponentProps<typeof Link>) {
  const { go } = useTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (typeof href !== 'string' || !href.startsWith('/')) return;
        e.preventDefault();
        go(href);
      }}
    >
      {children}
    </Link>
  );
}
