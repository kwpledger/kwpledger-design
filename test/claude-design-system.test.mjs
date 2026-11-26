/**
 * Cases for consumers/claude-design-system/build.mjs, the producer for the
 * Design System artifact on claude.ai.
 *
 * The build is a consumer, not a gate, but it has one job a gate would have:
 * a token in the CSS must not silently miss the artifact. These cases prove it
 * carries every color across exactly, and that it STOPS on a token it has no
 * place for rather than dropping it.
 *
 * Each case copies the repo (no .git) to a temp directory, mutates one thing,
 * and runs the real build against the copy with --root. The repo's own files
 * are never touched. Zero dependencies.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(repo, 'consumers/claude-design-system/build.mjs');

function runWith(mutate = () => {}) {
  const dir = mkdtempSync(join(tmpdir(), 'kwp-cds-'));
  const root = join(dir, 'repo'), out = join(dir, 'out');
  try {
    cpSync(repo, root, { recursive: true, filter: (s) => !['.git', 'node_modules', 'office'].includes(basename(s)) });
    mutate(root);
    const r = spawnSync(process.execPath, [join(root, 'consumers/claude-design-system/build.mjs'), '--out', out, '--root', root], { encoding: 'utf8' });
    const read = (p) => readFileSync(join(out, p), 'utf8');
    return { status: r.status, output: r.stdout + r.stderr, read };
  } finally {
    // out is read inside the caller before cleanup via the returned closure
    process.on('exit', () => rmSync(dir, { recursive: true, force: true }));
  }
}
const edit = (root, file, fn) => writeFileSync(join(root, file), fn(readFileSync(join(root, file), 'utf8')));
const vars = (css, sel) => {
  const s = css.replace(/\/\*[\s\S]*?\*\//g, ''); const i = s.indexOf(sel); const j = s.indexOf('{', i);
  return Object.fromEntries([...s.slice(j + 1, s.indexOf('}', j)).matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim().split(/\s+/).join(' ')]));
};

test('the unmodified repo builds', () => {
  const r = runWith();
  assert.equal(r.status, 0, r.output);
});

test('every color in the token CSS reaches tokens.json, both themes, same value', () => {
  const r = runWith();
  const t = JSON.parse(r.read('project/tokens.json'));
  const by = Object.fromEntries(t.color.tokens.map((x) => [x.name, x.value]));
  const resolve = (n, th) => { const v = by[n]; const s = typeof v === 'string' ? v : v[th]; const m = /^\{(.+)\}$/.exec(s); return m ? resolve(m[1], th) : s; };
  const varOf = (v, map) => { const m = /^var\(--([\w-]+)\)$/.exec(v); return m ? varOf(map[m[1]], map) : v; };
  for (const f of ['base', 'categorical', 'status']) {
    const css = readFileSync(join(repo, 'tokens', f + '.css'), 'utf8');
    const light = vars(css, ':root {'), dark = { ...light, ...vars(css, ':root[data-theme="dark"]') };
    const baseLight = f === 'base' ? light : {};
    for (const [n, v] of Object.entries(light)) {
      if (!/^(#|oklch|var\()/.test(v)) continue; // lengths, stacks, weights
      assert.ok(n in by, `--${n} is missing from tokens.json`);
      assert.equal(resolve(n, 'light').toLowerCase(), varOf(v, { ...baseLight, ...light }).toLowerCase(), `--${n} light`);
      assert.equal(resolve(n, 'dark').toLowerCase(), varOf(dark[n], { ...light, ...dark }).toLowerCase(), `--${n} dark`);
    }
  }
});

test('a new token in base.css with no usage note stops the build', () => {
  const r = runWith((root) => edit(root, 'tokens/base.css', (s) => s.replace('--border: var(--sand-200);', '--border: var(--sand-200);\n  --focus-ring: var(--teal-700);')));
  assert.notEqual(r.status, 0);
  assert.match(r.output, /--focus-ring/);
});

test('a token removed from base.css but still in usage.json stops the build', () => {
  const r = runWith((root) => edit(root, 'tokens/base.css', (s) => s.replace('  --ink-500: #5c5a57;\n', '')));
  assert.notEqual(r.status, 0);
  assert.match(r.output, /--ink-500/);
});

test('a new status meaning stops the build', () => {
  const r = runWith((root) => edit(root, 'tokens/status.css', (s) => s.replace('--danger-surface:', '--info-surface: oklch(88% 0.058 230);\n  --danger-surface:')));
  assert.notEqual(r.status, 0);
  assert.match(r.output, /info/);
});

test('a ninth categorical slot missing its dark value stops the build', () => {
  const r = runWith((root) => edit(root, 'tokens/categorical.css', (s) => s.replace('--data-8-border: oklch(80% 0.075 345);', '--data-8-border: oklch(80% 0.075 345);\n  --data-9-surface: oklch(90% 0.046 380);\n  --data-9-fg: oklch(38% 0.062 380);\n  --data-9-border: oklch(80% 0.075 380);')));
  assert.notEqual(r.status, 0);
  assert.match(r.output, /data-9/);
});

test('a new doc is reported, not silently skipped', () => {
  const r = runWith((root) => writeFileSync(join(root, 'docs/new-format.md'), '# New format\n'));
  assert.equal(r.status, 0, r.output);
  assert.match(r.output, /new doc not mapped: docs\/new-format\.md/);
});
