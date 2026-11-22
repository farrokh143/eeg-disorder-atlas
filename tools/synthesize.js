#!/usr/bin/env node
// Evidence synthesis for the EEG Disorder Atlas, as specified in methods/synthesis-protocol.md.
// Usage: node tools/synthesize.js          writes data/synthesis.js and methods/synthesis-results.md
//        node tools/synthesize.js --print  prints the summary table only
// Every number here can be reproduced: no manual steps, fixed random seed for Monte Carlo.
const fs = require("fs"), path = require("path");

// ---------- statistics ----------
function logChoose(n, k) { let s = 0; for (let i = 1; i <= k; i++) s += Math.log(n - k + i) - Math.log(i); return s; }
// Exact two-sided sign test: H0 pi = 0.5, x successes out of m. p = min(1, 2 * P(X >= max(x, m-x))).
function signTest(x, m) {
  if (m === 0) return 1;
  const hi = Math.max(x, m - x); let tail = 0;
  for (let i = hi; i <= m; i++) tail += Math.exp(logChoose(m, i) - m * Math.LN2);
  return Math.min(1, 2 * tail);
}
// Wilson score interval for a proportion x/m.
function wilson(x, m, z = 1.959963984540054) {
  if (m === 0) return [0, 1];
  const p = x / m, d = 1 + z * z / m, c = p + z * z / (2 * m), r = z * Math.sqrt(p * (1 - p) / m + z * z / (4 * m * m));
  return [(c - r) / d, (c + r) / d];
}
function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// Weighted sign-flip test: S = sum w_i s_i; under H0 each sign is +/- with probability 1/2.
// Exact enumeration for m <= 20, otherwise Monte Carlo with a fixed seed. Returns two-sided p.
function weightedSignFlip(w, s, iters = 100000, seed = 20261122) {
  const m = w.length; if (!m) return 1;
  const S = Math.abs(w.reduce((a, wi, i) => a + wi * s[i], 0)), eps = 1e-9;
  if (m <= 20) {
    let hit = 0; const tot = 1 << m;
    for (let mask = 0; mask < tot; mask++) { let t = 0; for (let i = 0; i < m; i++) t += (mask >> i & 1) ? w[i] : -w[i]; if (Math.abs(t) >= S - eps) hit++; }
    return hit / tot;
  }
  const rnd = mulberry32(seed); let hit = 0;
  for (let it = 0; it < iters; it++) { let t = 0; for (let i = 0; i < m; i++) t += rnd() < 0.5 ? w[i] : -w[i]; if (Math.abs(t) >= S - eps) hit++; }
  return (hit + 1) / (iters + 1);
}
// Benjamini-Hochberg and Benjamini-Yekutieli adjusted p-values (q-values).
function adjust(ps, method) {
  const m = ps.length; if (!m) return [];
  const cm = method === "BY" ? Array.from({ length: m }, (_, i) => 1 / (i + 1)).reduce((a, b) => a + b, 0) : 1;
  const order = ps.map((p, i) => [p, i]).sort((a, b) => a[0] - b[0]); const q = new Array(m); let prev = 1;
  for (let r = m - 1; r >= 0; r--) { const [p, i] = order[r]; prev = Math.min(prev, p * m * cm / (r + 1)); q[i] = Math.min(1, prev); }
  return q;
}

// ---------- data to votes ----------
const REGIONS = { frontal: ["Fp1", "Fp2", "F7", "F3", "Fz", "F4", "F8"], central: ["C3", "Cz", "C4"], temporal: ["T3", "T4", "T5", "T6"], parietal: ["P3", "Pz", "P4"], occipital: ["O1", "O2"] };
const RNAMES = Object.keys(REGIONS);
const regionOf = x => RNAMES.includes(x) ? x : RNAMES.find(r => REGIONS[r].includes(x));
const pairKey = (a, b) => [a, b].sort((x, y) => RNAMES.indexOf(x) - RNAMES.indexOf(y)).join("–");
const firstAuthor = f => (f.cite.authors || "").split(/[ ,]/)[0].toLowerCase();

