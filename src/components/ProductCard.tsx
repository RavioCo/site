import { availabilityLabel, priceLabel, type Product } from '@/lib/products';
import { ProductImage } from './ImageSlot';
import { TLink } from './TransitionProvider';

/** First child must stay the .im element (the 3D tilt effect targets it). */
export function ProductCard({ p }: { p: Product }) {
  return (
    <TLink className="card rv" href={`/product/${p.id}`}>
      <div className="im"><ProductImage product={p} view={0} /></div>
      <h3>{p.name}</h3>
      <p>{p.categoryName}</p>
      <p>{priceLabel(p)} · {availabilityLabel(p)}</p>
    </TLink>
  );
}
