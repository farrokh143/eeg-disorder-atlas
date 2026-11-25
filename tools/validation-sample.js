#!/usr/bin/env node
// Draws the fixed validation sample described in methods/validation-protocol.md and writes blank reviewer sheets.
// The seed and sizes are fixed in the protocol; running this again on the same data gives the same sample.
// Usage: node tools/validation-sample.js            (writes validation/screening-sheet.csv and validation/extraction-sheet.csv)
//        node tools/validation-sample.js --dry      (prints the sample sizes only)
const fs = require("fs"), path = require("path");
const { readLog, loadData, ROOT } = require("./lib");
const SEED = 20261125, SIZES = { included: 50, excludedAbstract: 50, excludedFullText: 50, power: 40, connectivity: 10, abstractOnly: 10 };

let s = SEED; const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// Stratify by first-listed disorder so every disorder is represented roughly in proportion.
function stratified(list, k, key) {
  const groups = {}; for (const x of list) (groups[key(x)] = groups[key(x)] || []).push(x);
  const names = Object.keys(groups).sort(), out = [];
  for (const g of names) groups[g] = shuffle(groups[g]);
  const quota = Object.fromEntries(names.map(g => [g, Math.floor(k * groups[g].length / list.length)]));
  for (const g of names) out.push(...groups[g].slice(0, quota[g]));
  const rest = shuffle(names.flatMap(g => groups[g].slice(quota[g])));
  return out.concat(rest.slice(0, k - out.length));
}
const { rows } = readLog(), { data: D } = loadData();
const first = r => (r.disorder || "").split("; ")[0];
const isFT = r => /Outside atlas schema/.test(r.reason) || /full[- ]text/i.test(r.notes);
const inc = rows.filter(r => r.status === "included");
const exTA = rows.filter(r => r.status === "excluded" && !isFT(r) && !/^Duplicate of/.test(r.reason));
const exFT = rows.filter(r => r.status === "excluded" && isFT(r) && !/^Duplicate of/.test(r.reason));
const scr = [...stratified(inc, SIZES.included, first).map(r => [r, "included"]),
  ...stratified(exTA, SIZES.excludedAbstract, first).map(r => [r, "excluded (title/abstract)"]),
  ...stratified(exFT, SIZES.excludedFullText, first).map(r => [r, "excluded (full text)"])];
const ent = D.findings.concat(D.connectivity || []);
const ext = [...stratified(ent.filter(f => f.type === "biomarker" && f.source === "full-text"), SIZES.power, f => f.condition),
  ...stratified(ent.filter(f => f.type === "connectivity" && f.source === "full-text"), SIZES.connectivity, f => f.condition),
  ...stratified(ent.filter(f => f.type === "biomarker" && f.source === "abstract"), SIZES.abstractOnly, f => f.condition)];
if (process.argv.includes("--dry")) { console.log({ screening: scr.length, extraction: ext.length, pools: { inc: inc.length, exTA: exTA.length, exFT: exFT.length } }); process.exit(0); }

const q = v => { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const dir = path.join(ROOT, "validation"); fs.mkdirSync(dir, { recursive: true });
// Screening sheet: order is shuffled so the AI decision cannot be guessed from position.
const scrRows = shuffle(scr).map(([r], i) => ({ item: "S" + String(i + 1).padStart(3, "0"), log_id: r.id, pmid: r.pmid, year: r.year,
  title: r.title, link: r.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` : "", disorder_searched: r.disorder,
  reviewer: "", decision: "", exclusion_reason: "", minutes: "", comment: "" }));
const extRows = shuffle(ext).map((f, i) => { const r = rows.find(x => x.id === f.id.replace(/-fc$/, "")) || {};
  return { item: "E" + String(i + 1).padStart(3, "0"), entry_id: f.id, kind: f.type === "connectivity" ? "connectivity" : "power",
    pmid: r.pmid || "", link: r.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` : "", title: (f.cite || {}).title,
    reviewer: "", condition: "", bands_and_directions: "", sites_or_pairs: "", n: "", design: "", eyes: "", power: "", icd11: "", comment: "" }; });
const write = (name, list) => { const h = Object.keys(list[0]); fs.writeFileSync(path.join(dir, name), [h.join(","), ...list.map(o => h.map(k => q(o[k])).join(","))].join("\n") + "\n"); };
write("screening-sheet.csv", scrRows); write("extraction-sheet.csv", extRows);
console.log(`Wrote validation/screening-sheet.csv (${scrRows.length}) and validation/extraction-sheet.csv (${extRows.length}). Seed ${SEED}.`);