// One vote = { pattern, study, value: up|down|mixed, n, design, global, author, id }
function votesFrom(D, opts) {
  const votes = [];
  const eligible = f => f.metrics.design < 5 && (opts.includeAbstract || f.source !== "abstract") && !(opts.dropDesign1 && f.metrics.design === 1);
  for (const f of D.findings) {
    if (f.type !== "biomarker" || !eligible(f)) continue;
    const global = f.sites.length === 0; if (global && opts.dropGlobal) continue;
    const regs = global ? RNAMES : [...new Set(f.sites.map(regionOf))];
    for (const [band, v] of Object.entries(f.changes)) {
      if (v === "asymmetry") { votes.push({ key: `${f.condition}|asym|${band}|frontal`, feature: "asymmetry", condition: f.condition, band, loc: "frontal", value: "asym", f, global }); continue; }
      for (const reg of regs) votes.push({ key: `${f.condition}|power|${band}|${reg}`, feature: "power", condition: f.condition, band, loc: reg, value: v, f, global });
    }
  }
  for (const f of D.connectivity || []) {
    if (!eligible(f)) continue;
    const pairs = [...new Set(f.pairs.map(([a, b]) => pairKey(regionOf(a), regionOf(b))))];
    const fam = opts.poolMeasures ? "any" : f.measure;
    for (const [band, v] of Object.entries(f.changes)) for (const pk of pairs)
      votes.push({ key: `${f.condition}|fc-${fam}|${band}|${pk}`, feature: "connectivity", measure: fam, condition: f.condition, band, loc: pk, value: v, f, global: false });
  }
  return votes;
}

// Collapse votes to one per independent unit per pattern (protocol §3).
function collapse(votes, opts) {
  const pats = new Map();
  for (const v of votes) {
    if (!pats.has(v.key)) pats.set(v.key, { key: v.key, feature: v.feature, measure: v.measure, condition: v.condition, band: v.band, loc: v.loc, units: new Map() });
    const unit = opts.byAuthor ? `${v.condition}:${firstAuthor(v.f)}` : (v.f.sample || v.f.id.replace(/-fc$/, ""));
    const P = pats.get(v.key); const u = P.units.get(unit);
    const rec = { id: v.f.id, value: v.value, n: v.f.metrics.n, design: v.f.metrics.design, global: v.global, source: v.f.source, year: v.f.cite.year, author: v.f.cite.authors.split(",")[0] };
    if (!u) P.units.set(unit, { unit, reports: [rec] }); else u.reports.push(rec);
  }
  for (const P of pats.values()) {
    P.studies = [...P.units.values()].map(u => {
      const vals = new Set(u.reports.map(r => r.value));
      const value = vals.size === 1 ? [...vals][0] : "mixed";
      const big = u.reports.reduce((a, b) => (b.n || 0) > (a.n || 0) ? b : a);
      return { unit: u.unit, ids: u.reports.map(r => r.id), value, n: big.n, design: Math.min(...u.reports.map(r => r.design)), global: u.reports.every(r => r.global), label: `${big.author} ${big.year}` };
    });
    delete P.units;
  }
  return [...pats.values()];
}

