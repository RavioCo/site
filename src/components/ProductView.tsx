'use client';
import { useMemo, useState, type PointerEvent } from 'react';
import { useCart } from '@/lib/cart';
import { VIEWS } from '@/lib/images';
import { availabilityLabel, findVariation, formatMoney, normAttr, priceLabel, type Product } from '@/lib/products';
import { ORDERING_OPEN } from '@/lib/site';
import { ProductImage } from './ImageSlot';
import { ProductCard } from './ProductCard';
import { TLink } from './TransitionProvider';

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { add, busy, error } = useCart();
  const views = Math.max(product.images.length, VIEWS.length);
  const [view, setView] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<'ok' | 'select' | null>(null);

  const needed = product.attributes;
  const complete = needed.every((a) => chosen[normAttr(a.name)]);
  const variation = useMemo(() => findVariation(product, chosen), [product, chosen]);
  const isVariable = product.type === 'variable';
  const unavailable = product.availability !== 'available' || (isVariable && complete && (!variation || !variation.inStock || !variation.purchasable));
  const shownPrice = variation?.price != null ? formatMoney(variation.price, product.currency, product.minorUnit) : priceLabel(product);

  const zoom = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--ox', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--oy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onAdd = async () => {
    if (isVariable && !complete) { setMsg('select'); return; }
    const ok = await add(product.wcId, isVariable && variation
      ? { variationId: variation.id, variation: variation.attributes.map((a) => ({ attribute: a.name, value: a.value || (chosen[normAttr(a.name)] ?? '') })) }
      : {});
    setMsg(ok ? 'ok' : null);
  };
  const label = (i: number) => (product.images.length ? `View ${i + 1}` : VIEWS[i % VIEWS.length]);

  return (
    <div className="wrap">
      <p className="tag" style={{ paddingTop: 24 }}>
        <TLink href="/shop">Shop</TLink> / <TLink href={`/shop/${product.category}`}>{product.categoryName}</TLink>
      </p>
      <div className="pdp">
        <div className="stage">
          <div className="sv" onPointerMove={zoom}>
            {Array.from({ length: views }, (_, i) => (
              <div key={i} className={'sl' + (i === view ? ' on' : '')}><ProductImage product={product} view={i} /></div>
            ))}
          </div>
          <div className="thumbs">
            {Array.from({ length: views }, (_, i) => (
              <button key={i} className={'th' + (i === view ? ' on' : '')} aria-label={`Show ${label(i).toLowerCase()}`} aria-pressed={i === view} onClick={() => setView(i)}>
                <ProductImage product={product} view={i} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(36px,5vw,64px)' }}>{product.name}</h1>
          <p style={{ margin: '16px 0 4px' }}>
            {product.onSale && product.regularPrice != null && <s style={{ opacity: 0.55, marginRight: 8 }}>{formatMoney(product.regularPrice, product.currency, product.minorUnit)}</s>}
            {shownPrice}
          </p>
          <p className="tag">
            Availability: {(variation ? (variation.inStock ? 'available' : 'sold out') : availabilityLabel(product).toLowerCase())}
            {product.lowStock ? ` · only ${product.lowStock} left` : ''}
          </p>
          <p>{product.description}</p>
          {needed.map((a) => {
            const id = `attr-${a.key}`;
            return (
              <div key={a.key}>
                <div id={id} style={{ fontSize: 14 }}>{a.name}</div>
                <div className="sizes" role="group" aria-labelledby={id}>
                  {a.options.map((o) => (
                    <button key={o.slug} aria-pressed={chosen[normAttr(a.name)] === o.slug}
                      onClick={() => { setChosen((c) => ({ ...c, [normAttr(a.name)]: o.slug })); setMsg(null); }}>{o.name}</button>
                  ))}
                </div>
              </div>
            );
          })}
          <button className="btn" style={{ width: '100%' }} disabled={unavailable || busy || !ORDERING_OPEN} onClick={onAdd}>
            {product.availability === 'sold-out' || unavailable ? (product.availability === 'coming-soon' ? 'Coming soon' : 'Unavailable') : ORDERING_OPEN ? 'Add to bag' : 'Ordering opens soon'}
          </button>
          <p className={'msg' + (msg === 'select' || error ? ' err' : '')} role="status">
            {msg === 'select' && `Please select ${needed.map((a) => a.name.toLowerCase()).join(' and ')}.`}
            {msg === 'ok' && <>Added to your bag. <TLink href="/bag">View bag</TLink></>}
            {error && msg !== 'ok' ? error : ''}
          </p>
        </div>
      </div>
      <h2 style={{ marginBottom: 28 }}>Also considered</h2>
      <div className="grid" style={{ paddingBottom: '12vh' }}>
        {related.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
