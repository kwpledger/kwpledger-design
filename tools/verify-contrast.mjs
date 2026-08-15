#!/usr/bin/env node
/*
 * Verifies the token files against the gates in docs/SPEC.md. Exits non-zero
 * on any failure, so it can gate a release.
 *
 * It PARSES the CSS rather than generating it. The stylesheets are the source
 * of truth; this script is an independent check on them. A generator that
 * emitted both would only ever prove it agreed with itself.
 *
 * Zero dependencies on purpose — this repo has no build, and adding a
 * toolchain to check eight colors would cost more than it returns.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { oklchToSrgb, hexToRgb, rgbToHex, contrast, inGamut, srgbToOklab } from './color.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

/* ---- gates ---- */
const GATES = {
  textOnTint: 4.5, // AA normal text on its own categorical fill
  textOnSurface: 4.5, // the same fg used as a bare label on the page
  tintOnSurface: 1.2, // the fill has to be perceptible at all
  borderOnTint: 1.3, // the edge has to be visible against what it edges
  paritySpread: 0.25, // max-min WCAG contrast across the slots, per theme
  minDeltaOklab: 0.02, // adjacent tints must be tellable apart
  chromaCeiling: 0.091, // --teal-300; the scale may not out-shout the brand
  semanticText: 4.5, // base.css text pairs
};

/*
 * The status layer shares the categorical hue space on purpose (red danger at
 * 27 against --data-1 at 25, green success at 150 against --data-4 at 150) and
 * is separated from it by chroma instead. That separation is the whole reason
 * a status reads as urgent rather than as a category, so it is a gate rather
 * than a note: every status role must be authored at strictly higher chroma
 * than the categorical role of the same name, in the same theme.
 */
const STATUS_NAMES = ['danger', 'warning', 'success'];
const EXCLUDED_HUE_BANDS = [
  [178, 202, 'brand teal / --accent'],
  [238, 262, 'navy surface family'],
];

/* ---- parse base.css: palette hex + semantic aliases, per theme ---- */
function parseBase() {
  const css = read('tokens/base.css');
  const i = css.indexOf('@media (prefers-color-scheme: dark)');
  const [lightSrc, darkSrc] = [css.slice(0, i), css.slice(i)];
  const hexes = Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]])
  );
  const aliases = (src) =>
    Object.fromEntries(
      [...src.matchAll(/--([\w-]+):\s*var\(--([\w-]+)\)\s*;/g)].map((m) => [m[1], m[2]])
    );
  const resolve = (src) => {
    const a = { ...aliases(lightSrc), ...(src === darkSrc ? aliases(darkSrc) : {}) };
    return Object.fromEntries(
      Object.entries(a)
        .map(([k, v]) => [k, hexes[v]])
        .filter(([, v]) => v)
    );
  };
  return { light: resolve(lightSrc), dark: resolve(darkSrc), hexes };
}

/* ---- parse categorical.css: slot -> {surface, fg, border} as [L,C,H] ---- */
function parseCategorical() {
  const css = read('tokens/categorical.css');
  const i = css.indexOf('@media (prefers-color-scheme: dark)');
  const grab = (src) => {
    const out = {};
    for (const m of src.matchAll(
      /--data-(\d+)-(surface|fg|border):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/g
    )) {
      (out[m[1]] ??= {})[m[2]] = [Number(m[3]) / 100, Number(m[4]), Number(m[5])];
    }
    return out;
  };
  return { light: grab(css.slice(0, i)), dark: grab(css.slice(i)) };
}

/* ---- parse status.css: name -> {surface, fg, border} as [L,C,H] ---- */
function parseStatus() {
  const css = read('tokens/status.css');
  const i = css.indexOf('@media (prefers-color-scheme: dark)');
  const grab = (src) => {
    const out = {};
    for (const m of src.matchAll(
      /--(danger|warning|success)-(surface|fg|border):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/g
    )) {
      (out[m[1]] ??= {})[m[2]] = [Number(m[3]) / 100, Number(m[4]), Number(m[5])];
    }
    return out;
  };
  return { light: grab(css.slice(0, i)), dark: grab(css.slice(i)) };
}

/* ---- run ---- */
const base = parseBase();
const cat = parseCategorical();
const status = parseStatus();
const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (v, gate) => (v >= gate ? '' : ' ✗');

console.log('kwp design — token verification\n');

