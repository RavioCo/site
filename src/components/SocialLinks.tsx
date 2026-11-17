import { SITE } from '@/lib/site';

export const FbIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" />
  </svg>
);
export const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Official accounts only. Opens in a new tab with accessible labels. */
export function SocialLinks() {
  const items = [
    { name: 'Facebook', href: SITE.facebook, icon: <FbIcon /> },
    { name: 'Instagram', href: SITE.instagram, icon: <IgIcon /> },
  ];
  return (
    <div className="socs">
      {items.map((s) => (
        <a key={s.name} className="soc" href={s.href} target="_blank" rel="noopener noreferrer"
           aria-label={`RAVIO on ${s.name} (opens in a new tab)`}>{s.icon}</a>
      ))}
    </div>
  );
}
