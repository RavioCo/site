// Optimizes source photos into public/images (AVIF + WebP, three widths) and prints srcSet strings.
// Usage: put originals in asset-source/<folder>/<name>.jpg (folder = campaign, editorial, polo, ...), then `npm run images`.
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'asset-source', OUT = 'public/images', WIDTHS = [800, 1600, 2400];
async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png|tiff?)$/i.test(e.name)) yield p;
  }
}
for await (const file of walk(SRC)) {
  const rel = file.slice(SRC.length + 1), { dir, name } = parse(rel);
  await mkdir(join(OUT, dir), { recursive: true });
  const meta = await sharp(file).metadata();
  const sets = { webp: [], avif: [] };
  for (const w of WIDTHS.filter((w) => w <= (meta.width ?? w))) {
    for (const fmt of ['webp', 'avif']) {
      const out = join(OUT, dir, `${name}-${w}.${fmt}`);
      await sharp(file).resize({ width: w }).toFormat(fmt, { quality: fmt === 'avif' ? 55 : 78 }).toFile(out);
      sets[fmt].push(`/images/${dir}/${name}-${w}.${fmt} ${w}w`);
    }
  }
  console.log(`\n${rel} (${meta.width}x${meta.height})\n  src:    /images/${dir}/${name}-1600.webp\n  srcSet: ${sets.webp.join(', ')}`);
}
console.log('\nNext: set src/srcSet in src/lib/images.ts. Mark status "verified" only for genuine RAVIO photographs.');
