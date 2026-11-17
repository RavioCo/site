'use client';
/** Browser client for the same-origin proxy. Trailing slashes are required (next.config trailingSlash: true). */
export class StoreError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); this.name = 'StoreError'; }
}
export async function store<T>(path: string, init: { method?: 'GET' | 'POST'; body?: unknown; query?: string } = {}): Promise<T> {
  const res = await fetch(`/api/store/${path}/${init.query ?? ''}`, {
    method: init.method ?? 'GET',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: init.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let json: unknown = null;
  try { json = await res.json(); } catch { /* non-JSON */ }
  if (!res.ok) {
    const j = (json ?? {}) as { code?: string; message?: string };
    throw new StoreError(res.status, j.code ?? 'error', j.message ?? 'Something went wrong. Please try again.');
  }
  return json as T;
}
