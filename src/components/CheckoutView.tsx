'use client';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/products';
import { ORDERING_OPEN } from '@/lib/site';
import { store, StoreError } from '@/lib/storeClient';
import type { MarketsResponse, WcCart } from '@/lib/woo/types';
import { PageBanner } from './PageBanner';
import { TLink } from './TransitionProvider';

interface CheckoutResult { order_id: number; order_key: string; status: string; billing_address: { email: string }; payment_result: { payment_status: string; redirect_url?: string } }
const EMPTY = { first_name: '', last_name: '', email: '', phone: '', address_1: '', address_2: '', city: '', state: '', postcode: '', country: 'BD' };

/**
 * Totals, shipping rates and the set of allowed payment methods all come from WooCommerce and the RAVIO bridge plugin.
 * The browser sends only customer-entered fields and a payment-method id; it never sends prices.
 */
export function CheckoutView() {
  const { cart, ready, setCart, refresh } = useCart();
  const [markets, setMarkets] = useState<MarketsResponse | null>(null);
  const [f, setF] = useState(EMPTY);
  const [pay, setPay] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { store<MarketsResponse>('markets').then(setMarkets).catch(() => setErr('Checkout is temporarily unavailable.')); }, []);
  const market = markets?.countries.find((c) => c.code === f.country);
  const states = market?.states ?? {};

  // Address sync: debounced (700 ms), only when the destination is complete enough to price, skipped when unchanged.
  // Shipping, tax and totals always come back from WooCommerce; the page never computes them.
  const lastSent = useRef('');
  const prevRate = useRef<string | null>(null);
  const [addrBusy, setAddrBusy] = useState(false);
  const [rateNotice, setRateNotice] = useState<string | null>(null);
  const needsState = Object.keys(states).length > 0;
  const needsShipping = cart?.needs_shipping ?? false;

  useEffect(() => {
    if (!ready || !needsShipping || !market || !f.country || (needsState && !f.state)) { setAddrBusy(false); return; }
    const addr = { country: f.country, state: f.state, city: f.city, postcode: f.postcode };
    const sig = JSON.stringify(addr);
    if (sig === lastSent.current) return;
    setAddrBusy(true);
    const t = setTimeout(async () => {
      lastSent.current = sig;
      try {
        const c = await store<WcCart>('cart/update-customer', { method: 'POST', body: { billing_address: addr, shipping_address: addr } });
        if (lastSent.current !== sig) return; // a newer edit superseded this response
        setCart(c);
        const ids = c.shipping_rates[0]?.shipping_rates.map((r) => r.rate_id) ?? [];
        setRateNotice(prevRate.current && !ids.includes(prevRate.current) ? 'Delivery options changed for this address. Please choose one again.' : null);
        prevRate.current = c.shipping_rates[0]?.shipping_rates.find((r) => r.selected)?.rate_id ?? null;
      } catch (e) {
        lastSent.current = '';
        setErr(e instanceof StoreError ? e.message : 'Could not update delivery options.');
      } finally {
        if (lastSent.current === sig || lastSent.current === '') setAddrBusy(false);
      }
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.country, f.state, f.city, f.postcode, ready, needsShipping, needsState, market?.code]);

  // Payment methods depend on the country; drop a selection that is no longer offered.
  useEffect(() => { setPay((p) => (market?.payment_methods.some((m) => m.id === p) ? p : '')); }, [market]);

  const rates = useMemo(() => cart?.shipping_rates[0]?.shipping_rates ?? [], [cart]);
  const selected = rates.find((r) => r.selected);
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value, ...(k === 'country' ? { state: '' } : {}) }));

  if (!ORDERING_OPEN) return <><PageBanner title="Checkout" scene="pique" compact /><div className="wrap prose" style={{ paddingTop: '6vh' }}><p>Ordering opens soon.</p></div></>;
  if (!ready) return <PageBanner title="Checkout" scene="pique" compact />;
  if (!cart?.items.length) return <><PageBanner title="Checkout" scene="pique" compact /><div className="wrap prose" style={{ paddingTop: '6vh' }}><p>Your bag is empty.</p><TLink className="btn" href="/shop">Browse the shop</TLink></div></>;

  const t = cart.totals;
  const money = (v: string) => formatMoney(v, t.currency_code, t.currency_minor_unit);

  const chooseRate = async (rateId: string) => {
    try { const c = await store<WcCart>('cart/select-shipping-rate', { method: 'POST', body: { package_id: cart.shipping_rates[0].package_id, rate_id: rateId } }); setCart(c); prevRate.current = rateId; setRateNotice(null); }
    catch (e) { setErr(e instanceof StoreError ? e.message : 'Could not select shipping.'); }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setErr(null);
    if (!pay) { setErr('Please choose a payment method.'); return; }
    if (addrBusy) { setErr('Updating delivery options. Please try again in a moment.'); return; }
    if (cart.needs_shipping && !selected) { setErr('Please choose a shipping option.'); return; }
    setBusy(true);
    try {
      if (cart.needs_shipping) {
        // Explicit, final address sync so the server prices exactly what is being ordered.
        const a = { country: f.country, state: f.state, city: f.city, postcode: f.postcode };
        const fresh = await store<WcCart>('cart/update-customer', { method: 'POST', body: { billing_address: a, shipping_address: a } });
        setCart(fresh);
        const sel = fresh.shipping_rates[0]?.shipping_rates.find((r) => r.selected);
        if (!sel) { setErr('Delivery options changed. Please choose a shipping option.'); setBusy(false); return; }
        if (sel.rate_id !== selected?.rate_id || fresh.totals.total_price !== t.total_price) {
          setErr('Your total changed after updating your address. Please review it and place the order again.'); setBusy(false); return;
        }
      }
      const addr = { first_name: f.first_name, last_name: f.last_name, address_1: f.address_1, address_2: f.address_2, city: f.city, state: f.state, postcode: f.postcode, country: f.country, phone: f.phone };
      const r = await store<CheckoutResult>('checkout', { method: 'POST', body: {
        billing_address: { ...addr, email: f.email }, shipping_address: addr, payment_method: pay, payment_data: [], customer_note: note.slice(0, 500),
      } });
      if (r.payment_result?.redirect_url && /^https:\/\//.test(r.payment_result.redirect_url)) { window.location.assign(r.payment_result.redirect_url); return; }
      window.location.assign(`/order/?id=${r.order_id}&key=${encodeURIComponent(r.order_key)}&email=${encodeURIComponent(f.email)}`);
    } catch (x) {
      setErr(x instanceof StoreError ? x.message : 'Checkout failed. You have not been charged. Please try again.');
      await refresh(); setBusy(false);
    }
  };

  return (
    <>
      <PageBanner title="Checkout" scene="pique" compact />
      <form className="wrap prose" style={{ maxWidth: 820, paddingTop: '6vh' }} onSubmit={submit} noValidate>
        <h2>Delivery</h2>
        <label htmlFor="country">Country</label>
        <select id="country" value={f.country} onChange={set('country')}>
          {markets?.countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
        {([['first_name', 'First name', 'given-name'], ['last_name', 'Last name', 'family-name'], ['email', 'Email', 'email'], ['phone', 'Phone', 'tel'], ['address_1', 'Address', 'address-line1'], ['address_2', 'Apartment, suite (optional)', 'address-line2'], ['city', 'City', 'address-level2'], ['postcode', 'Postcode', 'postal-code']] as const).map(([k, l, ac]) => (
          <div key={k}><label htmlFor={k}>{l}</label><input id={k} value={f[k]} onChange={set(k)} autoComplete={ac} maxLength={120} required={k !== 'address_2'} type={k === 'email' ? 'email' : 'text'} /></div>
        ))}
        <label htmlFor="state">State / district</label>
        {Object.keys(states).length
          ? <select id="state" value={f.state} onChange={set('state')} required><option value="">Select</option>{Object.entries(states).map(([c, n]) => <option key={c} value={c}>{n}</option>)}</select>
          : <input id="state" value={f.state} onChange={set('state')} maxLength={60} />}

        {cart.needs_shipping && <>
          <h2>Shipping</h2>
          {addrBusy && <p className="tag" role="status">Updating delivery options…</p>}
          {rateNotice && <p className="msg err" role="status">{rateNotice}</p>}
          {!addrBusy && rates.length === 0 && <p>No delivery option is available for this address yet.</p>}
          {rates.map((r) => (
            <label key={r.rate_id} style={{ display: 'block' }}>
              <input type="radio" name="rate" checked={r.selected} disabled={addrBusy} onChange={() => chooseRate(r.rate_id)} style={{ width: 'auto', padding: 0, marginRight: 8 }} /> {r.name} · {formatMoney(r.price, r.currency_code, r.currency_minor_unit)}{r.delivery_time ? ` · ${r.delivery_time}` : ''}
            </label>
          ))}
        </>}

        <h2>Payment</h2>
        {market?.payment_methods.length ? market.payment_methods.map((m) => (
          <label key={m.id} style={{ display: 'block' }}><input type="radio" name="pay" value={m.id} checked={pay === m.id} onChange={() => setPay(m.id)} style={{ width: 'auto', padding: 0, marginRight: 8 }} /> {m.title}</label>
        )) : <p>No payment method is available for this country.</p>}

        <label htmlFor="note">Order note (optional)</label>
        <textarea id="note" value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} />

        <div className="note" style={{ borderTop: '1px solid var(--ink)', marginTop: 10 }}>
          <p>Subtotal: {money(t.total_items)}</p>
          {t.total_shipping !== null && <p>Shipping: {money(t.total_shipping)}</p>}
          {Number(t.total_tax) > 0 && <p>Tax: {money(t.total_tax)}</p>}
          <p>Total: {money(t.total_price)} ({t.currency_code})</p>
          <p className="tag">The amount is calculated by the store, not by this page.</p>
        </div>
        <p className={'msg' + (err ? ' err' : '')} role="status">{err ?? ''}</p>
        <button className="btn" type="submit" disabled={busy || addrBusy || !market?.payment_methods.length}>{busy ? 'Placing order…' : 'Place order'}</button>
      </form>
    </>
  );
}