// ---------- per-pattern statistics and GRADE ----------
const LEVELS = ["", "Very low", "Low", "Moderate", "High"];
function analyse(P, meta) {
  const S = P.studies, k = S.length;
  if (P.feature === "asymmetry") { Object.assign(P, { k, testable: false, note: "Asymmetry side is not coded, so no direction test" }); return P; }
  const h = S.filter(s => s.value === "up").length, l = S.filter(s => s.value === "down").length, u = k - h - l, m = h + l;
  const ns = S.map(s => s.n).filter(Boolean).sort((a, b) => a - b), med = ns.length ? ns[Math.floor((ns.length - 1) / 2)] : 30;
  const clear = S.filter(s => s.value === "up" || s.value === "down");
  const w = clear.map(s => Math.sqrt(s.n || med)), sg = clear.map(s => s.value === "up" ? 1 : -1);
  const dir = h === l ? "none" : h > l ? "up" : "down", x = Math.max(h, l);
  const share = m ? x / m : null, ci = wilson(x, m);
  const wsum = w.reduce((a, b) => a + b, 0), wshare = m ? clear.reduce((a, s, i) => a + ((s.value === dir) ? w[i] : 0), 0) / wsum : null;
  const p = signTest(x, m), pw = weightedSignFlip(w, sg);
  const nTotal = S.reduce((a, s) => a + (s.n || 0), 0), nMissing = S.filter(s => !s.n).length;
  Object.assign(P, { k, h, l, u, m, direction: dir, share, ci, wshare, p, p_w: pw, n_total: nTotal, n_missing: nMissing, testable: m >= 6 });
  // GRADE (protocol §5)
  const down = []; let lvl = 4;
  const allW = S.map(s => Math.sqrt(s.n || med)), W = allW.reduce((a, b) => a + b, 0);
  const wLow = S.reduce((a, s, i) => a + (s.design <= 2 ? allW[i] : 0), 0) / W, wVeryLow = S.reduce((a, s, i) => a + (s.design <= 1 ? allW[i] : 0), 0) / W;
  if (wVeryLow > 0.5) { lvl -= 2; down.push("risk of bias (very serious): most weight from uncontrolled or pilot studies"); }
  else if (wLow > 0.5) { lvl -= 1; down.push("risk of bias: most weight from single case-control or cross-sectional comparisons"); }
  const opposing = (meta || []).filter(f => f.changes[P.band] && ["up", "down"].includes(f.changes[P.band]) && f.changes[P.band] !== dir && dir !== "none");
  if (share !== null && share < 0.6) { lvl -= 2; down.push("inconsistency (very serious): studies split close to evenly"); }
  else if ((share !== null && share < 0.75) || u >= k / 3 || opposing.length) { lvl -= 1; down.push("inconsistency: " + [share !== null && share < 0.75 ? "under 75% agree" : "", u >= k / 3 ? "a third or more find no clear difference" : "", opposing.length ? "a meta-analysis points the other way" : ""].filter(Boolean).join("; ")); }
  const impN = nTotal < 400, impK = m < 6;
  if (impN && impK) { lvl -= 2; down.push("imprecision (very serious): fewer than 400 participants and fewer than 6 studies with a clear direction"); }
  else if (impN || impK) { lvl -= 1; down.push("imprecision: " + (impN ? "fewer than 400 participants" : "fewer than 6 studies with a clear direction")); }
  if (S.filter(s => s.global).length > k / 2) { lvl -= 1; down.push("indirectness: most results are whole-head, mapped to this region"); }
  if (m >= 3 && u === 0 && (h === 0 || l === 0) && S.every(s => s.n && s.n < 50)) { lvl -= 1; down.push("publication bias suspected: all studies small and all in one direction"); }
  P.downgrades = down; P.certainty_level = Math.max(1, lvl); P.meta = (meta || []).map(f => f.id);
  return P;
}

function run(D, opts = {}) {
  const votes = votesFrom(D, opts), pats = collapse(votes, opts);
  const metas = D.findings.filter(f => f.type === "biomarker" && f.metrics.design === 5);
  for (const P of pats) {
    const meta = P.feature === "power" ? metas.filter(f => f.condition === P.condition && f.changes[P.band] && (f.sites.length === 0 || f.sites.some(s => regionOf(s) === P.loc))) : [];
    analyse(P, meta);
  }
  const tested = pats.filter(P => P.testable);
  const qby = adjust(tested.map(P => P.p), "BY"), qbh = adjust(tested.map(P => P.p), "BH");
  tested.forEach((P, i) => { P.q_by = qby[i]; P.q_bh = qbh[i]; });
  for (const P of pats) {
    const q = opts.useBH ? P.q_bh : P.q_by;
    P.consistent = P.testable && q < 0.05 && P.direction !== "none";
    if (P.consistent && q < 0.001 && P.share >= 0.9 && P.m >= 10 && P.certainty_level < 4) { P.certainty_level += 1; P.downgrades.push("rated up: large, highly consistent body of evidence"); }
    P.certainty = LEVELS[P.certainty_level] || "";
    P.verdict = P.feature === "asymmetry" ? "descriptive" : !P.testable ? "too few studies" : P.consistent ? (P.direction === "up" ? "consistently higher" : "consistently lower") : "no consistent difference";
  }
  // p threshold implied by BY in this run (largest p among significant tests), for leave-one-out
  const sig = tested.filter(P => P.consistent); P_THRESH = sig.length ? Math.max(...sig.map(P => P.p)) : 0;
  return pats;
}
let P_THRESH = 0;

