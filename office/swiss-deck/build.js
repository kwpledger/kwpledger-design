// Swiss deck — PowerPoint layouts on one Slide Master, plus a sample deck.
// Spec: docs/swiss-deck-design-system.md. Run `npm run build` in this folder.
//
// Layer-3 consumer. Every colour is read from tokens/base.css at build time, and the
// theme's twelve colour slots are office/theme-colors/kwp-design.xml, copied in by
// post.py. This file holds geometry and copy, never a colour value of its own.
//
// Geometry is in 1080p pixels (144 px = 1 in on PowerPoint's 13.333 x 7.5 in slide):
// 96 px side margins, 12 columns of 122 px, 24 px gutters, 1728 px live width.
//
// Usage: node build.js sample|template   (post.py finishes the file; see package.json)
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");

const MODE = process.argv[2] || "sample";
const RAW = MODE === "template" ? "template-raw.pptx" : "sample-raw.pptx";
const DECK_NAME = MODE === "template" ? "Deck title" : "Swiss Specimen";
const SESSION = MODE === "template" ? "Session or subtitle" : "A slide system in one typeface";

// ---- palette, straight from the tokens ----
const css = fs.readFileSync(path.join(__dirname, "../../tokens/base.css"), "utf8");
const P = {};
for (const [, name, hex] of css.matchAll(/--([a-z]+-\d+):\s*#([0-9a-fA-F]{6})/g)) P[name] = hex.toUpperCase();
for (const t of ["paper-0", "paper-50", "sand-200", "ink-900", "ink-500", "teal-800", "teal-700", "teal-300", "teal-200", "navy-900", "navy-800", "navy-200"])
  if (!P[t]) throw new Error(`token --${t} not found in tokens/base.css`);

const p = (px) => px / 144;
const HANKEN = "Hanken Grotesk";
const MONO = "IBM Plex Mono";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: HANKEN, bodyFontFace: HANKEN }; // one typeface, by design
pres.title = DECK_NAME;
const C = pres.SchemeColor; // slots per office/theme-colors/kwp-design.xml

// Registers. Light and dark use theme slots where a slot holds the token; dark layouts
// flip tx1 to lt1 (post.py), so C.text1 is ink-900 on light and paper-0 on dark.
const L = { bg: P["paper-50"], fg: C.text1, mu: P["ink-500"], hi: C.accent1, img: "bg2" };
const D = { bg: P["navy-900"], fg: C.text1, mu: P["navy-200"], hi: P["teal-300"], img: P["navy-800"] };
const A = { bg: P["teal-700"], fg: P["paper-0"], mu: P["teal-200"] };

// ---- type styles (pt = px / 2) ----
const T = {
  display: { fontSize: 120, bold: true, charSpacing: -5, lineSpacingMultiple: 0.9 },
  hero:    { fontSize: 200, bold: true, charSpacing: -8, lineSpacingMultiple: 0.8 },
  title:   { fontSize: 48,  bold: true, charSpacing: -1.5, lineSpacingMultiple: 0.95 },
  sub:     { fontSize: 24,  bold: true, charSpacing: -0.25, lineSpacingMultiple: 1.1 },
  text:    { fontSize: 16,  bold: false, lineSpacingMultiple: 1.3 },
  label:   { fontSize: 12,  bold: false, fontFace: MONO, charSpacing: 0.5, lineSpacingMultiple: 1.2 },
};

let PENDING = []; // placeholder metadata for post.py, in document order
function ph(name, type, x, y, w, h, style, color, prompt, extra = {}) {
  PENDING.push({ name, type, anchor: extra.valign === "bottom" ? "b" : "t", diagram: name === "Diagram", mono: style.fontFace === MONO });
  return {
    placeholder: {
      options: { name, type, x: p(x), y: p(y), w: p(w), h: p(h), margin: [0, 0, 0, 0], valign: extra.valign || "top", align: "left", color, ...style, ...extra },
      text: prompt,
    },
  };
}
const label = (name, x, y, w, color, prompt) => ph(name, "body", x, y, w, 30, T.label, color, prompt);

// The band, drawn on a layout itself — only for 17 Close, which hides the master band
// because its teal background needs lighter text than either register.
function ownBand(fg) {
  return [
    { text: { text: DECK_NAME, options: { x: p(96), y: p(72), w: p(560), h: p(34), margin: 0, valign: "bottom", fontFace: HANKEN, fontSize: 12, bold: true, color: fg } } },
    { text: { text: SESSION.toUpperCase(), options: { x: p(656), y: p(72), w: p(608), h: p(34), margin: 0, valign: "bottom", fontFace: MONO, fontSize: 12, charSpacing: 0.5, color: fg } } },
    { line: { x: p(96), y: p(121), w: p(1728), h: 0, line: { color: fg, width: 1 } } },
  ];
}

const LAYOUTS = [];
function layout(title, register, objects, opts = {}) {
  const img = { light: L.img, dark: D.img, accent: null }[register]; // picture-placeholder tint
  LAYOUTS.push({ title, register, img, hideMasterBand: !!opts.hideMasterBand, bandColor: opts.bandColor || null, phs: PENDING });
  PENDING = [];
  pres.defineSlideMaster({ title, background: { color: { light: L, dark: D, accent: A }[register].bg }, objects });
}

layout("01 Cover", "dark", [
  label("Eyebrow", 96, 290, 876, D.mu, "Eyebrow label"),
  ph("Title", "title", 96, 352, 1728, 500, T.display, D.fg, "Headline,\ntwo lines", { valign: "bottom" }),
  ph("Subtitle", "body", 96, 900, 1192, 84, T.text, D.mu, "One line of supporting text"),
]);
layout("02 Section divider", "light", [
  ph("Section number", "body", 96, 514, 1192, 230, T.display, L.hi, "02", { valign: "bottom" }),
  ph("Title", "title", 96, 768, 1728, 100, T.title, L.fg, "Section title", { valign: "bottom" }),
  ph("Description", "body", 96, 900, 1192, 84, T.text, L.mu, "One line on what this section covers"),
]);
layout("03 Statement", "light", [
  ph("Title", "title", 96, 230, 1508, 600, T.title, L.fg, "One idea, one sentence, set ten columns wide", { valign: "bottom" }),
  ph("Supporting line", "body", 96, 878, 1192, 106, T.sub, L.mu, "A supporting line, or delete this"),
]);
layout("04 Numbered list", "dark", [
  ph("Title", "title", 96, 360, 1728, 96, T.title, D.mu, "Muted lead-in", { valign: "bottom" }),
  ph("Items", "body", 96, 480, 1728, 504, { ...T.title, paraSpaceAfter: 4 }, D.fg, "01 First item\n02 Second item\n03 Third item"),
]);
{
  const objs = [ph("Title", "title", 96, 171, 1728, 190, T.title, L.fg, "Heading over\ntwo lines")];
  for (let i = 0; i < 4; i++) {
    const x = 96 + i * 444;
    objs.push(label(`Step ${i + 1} number`, x, 640, 396, L.mu, `0${i + 1}`));
    objs.push({ line: { x: p(x), y: p(682), w: p(396), h: 0, line: { color: C.text1, width: 1 } } });
    objs.push(ph(`Step ${i + 1} heading`, "body", x, 706, 396, 56, T.sub, L.fg, "Step"));
    objs.push(ph(`Step ${i + 1} text`, "body", x, 774, 396, 210, T.text, L.mu, "Two lines at most."));
  }
  layout("05 Process columns", "light", objs);
}
{
  const objs = [ph("Title", "title", 96, 171, 1728, 100, T.title, L.fg, "Title")];
  [96, 680, 1264].forEach((x, i) => {
    objs.push(ph(`Image ${i + 1}`, "pic", x, 456, 560, 420, T.label, L.mu, "Image"));
    objs.push(ph(`Caption ${i + 1}`, "body", x, 900, 560, 84, T.text, L.fg, "Caption, two lines at most"));
  });
  layout("06 Three-up images", "light", objs);
}
// Full-bleed: no band. Slide content always draws above layout content, so a band on
// the layout would sit under the photo anyway. The photo owns the frame.
layout("07 Full-bleed image", "dark", [
  ph("Image", "pic", 0, 0, 1920, 1080, T.label, D.mu, "Full-bleed image"),
  ph("Caption label", "body", 96, 832, 876, 30, T.label, D.mu, "Caption"),
  ph("Caption", "body", 96, 878, 876, 106, T.sub, D.fg, "One caption, pinned bottom-left"),
], { hideMasterBand: true });
layout("08 Diagram, whole slide", "light", [
  ph("Diagram", "pic", 96, 171, 1728, 759, T.label, L.mu, "Diagram, chart, SmartArt or picture"),
  label("Figure line", 96, 954, 1728, L.mu, "Figure title / what it shows / source"),
]);
layout("09 Diagram with numbered title", "dark", [
  ph("Number", "body", 96, 171, 268, 100, T.title, D.fg, "03"),
  ph("Title", "title", 388, 171, 1436, 100, T.title, D.fg, "Title starts on column 3"),
  ph("Diagram", "pic", 96, 319, 1728, 611, T.label, D.mu, "Diagram, chart, SmartArt or picture"),
  label("Takeaway", 96, 954, 1728, D.mu, "One line that says what the diagram proves"),
]);
{
  const objs = [ph("Title", "title", 96, 171, 1728, 100, T.title, L.fg, "Title")];
  [[96, 711, "16:9"], [831, 400, "1:1"], [1255, 320, "4:5"], [1599, 225, "9:16"]].forEach(([x, w, r], i) => {
    objs.push(label(`Ratio ${i + 1}`, x, 319, w, L.mu, r));
    objs.push(ph(`Frame ${i + 1}`, "pic", x, 361, w, 400, T.label, L.mu, r));
  });
  objs.push(label("Footer line", 96, 954, 1728, L.mu, "Project / deliverable / ratios"));
  layout("10 Aspect-ratio row", "light", objs);
}
{
  const objs = [];
  [[96, "Before"], [972, "After"]].forEach(([gx, name]) => {
    objs.push(label(`${name} label`, gx, 171, 852, L.mu, `${name} · version`));
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++)
      objs.push(ph(`${name} ${r * 2 + c + 1}`, "pic", gx + c * 430, 213 + r * 344, 422, 336, T.label, L.mu, "Image"));
  });
  objs.push(label("Footer line", 96, 954, 1728, L.mu, "What changed / between which versions"));
  layout("11 Before-after grid", "light", objs);
}
{
  const objs = [ph("Title", "title", 96, 171, 1728, 100, T.title, L.fg, "Title"), ph("Hero", "pic", 96, 319, 594, 640, T.label, L.mu, "Hero image")];
  for (let i = 0; i < 3; i++) objs.push(ph(`Detail ${i + 1}`, "pic", 698, 319 + i * 216, 396, 208, T.label, L.mu, "Detail"));
  [319, 541, 763].forEach((y, i) => {
    objs.push(ph(`Note ${i + 1} heading`, "body", 1264, y, 560, 56, T.sub, L.fg, "Note"));
    objs.push(ph(`Note ${i + 1} text`, "body", 1264, y + 68, 560, 120, T.text, L.mu, "A heading and two lines per point."));
  });
  layout("12 Mosaic with notes", "light", objs);
}
layout("13 Big number", "dark", [
  ph("Number", "body", 96, 584, 852, 400, T.hero, D.hi, "1", { valign: "bottom" }),
  ph("Label", "body", 972, 786, 852, 56, T.sub, D.fg, "finishes the number’s sentence."),
  ph("Detail", "body", 972, 858, 852, 126, T.text, D.mu, "Real figures only. Say whether measured, observed or estimated."),
]);
layout("14 Quote", "light", [
  ph("Quote", "body", 96, 300, 1508, 606, T.title, L.fg, "“The quote, at title size, ten columns wide.”", { valign: "bottom" }),
  label("Attribution", 96, 954, 1728, L.mu, "Name, context"),
]);
layout("15 Split", "light", [
  ph("Title", "title", 96, 171, 706, 300, T.title, L.fg, "Title in columns 1–5"),
  ph("Text", "body", 96, 684, 706, 300, T.text, L.mu, "Paragraph anchored to the bottom of the text column.", { valign: "bottom" }),
  ph("Image", "pic", 972, 171, 852, 813, T.label, L.mu, "Image, columns 7–12"),
]);
layout("16 Table", "light", [
  ph("Title", "title", 96, 171, 1728, 100, T.title, L.fg, "Title"),
  ph("Table", "tbl", 96, 319, 1728, 640, T.text, L.fg, "Table: rules only, numbers right-aligned"),
]);
layout("17 Close", "accent", [
  ...ownBand(A.fg),
  ph("Eyebrow", "body", 96, 290, 876, 30, T.label, A.mu, "Next"),
  ph("Title", "title", 96, 352, 1728, 500, T.display, A.fg, "One call\nto action", { valign: "bottom" }),
  ph("Text", "body", 96, 900, 1192, 84, T.text, A.mu, "One line, or a URL"),
], { hideMasterBand: true, bandColor: A.fg });
layout("18 Title only", "light", [ph("Title", "title", 96, 171, 1728, 100, T.title, L.fg, "Title")]);

