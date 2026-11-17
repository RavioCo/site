import { AboutPage } from '@/components/AboutPage';
import { meta } from '@/lib/seo';

// Same content as /about; canonical points there to avoid duplicate-content issues.
export const metadata = meta('The RAVIO Standard', 'The RAVIO philosophy and mission: refinement as a lifelong pursuit.', '/about/');
export default AboutPage;
