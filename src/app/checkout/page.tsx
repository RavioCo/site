import type { Metadata } from 'next';
import { CheckoutView } from '@/components/CheckoutView';
export const metadata: Metadata = { title: 'Checkout', robots: { index: false }, alternates: { canonical: '/checkout/' } };
export default function Checkout() { return <CheckoutView />; }
