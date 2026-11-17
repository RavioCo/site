'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { NAV } from '@/lib/site';
import { TLink, useTransition } from './TransitionProvider';

export function Header() {
  const path = usePathname().replace(/\/$/, '') || '/';
  const { count } = useCart();
  const { go } = useTransition();
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    let last = 0;
    const onScroll = () => { const y = window.scrollY; setHide(y > last && y > 240); last = y; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={hide ? 'hide' : ''}>
      <TLink className="logo" href="/" aria-label="RAVIO home">RAVIO</TLink>
      <button className="menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>Menu</button>
      <nav id="nav" className={open ? 'open' : ''} aria-label="Primary">
        {NAV.map((n) => (
          <TLink key={n.href} href={n.href} aria-current={path === n.href ? 'page' : undefined}>{n.label}</TLink>
        ))}
      </nav>
      <button className="bagbtn" aria-label={`Open shopping bag, ${count} items`} onClick={() => go('/bag')}>
        Bag (<span id="count">{count}</span>)
      </button>
    </header>
  );
}