/* base semantic pairs */
for (const theme of ['light', 'dark']) {
  const s = base[theme];
  console.log(`base.css — ${theme}`);
  for (const [fgTok, bgTok] of [
    ['fg', 'surface'],
    ['fg-muted', 'surface'],
    ['accent', 'surface'],
    ['fg', 'surface-card'],
    ['fg-muted', 'surface-card'],
    ['accent', 'surface-card'],
  ]) {
    const c = contrast(hexToRgb(s[fgTok]), hexToRgb(s[bgTok]));
    console.log(`  --${fgTok} on --${bgTok}`.padEnd(34), c.toFixed(2).padStart(6), ok(c, GATES.semanticText));
    if (c < GATES.semanticText)
      fail(`base ${theme}: --${fgTok} on --${bgTok} is ${c.toFixed(2)}:1, gate ${GATES.semanticText}`);
  }
  console.log();
}

/* categorical */
const THEME_BG = { light: 'surface', dark: 'surface' };
for (const theme of ['light', 'dark']) {
  const slots = cat[theme];
  const bgHex = base[theme][THEME_BG[theme]];
  const bg = hexToRgb(bgHex);
  const ids = Object.keys(slots).sort((a, b) => a - b);
  console.log(`categorical.css — ${theme} (on ${bgHex})`);
  console.log('  slot hue  surface   fg        border    t/bg  fg/t  fg/bg b/t   gamut');

  const tintContrasts = [];
  const tintLabs = [];
  let sharedL = null, sharedC = null;

  for (const id of ids) {
    const s = slots[id];
    if (!s.surface || !s.fg || !s.border) fail(`${theme} slot ${id}: incomplete triple`);
    const [t, f, b] = [s.surface, s.fg, s.border].map(([L, C, H]) => oklchToSrgb(L, C, H));
    const hue = s.surface[2];

    // gamut
    const gam = [t, f, b].every(inGamut);
    if (!gam) fail(`${theme} slot ${id}: outside sRGB — clipping breaks lightness parity`);

    // chroma ceiling
    for (const [role, v] of Object.entries(s))
      if (v[1] > GATES.chromaCeiling)
        fail(`${theme} slot ${id} ${role}: chroma ${v[1]} exceeds ceiling ${GATES.chromaCeiling}`);

    // hue exclusion
    for (const [lo, hi, why] of EXCLUDED_HUE_BANDS)
      if (hue >= lo && hi >= hue) fail(`${theme} slot ${id}: hue ${hue} collides with ${why}`);

    // parity inputs — every slot in a theme must share L and C per role
    const sig = [s.surface[0], s.surface[1]].join('/');
    sharedL ??= sig;
    if (sig !== sharedL) fail(`${theme} slot ${id}: surface L/C ${sig} differs from ${sharedL}`);
    const fsig = [s.fg[0], s.fg[1]].join('/');
    sharedC ??= fsig;
    if (fsig !== sharedC) fail(`${theme} slot ${id}: fg L/C ${fsig} differs from ${sharedC}`);

    const tbg = contrast(t, bg), ft = contrast(f, t), fbg = contrast(f, bg), bt = contrast(b, t);
    tintContrasts.push(tbg);
    tintLabs.push(srgbToOklab(t));

    if (ft < GATES.textOnTint) fail(`${theme} slot ${id}: fg on tint ${ft.toFixed(2)}:1 < ${GATES.textOnTint}`);
    if (fbg < GATES.textOnSurface) fail(`${theme} slot ${id}: fg on surface ${fbg.toFixed(2)}:1 < ${GATES.textOnSurface}`);
    if (tbg < GATES.tintOnSurface) fail(`${theme} slot ${id}: tint on surface ${tbg.toFixed(2)}:1 < ${GATES.tintOnSurface}`);
    if (bt < GATES.borderOnTint) fail(`${theme} slot ${id}: border on tint ${bt.toFixed(2)}:1 < ${GATES.borderOnTint}`);

    console.log(
      `  ${id.padStart(4)} ${String(hue).padStart(3)}  ${rgbToHex(t)}   ${rgbToHex(f)}   ${rgbToHex(b)}  ` +
        `${tbg.toFixed(2).padStart(5)}${ok(tbg, GATES.tintOnSurface)}${ft.toFixed(2).padStart(6)}${ok(ft, GATES.textOnTint)}` +
        `${fbg.toFixed(2).padStart(6)}${ok(fbg, GATES.textOnSurface)}${bt.toFixed(2).padStart(6)}${ok(bt, GATES.borderOnTint)}  ${gam ? 'ok' : 'OUT'}`
    );
  }

  const spread = Math.max(...tintContrasts) - Math.min(...tintContrasts);
  if (spread > GATES.paritySpread)
    fail(`${theme}: tint contrast spread ${spread.toFixed(3)} > ${GATES.paritySpread} — slots do not read as peers`);

  let minD = Infinity;
  for (let i = 0; i < tintLabs.length; i++) {
    const a = tintLabs[i], b = tintLabs[(i + 1) % tintLabs.length];
    minD = Math.min(minD, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]));
  }
  if (minD < GATES.minDeltaOklab)
    fail(`${theme}: adjacent tints only ΔOKLab ${minD.toFixed(4)} apart, gate ${GATES.minDeltaOklab}`);

  console.log(
    `  parity: contrast spread ${spread.toFixed(3)} (gate ≤${GATES.paritySpread})` +
      `   adjacent ΔOKLab ${minD.toFixed(4)} (gate ≥${GATES.minDeltaOklab})\n`
  );
}

