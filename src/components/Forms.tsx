'use client';
import { useState, type FormEvent } from 'react';
import { FORMS_ENDPOINT, SITE } from '@/lib/site';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
type Result = 'sent' | 'unconnected' | 'failed';

/** Posts JSON to NEXT_PUBLIC_FORMS_ENDPOINT when configured. Never pretends a message was delivered. */
async function send(kind: 'newsletter' | 'contact', data: Record<string, string>): Promise<Result> {
  if (!FORMS_ENDPOINT) return 'unconnected';
  try {
    const r = await fetch(FORMS_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...data }) });
    return r.ok ? 'sent' : 'failed';
  } catch { return 'failed'; }
}
const Honeypot = () => (
  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -999 }} />
);

export function NewsletterForm() {
  const [msg, setMsg] = useState<{ t: string; err?: boolean }>({ t: '' });
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email') ?? '').trim();
    if (!EMAIL.test(email)) { setMsg({ t: 'Enter a valid email address.', err: true }); return; }
    if (f.get('website')) { setMsg({ t: 'Thank you.' }); return; }
    const r = await send('newsletter', { email });
    setMsg({
      t: r === 'sent' ? 'Thank you. You will hear from us first.'
        : r === 'unconnected' ? 'Thank you. Signups are not yet connected to a mailing service, so nothing was stored.'
          : `Something went wrong. Please try again or write to ${SITE.email}.`,
      err: r === 'failed',
    });
  };
  return (
    <form className="rv" noValidate onSubmit={submit}>
      <label htmlFor="nle">Email address</label>
      <div className="nlr">
        <input id="nle" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        <Honeypot />
        <button className="btn" type="submit">Subscribe</button>
      </div>
      <p className={'msg' + (msg.err ? ' err' : '')} role="status">{msg.t}</p>
    </form>
  );
}

export function ContactForm() {
  const [msg, setMsg] = useState<{ t: string; err?: boolean }>({ t: '' });
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim(), email = String(f.get('email') ?? '').trim(), message = String(f.get('message') ?? '').trim();
    if (!name || !EMAIL.test(email) || !message) { setMsg({ t: 'Complete your name, a valid email and a message.', err: true }); return; }
    if (f.get('website')) { setMsg({ t: 'Thank you.' }); return; }
    const r = await send('contact', { name, email, message });
    setMsg({
      t: r === 'sent' ? 'Thank you. Your message has been sent.'
        : r === 'unconnected' ? `The contact form is not yet connected to an inbox, so this message was not sent. Please write to ${SITE.email}.`
          : `Something went wrong. Please try again or write to ${SITE.email}.`,
      err: r !== 'sent',
    });
  };
  return (
    <form noValidate onSubmit={submit}>
      <label htmlFor="cn">Name</label><input id="cn" name="name" autoComplete="name" />
      <label htmlFor="ce">Email</label><input id="ce" name="email" type="email" autoComplete="email" />
      <label htmlFor="cmsg">Message</label><textarea id="cmsg" name="message" rows={6} />
      <Honeypot />
      <p className={'msg' + (msg.err ? ' err' : '')} role="status">{msg.t}</p>
      <button className="btn" type="submit">Send message</button>
    </form>
  );
}
