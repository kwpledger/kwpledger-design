/**
 * Failure cases for `npm run verify`.
 *
 * The verifier checks values. THIS checks the verifier — that it rejects
 * broken input rather than reporting "All gates pass" on it.
 *
 * Why it exists: a review on 2026-09-09 removed `--data-8` from the token file
 * and the verifier still passed, because it iterated whichever slots it
 * happened to parse. A release gate that cannot fail is not a gate, and the
 * only way to know it can fail is to break it on purpose.
 *
 * Each case copies `tokens/` to a temp directory, mutates one thing, and runs
 * the real verifier against the copy via its optional root argument. The repo's
 * own files are never touched.
 *
 * Zero dependencies, matching the rest of this repo.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERIFIER = join(repo, 'tools/verify-contrast.mjs');
const FILES = ['base.css', 'categorical.css', 'status.css', 'index.css', 'fonts.css'];

/**
 * Copy the token files somewhere disposable, apply `mutate`, run the verifier
 * against the copy. Returns the exit status and output.
 */
function runWith(mutate = () => {}) {
  const dir = mkdtempSync(join(tmpdir(), 'kwp-verify-'));
  try {
    mkdirSync(join(dir, 'tokens'));
    for (const f of FILES) copyFileSync(join(repo, 'tokens', f), join(dir, 'tokens', f));

    mutate({
      edit(file, fn) {
        const p = join(dir, 'tokens', file);
        writeFileSync(p, fn(readFileSync(p, 'utf8')));
      },
    });

    const r = spawnSync(process.execPath, [VERIFIER, dir], { encoding: 'utf8' });
    return { status: r.status, out: `${r.stdout}${r.stderr}` };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/** Drop every declaration whose name matches. */
const drop = (re) => (css) =>
  css.split('\n').filter((line) => !re.test(line)).join('\n');

/*
 * THE CONTROL. Without this, every assertion below could be passing because
 * the harness is broken rather than because the gate works.
 */
test('an unmutated copy passes — the harness itself is sound', () => {
  const { status, out } = runWith();
  assert.equal(status, 0, out);
  assert.match(out, /All gates pass/);
});

test('rejects a categorical slot missing from both themes', () => {
  const { status, out } = runWith(({ edit }) => edit('categorical.css', drop(/--data-8-/)));
  assert.equal(status, 1, out);
  assert.match(out, /--data-8-\* is missing/);
});

/*
 * The worse case, and the one that motivated the light/dark parity check:
 * the scale still looks complete if you only read the light block.
 */
test('rejects a slot present in light but missing from dark', () => {
  const { status, out } = runWith(({ edit }) =>
    edit('categorical.css', (css) => {
      const i = css.indexOf('@media (prefers-color-scheme: dark)');
      return css.slice(0, i) + drop(/--data-8-/)(css.slice(i));
    }),
  );
  assert.equal(status, 1, out);
  assert.match(out, /both registers must carry the same scale/);
});

test('rejects a slot missing one of its three roles', () => {
  const { status, out } = runWith(({ edit }) => edit('categorical.css', drop(/--data-8-fg/)));
  assert.equal(status, 1, out);
  assert.match(out, /--data-8-fg is missing/);
});

/*
 * Previously a stack trace: the value gates read `undefined` and threw. A
 * crash does exit non-zero, but it reports a TypeError instead of naming the
 * violated gate, which is not what a release check should hand you.
 */
test('reports a verdict, not a crash, when the scale is empty', () => {
  const { status, out } = runWith(({ edit }) => edit('categorical.css', drop(/--data-\d-/)));
  assert.equal(status, 1, out);
  assert.doesNotMatch(out, /TypeError|Cannot read properties/, 'should fail cleanly');
  assert.match(out, /completeness violation/);
});

test('rejects a missing status role', () => {
  const { status, out } = runWith(({ edit }) => edit('status.css', drop(/--danger-border/)));
  assert.equal(status, 1, out);
  assert.match(out, /--danger-border is missing/);
});

test('rejects a missing base semantic token', () => {
  const { status, out } = runWith(({ edit }) => edit('base.css', drop(/^\s*--surface-card:/)));
  assert.equal(status, 1, out);
  assert.match(out, /--surface-card is missing/);
});

test('rejects a ninth slot added without updating the declared count', () => {
  const { status, out } = runWith(({ edit }) =>
    edit('categorical.css', (css) =>
      css.replace(
        /(--data-8-border: oklch\([^)]*\);)/,
        '$1\n  --data-9-surface: oklch(90% 0.046 20);\n  --data-9-fg: oklch(38% 0.062 20);\n  --data-9-border: oklch(80% 0.075 20);',
      ),
    ),
  );
  assert.equal(status, 1, out);
  assert.match(out, /unexpected slot/);
});

/*
 * Not a completeness case — this proves a VALUE gate still bites, so the new
 * early-exit above cannot mask the checks it runs before.
 */
test('still rejects a chroma over the ceiling', () => {
  const { status, out } = runWith(({ edit }) =>
    edit('categorical.css', (css) => css.replace('--data-1-surface: oklch(90% 0.046', '--data-1-surface: oklch(90% 0.2')),
  );
  assert.equal(status, 1, out);
  assert.match(out, /chroma|gamut/);
});