function sensitivity(D, main) {
  const key = P => P.key;
  const runs = {
    S1: run(D, { includeAbstract: true }), S2: run(D, { dropDesign1: true }), S4: run(D, { dropGlobal: true }),
    S5: run(D, { poolMeasures: true }), S6: run(D, { useBH: true }), S7: run(D, { byAuthor: true })
  };
  const thresh = (run(D, {}), P_THRESH);
  const idx = Object.fromEntries(Object.entries(runs).map(([k, ps]) => [k, new Map(ps.map(p => [key(p), p]))]));
  for (const P of main) {
    if (P.feature === "asymmetry") continue;
    const s = {};
    for (const k of ["S1", "S2", "S4", "S6", "S7"]) { const Q = idx[k].get(P.key); s[k] = Q ? Q.verdict : "no studies"; }
    if (P.feature === "connectivity") { const Q = idx.S5.get(P.key.replace(/fc-[a-z]+/, "fc-any")); s.S5 = Q ? Q.verdict : "no studies"; }
    // S3 leave-one-out: does removing any single clear-direction study push p above the threshold that made it significant?
    if (P.consistent) {
      const flips = [];
      for (const st of P.studies.filter(x => x.value === P.direction)) { const x = Math.max(P.h, P.l) - 1, m = P.m - 1; if (signTest(x, m) > thresh) flips.push(st.label); }
      s.S3 = flips.length ? `not robust: depends on ${flips.slice(0, 3).join(", ")}${flips.length > 3 ? "…" : ""}` : "robust";
    } else s.S3 = "n/a";
    P.sensitivity = s;
    P.robust = P.consistent && s.S3 === "robust" && [s.S2, s.S4, s.S7].every(v => v === P.verdict);
  }
}

