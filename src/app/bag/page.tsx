import type { Metadata } from 'next';
import { BagView } from '@/components/BagView';

export const metadata: Metadata = { title: 'Shopping bag', robots: { index: false }, alternates: { canonical: '/bag/' } };
export default function Bag() { return <BagView />; }
