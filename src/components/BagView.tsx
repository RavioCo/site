'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/products';
import { ORDERING_OPEN } from '@/lib/site';
import { PageBanner } from './PageBanner';
import { TLink } from './TransitionProvider';

export function BagView() {
  const { cart, ready, busy, error, setQty, remove, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');

  if (!ready) return <PageBanner title="Shopping bag" scene="pique" compact />;
  if (!cart || !cart.items.length) {
    return (
      <>
        <PageBanner title="Your bag is empty" scene="pique" compact />
        <div className="wrap prose" style={{ paddingTop: '6vh' }}>
          <p>Add a piece from the collection to begin.</p>
          <TLink className="btn" href="/shop">Browse the shop</TLink>
        </div>
      </>
    );
  }
  const t = cart.totals;
  const money = (v: string) => formatMoney(v, t.currency_code, t.currency_minor_unit);

  return (
    <>
      <PageBanner title="Shopping bag" scene="pique" compact />
      <div className="wrap prose" style={{ maxWidth: 820, paddingTop: '6vh' }}>
        {cart.items.map((i) => (
          <div className="bagrow" key={i.key}>
            <div className="im">
              {i.images[0] && /* eslint-disable-next-line @next/next/no-img-element */ <img className="art" src={i.images[0].src} alt={i.images[0].alt || i.name} loading="lazy" />}
            </div>
            <div>
              <h3>{i.name}</h3>
              <p className="tag" style={{ margin: '0 0 8px' }}>
                {i.variation.map((v) => `${v.attribute}: ${v.value}`).join(' · ')}{i.variation.length ? ' · ' : ''}{formatMoney(i.prices.price, i.prices.currency_code, i.prices.currency_minor_unit)}
              </p>
              <button className="link" disabled={busy} onClick={() => remove(i.key)}>Remove</button>
            </div>
            <div className="qty">
              <button aria-label={`Decrease quantity of ${i.name}`} disabled={busy || i.quantity <= i.quantity_limits.minimum} onClick={() => setQty(i.key, i.quantity - 1)}>−</button>
              <span aria-live="polite">{i.quantity}</span>
              <button aria-label={`Increase quantity of ${i.name}`} disabled={busy || i.quantity >= i.quantity_limits.maximum} onClick={() => setQty(i.key, i.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
        <div className="note" style={{ borderTop: '1px solid var(--ink)', marginTop: 10 }}>
          <p>Subtotal: {money(t.total_items)}</p>
          {cart.coupons.map((c) => (
            <p key={c.code}>Coupon {c.code}: −{money(c.totals.total_discount)} <button className="link" onClick={() => removeCoupon(c.code)}>Remove</button></p>
          ))}
          <p>Shipping and taxes are calculated at checkout. Total so far: {money(t.total_price)}</p>
        </div>
        <label htmlFor="coupon">Coupon code</label>
        <input id="coupon" value={code} maxLength={40} onChange={(e) => setCode(e.target.value)} autoComplete="off" />
        <button className="btn" disabled={busy || !code.trim()} onClick={async () => { if (await applyCoupon(code)) setCode(''); }}>Apply coupon</button>
        <p className={'msg' + (error ? ' err' : '')} role="status">{error ?? ''}</p>
        {ORDERING_OPEN
          ? <TLink className="btn" href="/checkout">Proceed to checkout</TLink>
          : <><button className="btn" disabled>Ordering opens soon</button><p className="tag">No payment is taken while ordering is closed.</p></>}
      </div>
    </>
  );
}
