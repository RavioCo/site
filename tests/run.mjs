// Transpile the pure TS modules with TypeScript (no install needed beyond `typescript`), then run node:test.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const ts = require(process.env.TS_PATH ?? 'typescript');
mkdirSync('tests/.build', { recursive: true });
const out = ts.transpileModule(readFileSync('src/lib/products.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
writeFileSync('tests/.build/products.mjs', out.outputText);
const r = spawnSync(process.execPath, ['--test', 'tests/products.test.mjs'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
