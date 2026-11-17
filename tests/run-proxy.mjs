import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
const require = createRequire(import.meta.url);
const esbuild = require(process.env.ESBUILD_PATH ?? 'esbuild');
mkdirSync('tests/.build', { recursive: true });
await esbuild.build({
  entryPoints: ['src/app/api/store/[...path]/route.ts'], outfile: 'tests/.build/route.mjs', bundle: true, format: 'esm', platform: 'node', logLevel: 'error',
  alias: { '@': path.resolve('src'), 'next/server': path.resolve('tests/next-server-shim.mjs') },
});
process.exit(spawnSync(process.execPath, ['--test', 'tests/proxy.test.mjs'], { stdio: 'inherit' }).status ?? 1);
