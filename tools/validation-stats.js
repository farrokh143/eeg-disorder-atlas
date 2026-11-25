#!/usr/bin/env node
// Computes the validation statistics in methods/validation-protocol.md from completed reviewer sheets.
// Reviewer files (copies of the blank sheets, filled in): validation/screening-<reviewer>.csv, validation/extraction-<reviewer>.csv
// Reviewer names: human1, human2 (the reference standard) and opus (the model second reviewer). Optional adjudication:
// validation/screening-adjudicated.csv / extraction-adjudicated.csv (same format, only the disputed items).
// Usage: node tools/validation-stats.js [--out methods/validation-results.md]
const fs = require("fs"), path = require("path");
const { readLog, loadData, ROOT } = require("./lib");
const { wilson } = require("./synthesize");
const dir = path.join(ROOT, "validation");

function parseCSV(t) { const out = []; let row = [], f = "", q = false;
  for (let i = 0; i < t.length; i++) { const c = t[i];
    if (q) { if (c === '"' && t[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && t[i + 1] === "\n") i++; row.push(f); out.push(row); row = []; f = ""; } else f += c; }
  if (f || row.length) { row.push(f); out.push(row); }
  const [h, ...r] = out.filter(x => x.some(v => v !== "")); return r.map(x => Object.fromEntries(h.map((k, i) => [k, (x[i] || "").trim()]))); }
const load = n => { const p = path.join(dir, n); return fs.existsSync(p) ? parseCSV(fs.readFileSync(p, "utf8")) : null; };
const byItem = list => Object.fromEntries((list || []).map(r => [r.item, r]));

// Cohen's kappa for two raters over the same items (labels are strings).
function kappa(pairs) { pairs = pairs.filter(([a, b]) => a && b); const n = pairs.length; if (!n) return null;
  const labels = [...new Set(pairs.flat())]; const po = pairs.filter(([a, b]) => a === b).length / n;
  const pe = labels.reduce((s, l) => s + (pairs.filter(p => p[0] === l).length / n) * (pairs.filter(p => p[1] === l).length / n), 0);
  return { n, agree: po, kappa: pe === 1 ? 1 : (po - pe) / (1 - pe) }; }
const pct = x => x == null ? "–" : (100 * x).toFixed(1) + "%";
const ci = (k, n) => { if (!n) return "–"; const w = wilson(k, n); return `${pct(k / n)} (${pct(w[0])}–${pct(w[1])})`; };
const fmtK = r => r ? `κ = ${r.kappa.toFixed(2)}, agreement ${pct(r.agree)} (n = ${r.n})` : "not available yet";
const norm = d => { d = (d || "").toLowerCase(); return /^inc/.test(d) ? "include" : /^exc/.test(d) ? "exclude" : ""; };

const out = ["# Validation results", "", `Generated ${new Date().toISOString().slice(0, 10)} by tools/validation-stats.js. Protocol: methods/validation-protocol.md.`, ""];
const { rows } = readLog(), logBy = Object.fromEntries(rows.map(r => [r.id, r]));

// ---------- Screening ----------
const sheet = load("screening-sheet.csv");
if (!sheet) { console.log("No validation/screening-sheet.csv: run node tools/validation-sample.js first."); process.exit(1); }
const H1 = byItem(load("screening-human1.csv")), H2 = byItem(load("screening-human2.csv")), OP = byItem(load("screening-opus.csv")), ADJ = byItem(load("screening-adjudicated.csv"));
const isFT = r => /Outside atlas schema/.test(r.reason) || /full[- ]text/i.test(r.notes);
const stratum = r => r.status === "included" ? "included" : isFT(r) ? "exFT" : "exTA";
const pool = { included: 0, exTA: 0, exFT: 0 }; for (const r of rows) if (r.status !== "full-text" && !/^Duplicate of/.test(r.reason)) pool[stratum(r)]++;
const KEY = byItem(load("key-screening.csv")); // frozen pipeline answers (tools/validation-key.js); falls back to the live log
const items = sheet.map(s => { const r = logBy[s.log_id] || {}, key = KEY[s.item]; const h1 = norm((H1[s.item] || {}).decision), h2 = norm((H2[s.item] || {}).decision);
  const adj = norm((ADJ[s.item] || {}).decision); const ref = adj || (h1 && h2 && h1 === h2 ? h1 : (h1 && !h2 ? null : null));
  return { item: s.item, ai: key ? key.ai_decision : r.status === "included" ? "include" : "exclude", stratum: key ? key.stratum : stratum(r), h1, h2, ref, opus: norm((OP[s.item] || {}).decision) }; });
const nSt = { included: 0, exTA: 0, exFT: 0 }; items.forEach(i => nSt[i.stratum]++);
const w = Object.fromEntries(Object.keys(nSt).map(k => [k, nSt[k] ? pool[k] / nSt[k] : 0]));
const disputed = items.filter(i => i.h1 && i.h2 && i.h1 !== i.h2 && !i.ref).map(i => i.item);
out.push("## Screening (" + items.length + " records)", "",
  `Inter-rater (human 1 vs human 2): ${fmtK(kappa(items.map(i => [i.h1, i.h2])))}`,
  `Model second reviewer (Opus) vs human reference: ${fmtK(kappa(items.filter(i => i.ref).map(i => [i.opus, i.ref])))}`,
  `Pipeline vs Opus: ${fmtK(kappa(items.map(i => [i.ai, i.opus])))}`, "");
const R = items.filter(i => i.ref);
if (R.length) {
  const tp = R.filter(i => i.ref === "include" && i.ai === "include"), fn = R.filter(i => i.ref === "include" && i.ai === "exclude");
  const tn = R.filter(i => i.ref === "exclude" && i.ai === "exclude"), fp = R.filter(i => i.ref === "exclude" && i.ai === "include");
  const W = list => list.reduce((s, i) => s + w[i.stratum], 0);
  const wsens = W(tp) / (W(tp) + W(fn) || 1), wspec = W(tn) / (W(tn) + W(fp) || 1);
  out.push("Pipeline vs human reference (unweighted, with Wilson 95% CI):", "",
    `- Sensitivity (papers that should be included and were): ${ci(tp.length, tp.length + fn.length)}`,
    `- Specificity: ${ci(tn.length, tn.length + fp.length)}`,
    `- Pipeline vs reference: ${fmtK(kappa(R.map(i => [i.ai, i.ref])))}`,
    `- Weighted to the full log (strata weights ${Object.entries(w).map(([k, v]) => `${k} ${v.toFixed(1)}`).join(", ")}): sensitivity ${pct(wsens)}, specificity ${pct(wspec)}`,
    `- Missed papers (false exclusions): ${fn.map(i => i.item).join(", ") || "none"}`,
    `- Wrongly included: ${fp.map(i => i.item).join(", ") || "none"}`, "");
} else out.push("No human reference decisions yet.", "");
if (disputed.length) out.push(`Needs adjudication (humans disagree): ${disputed.join(", ")}`, "");

// ---------- Extraction ----------
const esheet = load("extraction-sheet.csv"), { data: D } = loadData(), ent = Object.fromEntries(D.findings.concat(D.connectivity || []).map(f => [f.id, f]));
if (esheet) {
  const E = { human1: byItem(load("extraction-human1.csv")), human2: byItem(load("extraction-human2.csv")), opus: byItem(load("extraction-opus.csv")), adj: byItem(load("extraction-adjudicated.csv")) };
  const bd = s => (s || "").toLowerCase().split(/[;,\s]+/).filter(Boolean).map(x => x.replace(/\s/g, "")).sort().join(" ");
  const st = s => (s || "").toLowerCase().split(/[;,\s]+/).filter(Boolean).sort().join(" ");
  const pipe = f => ({ condition: f.condition, bands_and_directions: Object.entries(f.changes).map(([b, d]) => `${b}:${d}`).sort().join(" "),
    sites_or_pairs: (f.pairs ? f.pairs.map(p => p.slice().sort().join("-")) : f.sites).map(x => x.toLowerCase()).sort().join(" "),
    n: f.metrics && f.metrics.n != null ? String(f.metrics.n) : "", design: String(f.metrics && f.metrics.design || ""),
    eyes: f.rec ? f.rec.eyes : "", power: f.rec ? f.rec.power : "", icd11: f.rec ? f.rec.icd11 : "" });
  const field = (r, k) => { const v = r && r[k]; if (!v) return ""; return k === "bands_and_directions" ? bd(v) : k === "sites_or_pairs" ? st(v).split(" ").map(x => x.split("-").sort().join("-")).sort().join(" ") : String(v).toLowerCase().trim(); };
  const F = ["condition", "bands_and_directions", "sites_or_pairs", "n", "design", "eyes", "power", "icd11"];
  out.push("## Extraction (" + esheet.length + " entries)", "", "| Field | Human 1 vs 2 | Pipeline vs human reference | Opus vs human reference | Pipeline vs Opus |", "|---|---|---|---|---|");
  for (const k of F) {
    const EK = byItem(load("key-extraction.csv"));
    const rowsK = esheet.map(s => { const f = ent[s.entry_id], kk = EK[s.item];
      const p = kk && k in kk ? field(kk, k) : f ? field(pipe(f), k) || "" : "";
      const a = field(E.human1[s.item], k), b = field(E.human2[s.item], k), adj = field(E.adj[s.item], k);
      return { p, a, b, ref: adj || (a && a === b ? a : ""), o: field(E.opus[s.item], k) }; });
    const ag = pairs => { pairs = pairs.filter(([x, y]) => x && y); return pairs.length ? `${pct(pairs.filter(([x, y]) => x === y).length / pairs.length)} (${pairs.length})` : "–"; };
    out.push(`| ${k} | ${ag(rowsK.map(r => [r.a, r.b]))} | ${ag(rowsK.map(r => [r.p, r.ref]))} | ${ag(rowsK.map(r => [r.o, r.ref]))} | ${ag(rowsK.map(r => [r.p, r.o]))} |`);
  }
  out.push("", "Agreement is exact match after normalising case, order and separators (counts in brackets).", "");
}
const text = out.join("\n");
const o = process.argv.indexOf("--out"); if (o > 0) fs.writeFileSync(path.join(ROOT, process.argv[o + 1]), text + "\n");
console.log(text);
