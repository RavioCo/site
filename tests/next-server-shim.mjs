// Minimal stand-in for `next/server` (written by us) so the route handler's OWN logic can be exercised under plain Node.
// It does NOT prove real Next.js behaviour (cookie serialisation, routing, caching).
export class NextRequest extends Request {
  constructor(url, init) { super(url, init); this.nextUrl = new URL(url);
    const jar = Object.fromEntries((this.headers.get('cookie') ?? '').split(/;\s*/).filter(Boolean).map((p) => { const i = p.indexOf('='); return [p.slice(0, i), p.slice(i + 1)]; }));
    this.cookies = { get: (n) => (n in jar ? { name: n, value: jar[n] } : undefined) }; }
}
export class NextResponse extends Response {
  static json(body, init = {}) { const r = new NextResponse(JSON.stringify(body), { status: init.status ?? 200, headers: { 'content-type': 'application/json', ...(init.headers ?? {}) } });
    r.cookieCalls = []; r.cookies = { set: (name, value, opts) => { r.cookieCalls.push({ name, value, opts }); r.headers.append('set-cookie', `${name}=${value}; Path=${opts.path}; Max-Age=${opts.maxAge}${opts.httpOnly ? '; HttpOnly' : ''}; SameSite=${opts.sameSite}${opts.secure ? '; Secure' : ''}${opts.domain ? '; Domain=' + opts.domain : ''}`); } }; return r; }
}