/* status */
for (const theme of ['light', 'dark']) {
  const s = status[theme];
  const bgHex = base[theme].surface;
  const bg = hexToRgb(bgHex);
  console.log(`status.css — ${theme} (on ${bgHex})`);
  console.log('  name     hue  surface   fg        border    s/bg  fg/s  fg/bg b/s   louder  gamut');

  const tintContrasts = [];
  let sharedReg = null;

  for (const name of STATUS_NAMES) {
    const t = s[name];
    if (!t || !t.surface || !t.fg || !t.border) { fail(`${theme}: --${name}-* incomplete`); continue; }
    const [srf, f, b] = [t.surface, t.fg, t.border].map(([L, C, H]) => oklchToSrgb(L, C, H));
    const hue = t.surface[2];
    const gam = [srf, f, b].every(inGamut);
    if (!gam) fail(`${theme} --${name}: outside sRGB — clipping breaks lightness parity`);

    for (const [role, v] of Object.entries(t))
      if (v[1] > GATES.chromaCeiling)
        fail(`${theme} --${name}-${role}: chroma ${v[1]} exceeds ceiling ${GATES.chromaCeiling}`);

    // THE GATE THAT KEEPS STATUS DISTINGUISHABLE FROM A CATEGORY.
    // Status shares categorical hues deliberately; chroma is what separates
    // them. If a status role ever stops out-chroma-ing its categorical
    // counterpart, an error state starts reading as an ordinary category.
    const catSlot = cat[theme]['1'];
    let louder = true;
    for (const role of ['surface', 'fg', 'border']) {
      if (!(t[role][1] > catSlot[role][1])) {
        louder = false;
        fail(
          `${theme} --${name}-${role}: chroma ${t[role][1]} is not above the categorical ` +
            `${role} chroma ${catSlot[role][1]} — status would not read as louder than a category`
        );
      }
    }

    // One register for all three: same L and C, differing only in hue.
    const reg = ['surface', 'fg', 'border'].map((r) => `${t[r][0]}/${t[r][1]}`).join(' ');
    sharedReg ??= reg;
    if (reg !== sharedReg) fail(`${theme} --${name}: register ${reg} differs from ${sharedReg}`);

    const sbg = contrast(srf, bg), fs = contrast(f, srf), fbg = contrast(f, bg), bs = contrast(b, srf);
    tintContrasts.push(sbg);

    if (fs < GATES.textOnTint) fail(`${theme} --${name}: fg on its surface ${fs.toFixed(2)}:1 < ${GATES.textOnTint}`);
    if (fbg < GATES.textOnSurface) fail(`${theme} --${name}: fg on page ${fbg.toFixed(2)}:1 < ${GATES.textOnSurface}`);
    if (sbg < GATES.tintOnSurface) fail(`${theme} --${name}: surface on page ${sbg.toFixed(2)}:1 < ${GATES.tintOnSurface}`);
    if (bs < GATES.borderOnTint) fail(`${theme} --${name}: border on surface ${bs.toFixed(2)}:1 < ${GATES.borderOnTint}`);

    console.log(
      `  ${name.padEnd(8)} ${String(hue).padStart(3)}  ${rgbToHex(srf)}   ${rgbToHex(f)}   ${rgbToHex(b)}  ` +
        `${sbg.toFixed(2).padStart(5)}${ok(sbg, GATES.tintOnSurface)}${fs.toFixed(2).padStart(6)}${ok(fs, GATES.textOnTint)}` +
        `${fbg.toFixed(2).padStart(6)}${ok(fbg, GATES.textOnSurface)}${bs.toFixed(2).padStart(6)}${ok(bs, GATES.borderOnTint)}` +
        `   ${louder ? 'yes' : ' NO'}    ${gam ? 'ok' : 'OUT'}`
    );
  }

  const spread = Math.max(...tintContrasts) - Math.min(...tintContrasts);
  if (spread > GATES.paritySpread)
    fail(`${theme}: status contrast spread ${spread.toFixed(3)} > ${GATES.paritySpread}`);
  console.log(`  parity: contrast spread ${spread.toFixed(3)} (gate ≤${GATES.paritySpread})\n`);
}

if (failures.length) {
  console.error(`FAILED — ${failures.length} gate violation(s):`);
  for (const f of failures) console.error(`  · ${f}`);
  process.exit(1);
}
console.log('All gates pass.');
