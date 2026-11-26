#!/usr/bin/env node
/**
 * Builds the files of the "kwpledger design" Design System artifact on
 * claude.ai from this repo, at whatever commit is checked out.
 *
 *     node consumers/claude-design-system/build.mjs --out <dir> [--root <repo>]
 *
 * Writes <dir>/project/… (the artifact's paths) and <dir>/sync.json (what was
 * built from where). It reads the repo and writes only under --out.
 *
 * A HANDS-ON CONSUMER, NOT A PIPELINE. This builds the files; it publishes
 * nothing. Only a Claude session can write to the artifact, and it takes a
 * release when Kevin asks, the same way every other consumer does. See
 * README.md beside this file for the procedure.
 *
 * Derived, not authored: tokens.json, tokens.css and components/bundle.css are
 * read out of tokens/*.css; the previews are design-system/ cards with their
 * paths re-pointed; fonts, logos, examples, docs and the Office theme and
 * template files are copied byte for byte.
 * The prose (brand book, component guidelines, cover) is hand-written and
 * lives in source/, copied as is.
 *
 * Fails loudly when the token CSS declares something it has no place for, so
 * a new token cannot silently miss the artifact. Zero dependencies.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { crc32 } from 'node:zlib';

const here = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
if (!args.out) { console.error('usage: build.mjs --out <dir> [--root <repo>]'); process.exit(2); }
const ROOT = args.root ?? join(here, '..', '..');
const SRC = join(here, 'source');
const OUT = args.out, P = join(OUT, 'project');

// ---- what is taken, by name: anything new in the repo is reported, not guessed at
const CARDS = {
  SignatureMarks: ['design-system/brand/logo-marks.html', 'Brand', 1500],
  SystemRules: ['design-system/brand/system-rules.html', 'Brand', 1700],
  TypeScale: ['design-system/foundations/type-scale.html', 'Type', 1300],
  Infographic: ['design-system/formats/infographic.html', 'Formats', 1500],
  QuotePost: ['design-system/formats/quote-post.html', 'Formats', 1300],
  LinkedInBanner: ['design-system/formats/linkedin-banner.html', 'Formats', 1500],
};
// Specimen pages the artifact's own Colors and Spacing views replace.
const SPECIMENS = ['design-system/foundations/color-categorical.html', 'design-system/foundations/color-semantic.html',
  'design-system/foundations/color-status.html', 'design-system/foundations/spacing-scale.html'];
const DOCS = ['SPEC', 'PALETTE', 'logo-usage', 'header-footer-design-system', 'infographic-design-system', 'infographic-footer-tags',
  'quote-post-design-system', 'linkedin-banner-design-system', 'social-card-design-system', 'about-screen-design-system',
  'swiss-deck-design-system', 'office-theme', 'handwriting-font', 'theme-toggle-capability', 'CONSUMERS', 'CHANGELOG'];
const DOCS_LEFT_OUT = ['BACKLOG', 'BACKLOG-FORMAT', 'CHANGELOG-TEMPLATE', 'HANDOFF-FILE', 'OWNERSHIP', 'README',
  'illustration-brief-desire-path', 'infographic-prompt-decision'];

// A one-file zip, method 0 (stored): the entry's bytes are the file's bytes.
function zipOne(name, data) {
  const n = Buffer.from(name, 'utf8'), crc = crc32(data), D = 0x5b79, T = 0; // 2025-11-25 00:00, fixed so builds repeat
  const local = Buffer.alloc(30); local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
  local.writeUInt16LE(0, 8); local.writeUInt16LE(T, 10); local.writeUInt16LE(D, 12); local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(n.length, 26);
  const cen = Buffer.alloc(46); cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0x0800, 8);
  cen.writeUInt16LE(0, 10); cen.writeUInt16LE(T, 12); cen.writeUInt16LE(D, 14); cen.writeUInt32LE(crc, 16);
  cen.writeUInt32LE(data.length, 20); cen.writeUInt32LE(data.length, 24); cen.writeUInt16LE(n.length, 28);
  const cdOff = 30 + n.length + data.length, cdLen = 46 + n.length;
  const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(1, 8); end.writeUInt16LE(1, 10);
  end.writeUInt32LE(cdLen, 12); end.writeUInt32LE(cdOff, 16);
  return Buffer.concat([local, n, data, cen, n, end]);
}

const notes = [];
const fail = (m) => { console.error('build.mjs: ' + m); process.exit(1); };
const rd = (p) => readFileSync(join(ROOT, p), 'utf8').replace(/\r\n/g, '\n');
const wr = (rel, s) => { const f = join(P, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const cp = (abs, rel) => { const f = join(P, rel); mkdirSync(dirname(f), { recursive: true }); copyFileSync(abs, f); };
const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const norm = (v) => v.trim().split(/\s+/).join(' ');
const strip = (c) => c.replace(/\/\*[\s\S]*?\*\//g, '');

function block(css, selector) {
  const i = css.indexOf(selector);
  if (i < 0) fail(`no "${selector}" block`);
  const j = css.indexOf('{', i), k = css.indexOf('}', j);
  return Object.fromEntries([...css.slice(j + 1, k).matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]));
}

const usage = JSON.parse(readFileSync(join(SRC, 'usage.json'), 'utf8'));
const base = strip(rd('tokens/base.css')), cat = strip(rd('tokens/categorical.css')), stat = strip(rd('tokens/status.css'));
const b0 = block(base, ':root {'), bd = block(base, ':root[data-theme="dark"]');
const c0 = block(cat, ':root {'), cd = block(cat, ':root[data-theme="dark"]');
const s0 = block(stat, ':root {'), sd = block(stat, ':root[data-theme="dark"]');

// ---- completeness: every token in base.css has a place, or the build stops
const placed = new Set([...Object.keys(usage.palette), ...Object.keys(usage.semantic), ...Object.keys(usage.spacing),
  ...Object.keys(usage.layout), ...Object.keys(usage.fontWeight)]);
const unplaced = Object.keys(b0).filter((n) => !placed.has(n) && !/^step-/.test(n) && !/^font-/.test(n));
if (unplaced.length) fail(`base.css declares ${unplaced.map((n) => '--' + n).join(', ')} with no entry in source/usage.json. Add a usage note (and say which family) before syncing.`);
for (const n of Object.keys(usage.semantic)) if (!(n in bd)) fail(`--${n} has no dark value`);
const missing = [...placed].filter((n) => !(n in b0));
if (missing.length) fail(`source/usage.json names ${missing.map((n) => '--' + n).join(', ')}, which base.css no longer declares. A removed token is a major bump; drop it here once that is settled.`);

// ---- colors
const alias = (v) => { const m = /^var\(--([\w-]+)\)$/.exec(v.trim()); if (!m) fail(`semantic value "${v}" is not a var()`); return `{${m[1]}}`; };
const toks = [];
for (const [n, u] of Object.entries(usage.palette)) toks.push({ name: n, value: b0[n].trim().toLowerCase(), usage: u });
for (const [n, u] of Object.entries(usage.semantic)) toks.push({ name: n, value: { light: alias(b0[n]), dark: alias(bd[n]) }, usage: u });
const slots = [...new Set(Object.keys(c0).map((n) => /^data-(\d+)-/.exec(n)?.[1]).filter(Boolean))].map(Number).sort((a, b) => a - b);
for (const i of slots) for (const [role, u] of [['surface', `Fill of a slot-${i} filled card. No inherent meaning: map a domain token onto it.`],
  ['fg', `Text on \`data-${i}-surface\` only.`], ['border', `Edge of a slot-${i} filled card.`]]) {
  const n = `data-${i}-${role}`;
  if (!(n in c0) || !(n in cd)) fail(`--${n} is missing a theme`);
  toks.push({ name: n, value: { light: norm(c0[n]), dark: norm(cd[n]) }, usage: u });
}
const STATUS = { danger: 'an operation that failed', warning: 'an input that will cause trouble', success: 'something that saved or worked' };
const statuses = [...new Set(Object.keys(s0).map((n) => n.split('-')[0]))];
const unknownStatus = statuses.filter((s) => !(s in STATUS));
if (unknownStatus.length) fail(`status.css declares ${unknownStatus.join(', ')}, which build.mjs has no meaning for`);
for (const s of Object.keys(STATUS)) for (const [role, u] of [['surface', `Fill of a ${s} message: ${STATUS[s]}. Always with text, usually an icon.`],
  ['fg', `Text on \`${s}-surface\` only.`], ['border', `Edge of a ${s} message.`]]) {
  const n = `${s}-${role}`;
  if (!(n in s0) || !(n in sd)) fail(`--${n} is missing a theme`);
  toks.push({ name: n, value: { light: norm(s0[n]), dark: norm(sd[n]) }, usage: u });
}
const extraCat = Object.keys(c0).filter((n) => !toks.some((t) => t.name === n));
if (extraCat.length) fail(`categorical.css declares ${extraCat.join(', ')}, which build.mjs does not map`);

// ---- type
const fonts = [...rd('tokens/fonts.css').matchAll(/@font-face\s*{([\s\S]*?)}/g)].map(([, f]) => {
  const g = (k) => new RegExp(k + ':\\s*([^;]+);').exec(f)?.[1];
  const file = /\/fonts\/([^')]+)/.exec(f)?.[1];
  if (!file || !existsSync(join(ROOT, 'fonts', file))) fail(`fonts.css names a file not in fonts/: ${file}`);
  const e = { family: g('font-family').trim().replace(/^['"]|['"]$/g, ''), file: 'fonts/' + file, weight: g('font-weight').trim(), style: g('font-style').trim() };
  if (g('unicode-range')) e.unicodeRange = norm(g('unicode-range'));
  return e;
});
const steps = Object.fromEntries(Object.entries(b0).filter(([k]) => k.startsWith('step-')).map(([k, v]) => [k, norm(v)]));
const LH = { 'step-4': 1.1, 'step-3': 1.15, 'step-2': 1.2, 'step-1': 1.3, 'step-0': 1.5, 'step--1': 1.5 }; // the type-scale card's
const SAMPLE = { 'step-4': "The page's one big thing", 'step-3': 'Section heading', 'step-2': 'Subsection',
  'step-1': 'Lead paragraph, standfirst', 'step-0': 'Body text, the default', 'step--1': 'Captions, metadata, fine print' };
for (const k of Object.keys(steps)) if (!(k in LH)) fail(`--${k} is new: give it a line height and sample in build.mjs`);
const st = (k, w) => {
  const lo = /^clamp\(([\d.]+rem)/.exec(steps[k])?.[1] ?? fail(`--${k} is not a clamp() in rem`);
  return { name: k, fontSize: lo, lineHeight: LH[k], fontWeight: w, sample: SAMPLE[k],
    usage: `Fluid: \`--${k}\` is ${steps[k]}; the size shown is its floor. Set the size with \`var(--${k})\`.` };
};
const families = Object.fromEntries(Object.keys(b0).filter((k) => k.startsWith('font-')).map((k) => [k.slice(5), norm(b0[k])]));

let sha = 'unknown', date = new Date().toISOString().slice(0, 10);
try { sha = execFileSync('git', ['-C', ROOT, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  date = execFileSync('git', ['-C', ROOT, 'log', '-1', '--format=%cs'], { encoding: 'utf8' }).trim(); } catch { notes.push('not a git checkout: sha unknown'); }
const version = 'v' + JSON.parse(rd('package.json')).version;

const tokens = {
  name: 'kwpledger design', version: 1,
  color: { note: 'Light and dark are authored together, never derived. Components use the semantic layer only.',
    themes: [{ id: 'light', name: 'Light' }, { id: 'dark', name: 'Dark' }], tokens: toks },
  type: { fonts, families, groups: [
    { name: 'Display', family: 'display', note: 'Lora, variable 400–700; headings default to `--fw-display` (600).', styles: ['step-4', 'step-3', 'step-2'].map((k) => st(k, 600)) },
    { name: 'Text', family: 'body', note: 'Hanken Grotesk, variable 100–900.', styles: ['step-1', 'step-0', 'step--1'].map((k) => st(k, 400)) }] },
  spacing: { note: "Seven steps from a 4px base, in rem so they follow the reader's font size. Pick a step; never type a pixel value.",
    tokens: Object.entries(usage.spacing).map(([n, u]) => ({ name: n, value: b0[n].trim(), usage: u })) },
  layout: { note: 'Two width limits; the second is exactly twice the first.',
    tokens: Object.entries(usage.layout).map(([n, u]) => ({ name: n, value: b0[n].trim(), usage: u })) },
  fontWeight: { tokens: Object.entries(usage.fontWeight).map(([n, u]) => ({ name: n, value: b0[n].trim(), usage: u })) },
  meta: { source: 'github', repo: 'kwpledger/kwpledger-design', ref: `${version}@${sha}`,
    paths: { tokens: ['tokens/base.css', 'tokens/categorical.css', 'tokens/status.css'], fonts: ['tokens/fonts.css', 'fonts/'],
      assets: ['logos/', 'examples/'], docs: ['docs/', 'design-system/'] }, synced: date },
};

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(P, { recursive: true });
wr('tokens.json', JSON.stringify(tokens, null, 2) + '\n');

// ---- tokens.css, laid out as the Design System page compiles it
const cv = (v) => v.replace(/^\{(.+)\}$/, 'var(--$1)');
const L = ['/* kwpledger design — generated from tokens.json */'];
for (const f of fonts) L.push(`@font-face { font-family: '${f.family}'; src: url('${f.file}') format('woff2'); font-weight: ${f.weight}; font-style: ${f.style}; font-display: swap;${f.unicodeRange ? ` unicode-range: ${f.unicodeRange};` : ''} }`);
L.push(':root, [data-theme="light"] {', ...toks.map((t) => `  --${t.name}: ${cv(typeof t.value === 'string' ? t.value : t.value.light)};`), '}');
L.push('[data-theme="dark"] {', ...toks.filter((t) => typeof t.value !== 'string').map((t) => `  --${t.name}: ${cv(t.value.dark)};`), '}');
L.push(':root {', ...['spacing', 'layout', 'fontWeight'].flatMap((f) => tokens[f].tokens.map((t) => `  --${t.name}: ${t.value};`)),
  ...Object.entries(families).map(([k, v]) => `  --font-${k}: ${v};`), '}');
