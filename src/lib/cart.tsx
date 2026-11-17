'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { store, StoreError } from './storeClient';
import type { WcCart } from './woo/types';

/**
 * The WooCommerce cart is authoritative. This provider holds only a read-through copy of the server cart.
 * Nothing about the cart is persisted in localStorage; the session is an HttpOnly cookie set by the proxy.
 */
interface CartApi {
  cart: WcCart | null;
  count: number;
  ready: boolean;
  busy: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  add: (productId: number, opts?: { variationId?: number; variation?: { attribute: string; value: string }[]; quantity?: number }) => Promise<boolean>;
  setQty: (key: string, quantity: number) => Promise<void>;
  remove: (key: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: (code: string) => Promise<void>;
  setCart: (c: WcCart) => void;
}
const Ctx = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<WcCart | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async <T,>(fn: () => Promise<T>): Promise<T | undefined> => {
    setBusy(true); setError(null);
    try { return await fn(); }
    catch (e) { setError(e instanceof StoreError ? e.message : 'Something went wrong. Please try again.'); return undefined; }
    finally { setBusy(false); }
  }, []);

  const refresh = useCallback(async () => {
    const c = await run(() => store<WcCart>('cart'));
    if (c) setCart(c);
    setReady(true);
  }, [run]);

  useEffect(() => { void refresh(); }, [refresh]);

  const api = useMemo<CartApi>(() => ({
    cart, ready, busy, error, refresh, setCart,
    count: cart?.items_count ?? 0,
    async add(productId, opts = {}) {
      const id = opts.variationId ?? productId;
      const c = await run(() => store<WcCart>('cart/add-item', { method: 'POST', body: { id, quantity: opts.quantity ?? 1, ...(opts.variation ? { variation: opts.variation } : {}) } }));
      if (c) setCart(c);
      return Boolean(c);
    },
    async setQty(key, quantity) {
      const c = await run(() => store<WcCart>('cart/update-item', { method: 'POST', body: { key, quantity } }));
      if (c) setCart(c);
    },
    async remove(key) {
      const c = await run(() => store<WcCart>('cart/remove-item', { method: 'POST', body: { key } }));
      if (c) setCart(c);
    },
    async applyCoupon(code) {
      const c = await run(() => store<WcCart>('cart/apply-coupon', { method: 'POST', body: { code: code.trim().slice(0, 40) } }));
      if (c) setCart(c);
      return Boolean(c);
    },
    async removeCoupon(code) {
      const c = await run(() => store<WcCart>('cart/remove-coupon', { method: 'POST', body: { code } }));
      if (c) setCart(c);
    },
  }), [cart, ready, busy, error, refresh, run]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart(): CartApi {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used inside <CartProvider>');
  return c;
}