// ---------- output ----------
function main() {
  const ROOT = path.join(__dirname, ".."); const w = {};
  new Function("window", fs.readFileSync(path.join(ROOT, "data", "research.js"), "utf8"))(w); const D = w.NF_DATA;
  const pats = run(D, {}); sensitivity(D, pats);
  const fmt = x => x == null ? "" : x < 0.001 ? x.toExponential(1) : x.toFixed(3);
  pats.sort((a, b) => (b.testable - a.testable) || ((a.q_by ?? 1) - (b.q_by ?? 1)) || (b.k - a.k));
  const out = pats.map(P => ({
    key: P.key, feature: P.feature, measure: P.measure || null, condition: P.condition, band: P.band, location: P.loc,
    k: P.k, higher: P.h ?? null, lower: P.l ?? null, unclear: P.u ?? null, direction: P.direction || null,
    share: P.share == null ? null : +P.share.toFixed(3), ci95: P.ci ? P.ci.map(v => +v.toFixed(3)) : null,
    weighted_share: P.wshare == null ? null : +P.wshare.toFixed(3), p: P.p ?? null, p_weighted: P.p_w ?? null,
    q_by: P.q_by ?? null, q_bh: P.q_bh ?? null, n_total: P.n_total ?? null, n_missing: P.n_missing ?? null,
    verdict: P.verdict, certainty: P.certainty || null, downgrades: P.downgrades || [], robust: !!P.robust,
    sensitivity: P.sensitivity || null, meta_analyses: P.meta || [],
    studies: P.studies.map(s => ({ ids: s.ids, label: s.label, vote: s.value, n: s.n, design: s.design, global: s.global }))
  }));
  const tested = out.filter(p => p.q_by != null);
  const summary = { patterns: out.length, testable: tested.length, consistent: out.filter(p => p.verdict.startsWith("consistently")).length, robust: out.filter(p => p.robust).length };
  const header = { protocol: "methods/synthesis-protocol.md v1.0", generated: new Date().toISOString().slice(0, 10),
    eligible: "biomarker and connectivity entries, design < 5, source full-text or curated (abstract-only only in S1)", summary };
  if (process.argv.includes("--print")) { console.log(header); for (const p of out.filter(x => x.q_by != null).slice(0, 40)) console.log([p.key, `k=${p.k}`, `${p.higher}↑/${p.lower}↓/${p.unclear}?`, `p=${fmt(p.p)}`, `pw=${fmt(p.p_weighted)}`, `q=${fmt(p.q_by)}`, p.verdict, p.certainty, p.robust ? "robust" : ""].join("  ")); return; }
  fs.writeFileSync(path.join(ROOT, "data", "synthesis.js"), "// Generated by tools/synthesize.js — do not edit by hand. Method: methods/synthesis-protocol.md\nwindow.NF_SYNTH = " + JSON.stringify({ ...header, patterns: out }) + ";\n");
  // human-readable results
  const C = Object.fromEntries(D.conditions.map(c => [c.id, c.name || c.label || c.id]));
  let md = `# Synthesis results\n\nGenerated ${header.generated} by \`tools/synthesize.js\` following \`methods/synthesis-protocol.md\` (v1.0).\n\n`;
  md += `- Patterns with any eligible study: ${summary.patterns}\n- Testable (≥ 6 studies with a clear direction): ${summary.testable}\n- Consistent difference (q_BY < 0.05): ${summary.consistent}\n- Robust in sensitivity analyses S2, S3, S4 and S7: ${summary.robust}\n\n`;
  md += `Eligible evidence: primary studies checked in full text (or hand-curated). Abstract-only entries are excluded here and added only in sensitivity analysis S1.\n\n`;
  md += `## Testable patterns\n\n| Condition | Feature | Band | Location | k | ↑ / ↓ / unclear | Share (95% CI) | Weighted share | p (sign) | p (weighted) | q (BY) | Verdict | Certainty | Robust | S1 (with abstracts) |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
  for (const p of tested) md += `| ${C[p.condition]} | ${p.feature}${p.measure ? " (" + p.measure + ")" : ""} | ${p.band} | ${p.location} | ${p.k} | ${p.higher} / ${p.lower} / ${p.unclear} | ${(p.share * 100).toFixed(0)}% (${(p.ci95[0] * 100).toFixed(0)}–${(p.ci95[1] * 100).toFixed(0)}) | ${(p.weighted_share * 100).toFixed(0)}% | ${fmt(p.p)} | ${fmt(p.p_weighted)} | ${fmt(p.q_by)} | ${p.verdict} | ${p.certainty} | ${p.robust ? "yes" : "no"} | ${p.sensitivity ? p.sensitivity.S1 : ""} |\n`;
  const few = out.filter(p => p.q_by == null && p.feature !== "asymmetry");
  md += `\n## Too few studies to test (${few.length} patterns)\n\nShown on the atlas with their study list and certainty, without a test. Largest:\n\n| Condition | Feature | Band | Location | k | ↑ / ↓ / unclear | Certainty |\n|---|---|---|---|---|---|---|\n`;
  for (const p of few.sort((a, b) => b.k - a.k).slice(0, 30)) md += `| ${C[p.condition]} | ${p.feature} | ${p.band} | ${p.location} | ${p.k} | ${p.higher} / ${p.lower} / ${p.unclear} | ${p.certainty} |\n`;
  fs.writeFileSync(path.join(ROOT, "methods", "synthesis-results.md"), md);
  console.log("Wrote data/synthesis.js and methods/synthesis-results.md", summary);
}
module.exports = { signTest, wilson, weightedSignFlip, adjust, run };
if (require.main === module) main();