// ---------------- sample slides ----------------
async function tone(hex) {
  const buf = await sharp({ create: { width: 64, height: 64, channels: 3, background: "#" + hex } }).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function samples() {
  const sand = await tone(P["sand-200"]);
  const navy = await tone(P["navy-800"]);
  const img = (s, name, w, h, data = sand) => s.addImage({ placeholder: name, data, w: p(w), h: p(h), altText: "" });
  let s;

  pres.addSection({ title: "System" });
  s = pres.addSlide({ masterName: "01 Cover", sectionTitle: "System" });
  s.addText("A slide system in one typeface", { placeholder: "Eyebrow" });
  s.addText("Swiss\nSpecimen", { placeholder: "Title" });
  s.addText("Eighteen layouts, set in Hanken Grotesk on a 12-column grid.", { placeholder: "Subtitle" });
  s.addNotes("Cover. Headline anchored low-left at 120pt, tracked −5pt, line spacing 0.9. The rest of the slide stays empty on purpose.");

  s = pres.addSlide({ masterName: "16 Table", sectionTitle: "System" });
  s.addText("Five sizes, two weights", { placeholder: "Title" });
  const hdr = ["Role", "pt", "Weight", "Tracking", "Leading"].map((t, i) => ({ text: t, options: { bold: true, align: i ? "right" : "left" } }));
  const rows = [
    ["Display", "120", "Bold", "−5 pt", "0.90"], ["Title", "48", "Bold", "−1.5 pt", "0.95"], ["Subhead", "24", "Bold", "−0.25 pt", "1.10"],
    ["Body", "16", "Regular", "0", "1.30"], ["Label (Plex Mono)", "12", "Regular", "+0.5 pt", "1.20"],
  ].map((r) => r.map((t, i) => ({ text: t, options: { align: i ? "right" : "left" } })));
  const rule = { type: "solid", pt: 0.75, color: P["ink-900"] };
  s.addTable([hdr, ...rows], {
    placeholder: "Table", x: p(96), y: p(319), w: p(1728), colW: [4, 2, 2, 2, 2].map((n) => (p(1728) * n) / 12),
    fontFace: HANKEN, fontSize: 16, color: C.text1, margin: [0.08, 0, 0.08, 0],
    border: [{ ...rule }, { type: "none" }, { ...rule }, { type: "none" }], fill: { color: P["paper-50"] },
  });
  s.addNotes("Type spec, and the Table layout. Horizontal rules only, numbers right-aligned. Tracking: Font dialog → Character Spacing → Condensed by the amount shown.");

  pres.addSection({ title: "Layouts" });
  const sec = { sectionTitle: "Layouts" };
  s = pres.addSlide({ masterName: "02 Section divider", ...sec });
  s.addText("02", { placeholder: "Section number" });
  s.addText("The layouts", { placeholder: "Title" });
  s.addText("One example of each slide type.", { placeholder: "Description" });
  s.addNotes("Section divider. The number is the largest thing on the slide and carries the accent colour.");

  s = pres.addSlide({ masterName: "03 Statement", ...sec });
  s.addText("Most systems don’t fit the people who have to use them. I find out why, build a better way through, and then explain it.", { placeholder: "Title" });
  s.addText("I build the thing that was missing. Usually because I needed it first.", { placeholder: "Supporting line" });
  s.addNotes("Statement. One idea at title size, ten columns wide, bottom-anchored. The empty top third is what makes it a statement.");

  s = pres.addSlide({ masterName: "04 Numbered list", ...sec });
  s.addText("Three rules this deck runs on", { placeholder: "Title" });
  s.addText([
    { text: "01 One typeface, two weights", options: { breakLine: true } },
    { text: "02 Flush left, never centred", options: { breakLine: true } },
    { text: "03 Empty space is structure" },
  ], { placeholder: "Items" });
  s.addNotes("Numbered list. Muted lead-in so the items come forward. Three to five items; more becomes a table.");

  s = pres.addSlide({ masterName: "05 Process columns", ...sec });
  s.addText("Four decisions\nper slide", { placeholder: "Title" });
  [["Grid", "Every edge lands on a column line."], ["Scale", "Five sizes, with big jumps between them."], ["Weight", "Bold for display, regular for text."], ["Space", "Leave about half the slide empty."]]
    .forEach(([h, t], i) => {
      s.addText(`0${i + 1}`, { placeholder: `Step ${i + 1} number` });
      s.addText(h, { placeholder: `Step ${i + 1} heading` });
      s.addText(t, { placeholder: `Step ${i + 1} text` });
    });
  s.addNotes("Process columns. Four equal columns, number above a 1pt rule. Two lines of text per column at most.");

  s = pres.addSlide({ masterName: "06 Three-up images", ...sec });
  s.addText("Three-up grid", { placeholder: "Title" });
  ["Caption sits under the image, flush with its left edge.", "Same crop ratio for all three, or the row falls apart.", "Two lines of caption at most."]
    .forEach((c, i) => { img(s, `Image ${i + 1}`, 560, 420); s.addText(c, { placeholder: `Caption ${i + 1}` }); });
  s.addNotes("Three-up images. Picture placeholders crop whatever you drop in to the frame, so all three stay the same shape.");

  s = pres.addSlide({ masterName: "07 Full-bleed image", ...sec });
  img(s, "Image", 1920, 1080, navy);
  s.addText("Caption", { placeholder: "Caption label" });
  s.addText("One image, one caption, pinned to the grid’s bottom-left corner.", { placeholder: "Caption" });
  s.addNotes("Full-bleed image. The photo owns the frame, so this layout has no band. Darken the image enough that the caption keeps 4.5:1 contrast.");

  s = pres.addSlide({ masterName: "08 Diagram, whole slide", ...sec });
  img(s, "Diagram", 1728, 759);
  s.addText("Figure title / what it shows / source", { placeholder: "Figure line" });
  s.addNotes("Whole-slide diagram. The placeholder takes a picture, chart, SmartArt or table. Diagram labels at 16pt minimum.");

  s = pres.addSlide({ masterName: "09 Diagram with numbered title", ...sec });
  s.addText("03", { placeholder: "Number" });
  s.addText("How the pieces connect", { placeholder: "Title" });
  img(s, "Diagram", 1728, 611, navy);
  s.addText("One line that says what the diagram proves", { placeholder: "Takeaway" });
  s.addNotes("Diagram with numbered title. The title always starts on column 3, so numbered titles line up across the deck.");

  s = pres.addSlide({ masterName: "10 Aspect-ratio row", ...sec });
  s.addText("One frame, four formats", { placeholder: "Title" });
  [["16:9", 711], ["1:1", 400], ["4:5", 320], ["9:16", 225]].forEach(([r, w], i) => { s.addText(r, { placeholder: `Ratio ${i + 1}` }); img(s, `Frame ${i + 1}`, w, 400); });
  s.addText("Project / deliverable / four ratios", { placeholder: "Footer line" });
  s.addNotes("Aspect-ratio row. All four frames are the same height, so the widths show the difference. 16:9 YouTube, 1:1 square, 4:5 feed, 9:16 Shorts.");

  s = pres.addSlide({ masterName: "11 Before-after grid", ...sec });
  s.addText("Before · draft", { placeholder: "Before label" });
  s.addText("After · final", { placeholder: "After label" });
  ["Before", "After"].forEach((g) => { for (let i = 1; i <= 4; i++) img(s, `${g} ${i}`, 422, 336); });
  s.addText("What changed / between which versions", { placeholder: "Footer line" });
  s.addNotes("Before / after grid. Tight gaps inside each group, a full gutter between groups. Matching positions should be matching shots.");

  s = pres.addSlide({ masterName: "12 Mosaic with notes", ...sec });
  s.addText("One subject, every angle", { placeholder: "Title" });
  img(s, "Hero", 594, 640);
  for (let i = 1; i <= 3; i++) img(s, `Detail ${i}`, 396, 208);
  [["Hero", "The one image that carries the slide."], ["Details", "Crops that back up what the hero shows."], ["Notes", "A heading and two lines per point."]]
    .forEach(([h, t], i) => { s.addText(h, { placeholder: `Note ${i + 1} heading` }); s.addText(t, { placeholder: `Note ${i + 1} text` }); });
  s.addNotes("Mosaic with notes. Mosaic in columns 1–7, column 8 empty, notes in 9–12. Three notes at most.");

  s = pres.addSlide({ masterName: "13 Big number", ...sec });
  s.addText("1", { placeholder: "Number" });
  s.addText("typeface in this deck.", { placeholder: "Label" });
  s.addText("Hanken Grotesk, bold and regular. IBM Plex Mono appears only in labels.", { placeholder: "Detail" });
  s.addNotes("Big number, at 200pt: the one deliberate exception to the scale. Real figures only.");

  s = pres.addSlide({ masterName: "14 Quote", ...sec });
  s.addText("“It’s deceptively simple-looking. It looks easy to do, but it’s hard to do well.”", { placeholder: "Quote" });
  s.addText("Kevin Pledger, in a webinar chat", { placeholder: "Attribution" });
  s.addNotes("Quote. Title size, ten columns, bottom-anchored. The attribution is a mono label.");

  s = pres.addSlide({ masterName: "15 Split", ...sec });
  s.addText("One face, many voices.", { placeholder: "Title" });
  s.addText("Weight, size and colour do the work a second typeface usually does. Hanken Grotesk already has the range: thin enough for a quiet line, heavy enough for a headline.", { placeholder: "Text" });
  img(s, "Image", 852, 813);
  s.addNotes("Split. Text in columns 1–5, image in 7–12, column 6 empty.");

  s = pres.addSlide({ masterName: "17 Close", ...sec });
  s.addText("Next", { placeholder: "Eyebrow" });
  s.addText("Critique,\nthen master.", { placeholder: "Title" });
  s.addText("What survives review becomes the template.", { placeholder: "Text" });
  s.addNotes("Close, on the single accent slide. This layout carries its own copy of the band in lighter text for the teal background; rename the deck here as well as on the master.");
}

(async () => {
  if (MODE === "sample") await samples();
  await pres.writeFile({ fileName: RAW });
  fs.writeFileSync(RAW.replace(".pptx", ".json"), JSON.stringify({ deck: DECK_NAME, session: SESSION, layouts: LAYOUTS }));
  console.log("wrote", RAW);
})();
