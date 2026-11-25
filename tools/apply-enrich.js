#!/usr/bin/env node
// Adds recording details to existing entries (RUNBOOK.md, Part 3). One JSON object per line:
//   {"id":"pm-123","eyes":"closed","power":"relative","icd11":"6D71","dx":"research criteria","n":42,"pmid":"123","quote":"..."}
// Writes rec: { eyes, power, icd11, dx } onto the entry, fills metrics.n only when it is null, fills a missing PMID
// in the log, and adds an "Enriched <date>" note. The same paper's -fc entry is updated too unless it has its own line.
// Usage: node tools/apply-enrich.js <file.jsonl> [--check]   |   node tools/apply-enrich.js --queue [count]
const fs = require("fs");
const { readLog, writeLog, loadData, DATA } = require("./lib");
const { validate } = require("./validate-data");

const EYES = ["closed", "open", "both", "unclear"];
const POWER = ["absolute", "relative", "both", "ratio-only", "unclear", "n/a"];
const DX = ["DSM-III", "DSM-IV", "DSM-5", "ICD-10", "ICD-11", "research criteria", "clinical diagnosis", "scale cut-off", "mixed", "unclear"];
// Allowed ICD-11 codes per atlas condition ("subclinical" = non-clinical high-trait or symptom sample).
const ICD = {
  alzheimers: ["6D80", "6D71", "6D80+6D71", "6D8"], adhd: ["6A05"], schizophrenia: ["6A20", "6A2"], depression: ["6A70", "6A71", "6A7", "6A60-6A61"],
  parkinsons: ["8A00"], tbi: ["NA07", "NA07.0"], insomnia: ["7A00", "7A01", "7A0"], autism: ["6A02"],
  sud: ["6C40", "6C41", "6C43", "6C45", "6C46", "6C4A", "6C4"], epilepsy: ["8A6"], ptsd: ["6B40", "6B41"],
  anxiety: ["6B00", "6B01", "6B02", "6B03", "6B04", "6B0"], migraine: ["8A80"], cognition: ["none"]
};
const today = new Date().toISOString().slice(0, 10);
const { rows, header } = readLog();

if (process.argv[2] === "--queue") {
  const { data: D } = loadData(), n = +(process.argv[3] || 10);
  const base = new Set(D.findings.map(g => g.id));
  const todo = D.findings.concat(D.connectivity || []).filter(f => !f.rec && !(/-fc$/.test(f.id) && base.has(f.id.replace(/-fc$/, ""))));
  const byId = Object.fromEntries(rows.map(r => [r.id, r]));
  for (const f of todo.slice(0, n)) { const r = byId[f.id.replace(/-fc$/, "")] || {};
    console.log(JSON.stringify({ id: f.id, condition: f.condition, source: f.source, n: f.metrics && f.metrics.n, pmid: r.pmid || null, year: r.year, title: (f.cite || {}).title, allowed_icd11: ICD[f.condition] })); }
  console.log(`\n${Math.min(n, todo.length)} of ${todo.length} entries still need Part 3.`); process.exit(0);
}

const file = process.argv[2], check = process.argv.includes("--check");
if (!file) { console.log("Usage: node tools/apply-enrich.js <file.jsonl> [--check] | --queue [count]"); process.exit(1); }
const recs = fs.readFileSync(file, "utf8").split("\n").filter(l => l.trim()).map((l, i) => { try { return JSON.parse(l); } catch (e) { console.log(`line ${i + 1}: not valid JSON`); process.exit(1); } });
const { data: D } = loadData(), all = D.findings.concat(D.connectivity || []), byEntry = Object.fromEntries(all.map(f => [f.id, f]));
const errs = [];
for (const r of recs) {
  const e = m => errs.push(`${r.id}: ${m}`), f = byEntry[r.id];
  if (!f) { e("no entry with this id in research.js"); continue; }
  if (!EYES.includes(r.eyes)) e(`eyes must be one of ${EYES.join(", ")}`);
  if (!POWER.includes(r.power)) e(`power must be one of ${POWER.join(", ")}`);
  if (f.type !== "biomarker" && r.power !== "n/a") e('power must be "n/a" for protocol and connectivity entries');
  if (f.type === "biomarker" && r.power === "n/a") e('power cannot be "n/a" for a biomarker entry');
  if (!DX.includes(r.dx)) e(`dx must be one of ${DX.join(", ")}`);
  const ok = (ICD[f.condition] || []).concat(["subclinical"]);
  if (!ok.includes(r.icd11)) e(`icd11 for ${f.condition} must be one of ${ok.join(", ")}`);
  if (r.n != null && !(Number.isInteger(r.n) && r.n > 0)) e("n must be a positive whole number or null");
  if (r.pmid != null && !/^\d{5,9}$/.test(String(r.pmid))) e("pmid must be digits");
  if (r.eyes !== "unclear" && !r.quote) e("quote (a few words from the paper showing eye state) is required unless eyes is unclear");
}
if (errs.length) { console.log(errs.join("\n")); console.log(`\n${errs.length} problem(s). Nothing applied.`); process.exit(1); }
if (check) { console.log(`Check passed: ${recs.length} record(s) are valid. Run again without --check to apply.`); process.exit(0); }

let src = fs.readFileSync(DATA, "utf8"), changed = 0, nFilled = 0, pmFilled = 0;
const recOf = r => `rec: { eyes: "${r.eyes}", power: "${r.power}", icd11: "${r.icd11}", dx: "${r.dx}" }, `;
const targets = [];
for (const r of recs) { targets.push([r.id, r]); const fc = r.id + "-fc"; if (byEntry[fc] && !recs.some(x => x.id === fc)) targets.push([fc, { ...r, power: "n/a" }]); }
for (const [id, r] of targets) {
  const re = new RegExp(`(\\n\\s*id: "${id.replace(/[-.]/g, "\\$&")}", )(rec: \\{[^}]*\\}, )?`);
  if (!re.test(src)) { console.log(`${id}: could not find the entry line; skipped`); continue; }
  src = src.replace(re, `$1${recOf(r)}`); changed++;
  if (r.n != null) { const i = src.indexOf(`id: "${id}", `), j = src.indexOf("metrics: {", i), k = src.indexOf("}", j);
    const seg = src.slice(j, k); if (/n: null/.test(seg)) { src = src.slice(0, j) + seg.replace("n: null", `n: ${r.n}`) + src.slice(k); nFilled++; } }
}
fs.writeFileSync(DATA, src);
for (const r of recs) { const row = rows.find(x => x.id === r.id.replace(/-fc$/, "")); if (!row) continue;
  if (r.pmid && !row.pmid) { row.pmid = String(r.pmid); pmFilled++; }
  if (!/Enriched \d/.test(row.notes)) row.notes = (row.notes ? row.notes + "; " : "") + `Enriched ${today} (eyes ${r.eyes}, ${r.power}, ${r.icd11})`; }
writeLog({ header, rows });
const v = validate(); if (v.length) { console.log("Validation failed after applying:\n" + v.join("\n")); process.exit(1); }
console.log(`Applied: ${changed} entries updated, ${nFilled} sample sizes filled, ${pmFilled} PMIDs filled. Validation OK.`);
