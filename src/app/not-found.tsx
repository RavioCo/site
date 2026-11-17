import { PageBanner } from '@/components/PageBanner';
import { TLink } from '@/components/TransitionProvider';

export default function NotFound() {
  return (
    <>
      <PageBanner title="Page not found" scene="twill" compact />
      <div className="wrap prose" style={{ paddingTop: '6vh' }}>
        <p>That page does not exist.</p>
        <TLink className="btn" href="/">Return home</TLink>
      </div>
    </>
  );
}
