'use client';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/lib/products';
import { store } from '@/lib/storeClient';
import { PageBanner } from './PageBanner';
import { TLink } from './TransitionProvider';

interface Order { id: number; status: string; totals: { total_price: string; currency_code: string; currency_minor_unit: number }; payment_method?: string }

/** Shows order status from WooCommerce. "Paid" is never inferred client-side: only WooCommerce's status is displayed. */
export function OrderView() {
  const [order, setOrder] = useState<Order | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading');
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id') ?? ''; const key = p.get('key') ?? ''; const email = p.get('email') ?? '';
    if (!/^\d{1,12}$/.test(id) || !key) { setState('missing'); return; }
    store<Order>(`order/${id}`, { query: `?key=${encodeURIComponent(key)}&billing_email=${encodeURIComponent(email)}` })
      .then((o) => { setOrder(o); setState('ok'); }).catch(() => setState('missing'));
  }, []);
  const label: Record<string, string> = { processing: 'Payment received. We are preparing your order.', 'on-hold': 'Order received. Awaiting confirmation.', pending: 'Awaiting payment confirmation.', completed: 'Completed.', failed: 'Payment failed. You have not been charged for a completed order.', cancelled: 'Cancelled.' };
  return (
    <>
      <PageBanner title="Order" scene="pique" compact />
      <div className="wrap prose" style={{ paddingTop: '6vh' }} aria-live="polite">
        {state === 'loading' && <p>Loading your order…</p>}
        {state === 'missing' && <p>We could not find that order. If you completed a payment, check your email for confirmation.</p>}
        {state === 'ok' && order && <>
          <h2>Order #{order.id}</h2>
          <p>{label[order.status] ?? `Status: ${order.status}`}</p>
          <p>Total: {formatMoney(order.totals.total_price, order.totals.currency_code, order.totals.currency_minor_unit)}</p>
        </>}
        <TLink className="btn" href="/shop">Continue shopping</TLink>
      </div>
    </>
  );
}