for (const g of tokens.type.groups) for (const s of g.styles)
  L.push(`.${s.name.replace(/\./g, '\\.')} { font-family: var(--font-${g.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight}; }`);
wr('tokens.css', L.join('\n') + '\n');

// ---- bundle.css: what tokens.json cannot hold, plus the card chrome
const card = rd('design-system/_lib/card.css');
const chrome = card.slice(card.indexOf('*, *::before'));
wr('components/bundle.css', ['/* kwpledger design — preview chrome and the values tokens.json cannot hold.',
  ` * From kwpledger/kwpledger-design ${version}: the fluid --step-* scale (tokens/base.css)`,
  ' * and the specimen-card chrome (design-system/_lib/card.css, imports and @font-face',
  ' * removed: tokens.css carries both). Every colour, space and face comes from tokens.css. */',
  ':root {', '  color-scheme: light dark;', ...Object.entries(steps).map(([k, v]) => `  --${k}: ${v};`), '}',
  '[data-theme="light"] { color-scheme: light; }', '[data-theme="dark"] { color-scheme: dark; }', '', chrome.trim(), ''].join('\n'));

// ---- previews, remade from the cards
for (const [comp, [src, group, h]] of Object.entries(CARDS)) {
  const s = rd(src); const nl = s.indexOf('\n'); const first = s.slice(0, nl); let rest = s.slice(nl + 1);
  const sub = /subtitle="([^"]*)"/.exec(first)?.[1] ?? '';
  const title = /<title>(.*?)<\/title>/.exec(rest)?.[1] ?? comp;
  rest = rest.replace(/<meta charset="utf-8">\n|<title>.*?<\/title>\n|<link rel="stylesheet" href="\.\.\/_lib\/card\.css">\n/g, '')
    .replaceAll('../../logos/', '../../assets/Logos/').replaceAll('../../examples/', '../../assets/Examples/');
  let style = ''; const m = /^\s*(<style>[\s\S]*?<\/style>)\n/.exec(rest);
  if (m) { style = m[1] + '\n'; rest = rest.slice(m[0].length); }
  wr(`components/${comp}/preview.html`, `<!-- @dsCard group="${group}" height=${h} subtitle="${sub}" -->\n<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>${title}</title>\n${style}</head>\n<body>\n${rest.trim()}\n</body>\n</html>\n`);
}
const cards = walk(join(ROOT, 'design-system')).map((f) => relative(ROOT, f)).filter((f) => f.endsWith('.html'));
const taken = new Set([...Object.values(CARDS).map((c) => c[0]), ...SPECIMENS]);
for (const c of cards) if (!taken.has(c)) notes.push(`new card not mapped: ${c} (add it to CARDS or SPECIMENS)`);

