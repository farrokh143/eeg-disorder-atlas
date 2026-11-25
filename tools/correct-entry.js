#!/usr/bin/env node
// Corrects specific fields of an existing atlas entry after a check against the paper (validation or audit).
// One JSON object per line: {"id":"pm-123","sites":["F3","F4"],"n":272,"k":16,"detail_add":"Sentence appended to detail.","reason":"why, and who checked"}
// Only sites, n, k and detail_add are supported; anything bigger goes through revert-finding.js + apply-review.js.
// Usage: node tools/correct-entry.js <file.jsonl> [--check]
const fs = require("fs");
const { readLog, writeLog, loadData, DATA, ELECTRODES } = require("./lib");
const { validate } = require("./validate-data");
const file = process.argv[2], check = process.argv.includes("--check");
if (!file) { console.log("Usage: node tools/correct-entry.js <file.jsonl> [--check]"); process.exit(1); }
const recs = fs.readFileSync(file, "utf8").split("\n").filter(l => l.trim()).map(l => JSON.parse(l));
const { data: D } = loadData(), byId = Object.fromEntries(D.findings.concat(D.connectivity || []).map(f => [f.id, f]));
const errs = [];
for (const r of recs) { const e = m => errs.push(`${r.id}: ${m}`), f = byId[r.id];
  if (!f) { e("no such entry"); continue; }
  if (!r.reason) e("reason is required");
  if (r.sites && (f.type === "connectivity" || !Array.isArray(r.sites) || r.sites.some(s => !ELECTRODES.includes(s)))) e("bad sites (power entries only, 10-20 labels)");
  for (const k of ["n", "k"]) if (r[k] != null && !(Number.isInteger(r[k]) && r[k] > 0)) e(`${k} must be a positive whole number`);
  if (r.detail_add && /"/.test(r.detail_add)) e('detail_add must not contain double quotes'); }
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
if (check) { console.log(`Check passed: ${recs.length} correction(s).`); process.exit(0); }
let src = fs.readFileSync(DATA, "utf8");
const today = new Date().toISOString().slice(0, 10), { rows, header } = readLog();
for (const r of recs) {
  const start = src.indexOf(`id: "${r.id}", `); const next = src.indexOf("\n    {", start + 1); const end = next < 0 ? src.length : next;
  let seg = src.slice(start, end); const changed = [];
  if (r.sites) { seg = seg.replace(/sites: \[[^\]]*\]/, `sites: ${JSON.stringify(r.sites).replace(/,/g, ",")}`); changed.push("sites"); }
  for (const k of ["n", "k"]) if (r[k] != null) { seg = seg.replace(new RegExp(`(metrics: \\{[^}]*\\b${k}: )(null|\\d+)`), `$1${r[k]}`); changed.push(k); }
  if (r.detail_add) { seg = seg.replace(/(detail: "[^"]*?)(")/, `$1 ${r.detail_add}$2`); changed.push("detail"); }
  src = src.slice(0, start) + seg + src.slice(end);
  const row = rows.find(x => x.id === r.id.replace(/-fc$/, "")); if (row) row.notes = (row.notes ? row.notes + "; " : "") + `Corrected ${today} (${changed.join(", ")}): ${r.reason}`;
}
fs.writeFileSync(DATA, src); writeLog({ header, rows });
const v = validate(); if (v.length) { console.log("Validation failed:\n" + v.join("\n")); process.exit(1); }
console.log(`Corrected ${recs.length} entr${recs.length === 1 ? "y" : "ies"}. Validation OK.`);
