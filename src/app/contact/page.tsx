import { ContactForm } from '@/components/Forms';
import { PageBanner } from '@/components/PageBanner';
import { SocialLinks } from '@/components/SocialLinks';
import { meta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = meta('Contact', 'Write to RAVIO & Co. or follow our official Facebook and Instagram accounts.', '/contact/');

export default function Contact() {
  return (
    <>
      <PageBanner title="Contact" scene="weave" compact />
      <div className="wrap cts">
        <div>
          <h2>Write to the house</h2>
          <p style={{ margin: '18px 0 4px' }}><a className="ul" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p className="tag">ravioco.com</p>
          <h3 style={{ margin: '36px 0 4px' }}>Follow RAVIO</h3>
          <SocialLinks />
          <p className="tag" style={{ marginTop: 12 }}>Official accounts: facebook.com/ravioco and instagram.com/ravioco</p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
