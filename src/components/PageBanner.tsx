import type { Scene } from '@/lib/conceptArt';
import { SceneImage } from './ImageSlot';

export function PageBanner({ title, scene, compact }: { title: string; scene: Scene; compact?: boolean }) {
  return (
    <div className={'pghero' + (compact ? ' s' : '')}>
      <SceneImage scene={scene} />
      <h1>{title}</h1>
    </div>
  );
}
