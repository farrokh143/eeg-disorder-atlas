#!/usr/bin/env node
// Checks data/research.js and data/research-log.csv agree with the schema.
// Usage: node tools/validate-data.js   (exit code 1 and a list of problems if anything is wrong)
const { readLog, loadData, ELECTRODES } = require("./lib");
function validate() {
  const { data: D } = loadData(), { rows } = readLog(), errs = [];
  const B = new Set(D.bands.map(b => b.id)), C = new Set(D.conditions.map(c => c.id)), S = new Set(D.symptoms.map(s => s.id));
  const ids = new Set(), byId = Object.fromEntries(rows.map(r => [r.id, r]));
  for (const f of D.findings) {
    const e = m => errs.push(`${f.id || "?"}: ${m}`);
    if (!f.id) e("missing id"); if (ids.has(f.id)) e("duplicate id"); ids.add(f.id);
    if (!C.has(f.condition)) e(`unknown condition "${f.condition}"`);
    if (!["biomarker", "protocol"].includes(f.type)) e(`bad type "${f.type}"`);
    if (!Array.isArray(f.sites) || f.sites.some(s => !ELECTRODES.includes(s))) e(`bad sites ${JSON.stringify(f.sites)}`);
    if (!Array.isArray(f.bands) || !f.bands.length || f.bands.some(b => !B.has(b))) e(`bad bands ${JSON.stringify(f.bands)}`);
    const ck = Object.keys(f.changes || {});
    if (ck.sort().join() !== [...(f.bands || [])].sort().join()) e("changes keys must equal bands");
    const okv = f.type === "protocol" ? ["up", "down", "asymmetry", "regulate", "mixed"] : ["up", "down", "asymmetry", "mixed"];
    for (const [k, v] of Object.entries(f.changes || {})) if (!okv.includes(v)) e(`bad change ${k}: "${v}"`);
    if (!["up", "down", "ratio", "asymmetry"].includes(f.direction)) e(`bad direction "${f.direction}"`);
    if (!["strong", "moderate", "preliminary", "contested"].includes(f.evidence)) e(`bad evidence "${f.evidence}"`);
    if (!Array.isArray(f.symptoms) || !f.symptoms.length || f.symptoms.some(s => !S.has(s))) e(`bad symptoms ${JSON.stringify(f.symptoms)}`);
    const m = f.metrics || {};
    if (!(m.design >= 1 && m.design <= 5)) e("metrics.design must be 1-5");
    if (![null, "sham", "active", "usual", "none"].includes(m.control ?? null)) e(`bad control "${m.control}"`);
    for (const k of ["n", "k"]) if (m[k] != null && !(Number.isInteger(m[k]) && m[k] > 0)) e(`metrics.${k} must be a positive whole number or null`);
    if (!f.claim || !f.detail || !f.design) e("claim, detail and design are required");
    const c = f.cite || {}; if (!c.authors || !c.year || !c.title || !c.journal) e("cite needs authors, year, title, journal");
    const r = byId[f.id]; if (!r) e("no row in research-log.csv with this id"); else if (r.status !== "included") e(`log status is "${r.status}", should be "included"`);
  }
  for (const r of rows) if (r.status === "included" && !ids.has(r.id)) errs.push(`${r.id}: log says included but no finding in research.js`);
  const seen = new Set(); for (const r of rows) { if (seen.has(r.id)) errs.push(`${r.id}: duplicate id in log`); seen.add(r.id); }
  for (const r of rows) if (r.status === "excluded" && !r.reason) errs.push(`${r.id}: excluded without a reason`);
  return errs;
}
module.exports = { validate };
if (require.main === module) { const e = validate(); if (e.length) { console.log(e.join("\n")); console.log(`\n${e.length} problem(s).`); process.exit(1); } console.log("OK: research.js and research-log.csv are consistent."); }
