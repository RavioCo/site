/** Conceptual placeholder art (clearly not photography). Deterministic for a given uid. */
export type Scene = 'sun' | 'horizon' | 'pique' | 'seam' | 'twill' | 'weave';

const rnd = (i: number, m: number) => ((i * m + 49297) % 233280) / 233280;
const grain = (u: string, o: number) =>
  `<filter id="g${u}"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .7 0 0 0 0"/></filter><rect width="100%" height="100%" filter="url(#g${u})" opacity="${o}"/>`;

const COLORS: Record<Scene, [string, string]> = {
  sun: ['#DCCDB4', '#A58D6E'], horizon: ['#6B6252', '#2A241E'], pique: ['#CDBFA6', '#9C8A70'],
  weave: ['#D2C6AF', '#A89874'], twill: ['#8E8C72', '#5E5F49'], seam: ['#44505C', '#26303A'],
};
const TX: Record<Scene, [number, string]> = {
  pique: [16, '<path d="M8 0L16 8L8 16L0 8Z" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/><path d="M8 0L16 8L8 16L0 8Z" fill="none" stroke="#000" stroke-opacity=".14" transform="translate(1.5 1.5)"/>'],
  weave: [6, '<path d="M0 3H6M3 0V6" stroke="#000" stroke-opacity=".13"/><path d="M0 4.5H6" stroke="#fff" stroke-opacity=".15"/>'],
  twill: [12, '<path d="M-3 3L3 -3M0 12L12 0M9 15L15 9" stroke="#000" stroke-opacity=".22" stroke-width="3"/><path d="M-3 7L7 -3M5 15L15 5" stroke="#fff" stroke-opacity=".1" stroke-width="2"/>'],
  seam: [8, '<path d="M-2 2L2 -2M0 8L8 0M6 10L10 6" stroke="#000" stroke-opacity=".25" stroke-width="2"/><path d="M-2 4L4 -2M2 10L10 2" stroke="#fff" stroke-opacity=".09"/>'],
  sun: [7, '<path d="M0 3.5H7M3.5 0V7" stroke="#000" stroke-opacity=".07"/>'],
  horizon: [7, '<path d="M0 3.5H7M3.5 0V7" stroke="#000" stroke-opacity=".1"/>'],
};
const FOLD = '<path d="M0 650Q420 430 900 570T1600 370V900H0Z" fill="#000" opacity=".16"/><path d="M0 240Q480 90 960 200T1600 50V0H0Z" fill="#fff" opacity=".2"/>';

function leaves(u: string, o: number) {
  let x = `<g filter="url(#bl${u})" opacity="${o}">`;
  for (let i = 0; i < 16; i++) {
    const a = rnd(i, 9301), b = rnd(i, 7919);
    x += `<ellipse cx="${a * 1100}" cy="${b * 620}" rx="${50 + b * 60}" ry="${14 + a * 14}" transform="rotate(${a * 140 - 20} ${a * 1100} ${b * 620})" fill="#1C1510"/>`;
  }
  return x + '</g>';
}
function figure(u: string) {
  const B = 'M1010 360Q1130 322 1250 360L1332 440L1292 532L1252 508V1300H1008V508L968 532L928 440Z';
  return `<g transform="translate(120 -250)"><ellipse cx="1200" cy="560" rx="270" ry="520" fill="#000" opacity=".14" filter="url(#bl${u})"/><path d="M962 528L1002 540L1000 1050L956 1050Z M1298 528L1258 540L1260 1050L1304 1050Z" fill="#9C7155"/><path d="M1096 230L1164 230L1172 352L1130 392L1088 352Z" fill="#A87C5E"/><path d="${B}" fill="#4A5140"/><path d="${B}" fill="url(#q${u})" opacity=".7"/><path d="${B}" fill="url(#l${u})"/><path d="M1088 336L1130 392L1100 400L1070 352Z M1172 336L1130 392L1160 400L1190 352Z" fill="#5C654E"/><path d="M1130 392V500" stroke="#2F3528" stroke-width="3"/><circle cx="1130" cy="430" r="4" fill="#D8CDB6"/><circle cx="1130" cy="466" r="4" fill="#D8CDB6"/></g>`;
}