// ---- files, byte for byte
for (const f of readdirSync(join(ROOT, 'fonts')).sort()) cp(join(ROOT, 'fonts', f), 'fonts/' + f);
for (const f of readdirSync(join(ROOT, 'logos')).sort()) {
  if (f === 'PROVENANCE.md') cp(join(ROOT, 'logos', f), 'assets/Logos/PROVENANCE.md');
  else cp(join(ROOT, 'logos', f), (f.startsWith('wordmark_') ? 'assets/Wordmarks/' : 'assets/Logos/') + f);
}
for (const a of walk(join(ROOT, 'examples'))) if (/\.(jpg|png|pdf)$/i.test(a)) cp(a, 'assets/Examples/' + relative(join(ROOT, 'examples'), a));
// Office: the shipped outputs only. office/swiss-deck/ is also an npm package
// (package.json, lockfile, build.js, post.py); its toolchain never goes in.
const OFFICE = [/^theme-colors\/[^/]+\.xml$/, /^theme-fonts\/[^/]+\.xml$/, /^swiss-deck\/[^/]+\.potx$/];
if (existsSync(join(ROOT, 'office'))) for (const a of walk(join(ROOT, 'office'))) {
  const rel = relative(join(ROOT, 'office'), a).split('\\').join('/');
  if (rel.split('/').includes('node_modules')) continue;
  if (!OFFICE.some((r) => r.test(rel))) continue;
  // The artifact can neither serve nor store a .potx, so a template goes in as a
  // zip holding the file byte for byte (stored, not compressed). Upload it as an
  // asset: see README.md, "Taking a release".
  if (rel.endsWith('.potx')) wr('assets/Office/' + rel + '.zip', zipOne(rel.split('/').pop(), readFileSync(a)));
  else cp(a, 'assets/Office/' + rel);
}
for (const d of DOCS) cp(join(ROOT, 'docs', d + '.md'), `docs/${d}.md`);
for (const f of readdirSync(join(ROOT, 'docs')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)))
  if (!DOCS.includes(f) && !DOCS_LEFT_OUT.includes(f)) notes.push(`new doc not mapped: docs/${f}.md (add it to DOCS or DOCS_LEFT_OUT)`);
for (const f of ['base', 'categorical', 'status', 'fonts', 'index']) cp(join(ROOT, 'tokens', f + '.css'), `tokens/${f}.css`);

// ---- the hand-written prose
for (const a of walk(SRC)) {
  const rel = relative(SRC, a); if (rel === 'usage.json') continue;
  if (rel === 'README.md') wr(rel, readFileSync(a, 'utf8').replaceAll('{{version}}', version)); else cp(a, rel);
}

const sync = { repo: 'kwpledger/kwpledger-design', version, sha, date,
  sections: ['project/assets/Logos/PROVENANCE.md', ...DOCS.map((d) => `project/docs/${d}.md`)],
  assetGroups: ['Logos', 'Wordmarks', 'Examples', 'Office'], notes };
writeFileSync(join(OUT, 'sync.json'), JSON.stringify(sync, null, 2) + '\n');
console.log(`Built ${version}@${sha}: ${toks.length} colors, ${fonts.length} faces, ${Object.keys(CARDS).length} previews → ${P}`);
for (const n of notes) console.log('note: ' + n);
