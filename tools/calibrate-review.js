#!/usr/bin/env node
// Compares two reviewers' review decision files (RUNBOOK Part 1 format) for the same papers (screening calibration).
// Gate: decision agreement (include vs not include) >= threshold; band-direction agreement is reported for papers both included.
// Usage: node tools/calibrate-review.js <small-model.jsonl> <large-model.jsonl> [--threshold 0.85]
const fs = require("fs");
const [a, b] = process.argv.slice(2, 4), ti = process.argv.indexOf("--threshold"), T = ti > 0 ? +process.argv[ti + 1] : 0.85;
const read = f => { const m = {}; for (const l of fs.readFileSync(f, "utf8").split("\n").filter(x => x.trim())) { const r = JSON.parse(l);
  const k = r.id.replace(/-fc$/, ""); (m[k] = m[k] || []).push(r); } return m; };
const A = read(a), B = read(b), ids = Object.keys(A).filter(k => B[k]);
const dec = list => list.some(r => r.decision === "include") ? "include" : list[0].decision;
const ch = list => list.filter(r => r.decision === "include" && r.type !== "connectivity").map(r => Object.entries(r.changes || {}).map(([k, v]) => `${k}:${v}`).sort().join(" ")).sort().join(" | ");
let agree = 0; const rows = [];
for (const k of ids) { const da = dec(A[k]), db = dec(B[k]), inc = x => x === "include" ? "include" : "not";
  if (inc(da) === inc(db)) agree++; rows.push(`${k}: ${da} vs ${db}${da === "include" && db === "include" ? `  bands [${ch(A[k])}] vs [${ch(B[k])}]` : ""}`); }
const both = ids.filter(k => dec(A[k]) === "include" && dec(B[k]) === "include"), bandAg = both.filter(k => ch(A[k]) === ch(B[k])).length;
console.log(rows.join("\n"));
console.log(`\nPapers in both: ${ids.length}. Include-vs-not agreement: ${(100 * agree / ids.length).toFixed(0)}%. Both included: ${both.length}, identical band directions: ${bandAg}.`);
const pass = agree / ids.length >= T; console.log(`${pass ? "PASS" : "FAIL"}: threshold ${(100 * T).toFixed(0)}% on the include decision.`); process.exit(pass ? 0 : 2);