export function draw(v: Scene, u: string): string {
  const c = COLORS[v], t = TX[v];
  let x = `<svg class="art" viewBox="0 0 1600 900" preserveAspectRatio="${v === 'sun' ? 'xMaxYMid' : 'xMidYMid'} slice" aria-hidden="true"><defs><linearGradient id="s${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient><radialGradient id="v${u}" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></radialGradient><linearGradient id="l${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></linearGradient><filter id="bl${u}"><feGaussianBlur stdDeviation="22"/></filter><pattern id="q${u}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M4.5 0L9 4.5L4.5 9L0 4.5Z" fill="none" stroke="#fff" stroke-opacity=".3"/></pattern><pattern id="t${u}" width="${t[0]}" height="${t[0]}" patternUnits="userSpaceOnUse">${t[1]}</pattern></defs><rect width="1600" height="900" fill="url(#s${u})"/><rect width="1600" height="900" fill="url(#t${u})"/>`;
  if (v === 'sun') x += `<path d="M0 0H900L1250 900H350Z" fill="#fff" opacity=".13" filter="url(#bl${u})"/>${leaves(u, 0.22)}${figure(u)}${leaves(u, 0.12)}`;
  else if (v === 'horizon') x += `<path d="M0 0H900L1250 900H350Z" fill="#fff" opacity=".07" filter="url(#bl${u})"/>${leaves(u, 0.35)}`;
  else {
    x += FOLD;
    if (v === 'weave') for (let i = 0; i < 80; i++) {
      const a = rnd(i, 9301), b = rnd(i, 7919);
      x += `<path d="M${a * 1600} ${b * 900}h${20 + a * 60}" stroke="${i % 3 ? '#fff' : '#000'}" stroke-opacity=".28" stroke-width="${1 + b * 1.5}"/>`;
    }
    if (v === 'seam') x += `<path d="M0 520L1600 300V900H0Z" fill="#000" opacity=".22"/><path d="M0 520L1600 300" stroke="#000" stroke-opacity=".4" stroke-width="12" filter="url(#bl${u})"/><path d="M0 500L1600 280M0 548L1600 328" stroke="#E6D8B8" stroke-width="5" stroke-dasharray="34 18"/>`;
  }
  return `${x}<rect width="1600" height="900" fill="url(#v${u})"/>${grain(u, 0.3)}</svg>`;
}

/** Neutral studio frame for a product slot awaiting photography. */
export function productPlaceholder(name: string, view: string, slotKey: string, u: string): string {
  return `<svg class="art" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Product photography forthcoming for ${name}, ${view}"><defs><linearGradient id="b${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9E2D3"/><stop offset="1" stop-color="#CDC2AE"/></linearGradient><radialGradient id="r${u}" cx=".2" cy=".1" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="500" fill="url(#b${u})"/><rect width="400" height="500" fill="url(#r${u})"/><path d="M0 350Q200 332 400 350V500H0Z" fill="#000" opacity=".05"/><path d="M22 52V22H52M348 22H378V52M378 448V478H348M52 478H22V448" fill="none" stroke="#6A645B" stroke-opacity=".5"/><text x="200" y="244" text-anchor="middle" font-size="26" fill="#4A443C" font-family="Cormorant Garamond,Georgia,serif">${name}</text><text x="200" y="270" text-anchor="middle" font-size="11" fill="#6A645B" font-family="Hanken Grotesk,sans-serif">${view} · Photography forthcoming</text><text x="200" y="468" text-anchor="middle" font-size="8.5" fill="#6A645B" fill-opacity=".7" font-family="Hanken Grotesk,sans-serif">Image slot ${slotKey} · 4:5</text></svg>`;
}
