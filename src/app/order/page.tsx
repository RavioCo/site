import type { Metadata } from 'next';
import { OrderView } from '@/components/OrderView';
export const metadata: Metadata = { title: 'Order confirmation', robots: { index: false }, alternates: { canonical: '/order/' } };
export default function Order() { return <OrderView />; }
