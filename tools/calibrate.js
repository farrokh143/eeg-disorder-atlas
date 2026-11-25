#!/usr/bin/env node
// Compares two reviewers' enrichment files for the same entries (calibration, methods/validation-protocol.md).
// Usage: node tools/calibrate.js <small-model.jsonl> <large-model.jsonl> [--threshold 0.85]
const fs = require("fs");
const [a, b] = process.argv.slice(2, 4), ti = process.argv.indexOf("--threshold"), T = ti > 0 ? +process.argv[ti + 1] : 0.85;
const read = f => Object.fromEntries(fs.readFileSync(f, "utf8").split("\n").filter(l => l.trim()).map(l => JSON.parse(l)).map(r => [r.id, r]));
const A = read(a), B = read(b), ids = Object.keys(A).filter(id => B[id]);
const F = ["eyes", "power", "icd11", "dx", "n", "pmid"];
const norm = v => v == null || v === "" ? "null" : String(v).toLowerCase();
console.log(`Entries in both files: ${ids.length} (only in first: ${Object.keys(A).length - ids.length}, only in second: ${Object.keys(B).length - ids.length})\n`);
let pass = true;
for (const k of F) {
  const diff = ids.filter(id => norm(A[id][k]) !== norm(B[id][k])), ag = 1 - diff.length / ids.length;
  const gate = ["eyes", "power", "icd11", "dx"].includes(k); if (gate && ag < T) pass = false;
  console.log(`${k.padEnd(6)} ${(100 * ag).toFixed(0).padStart(3)}% agree${gate ? "" : " (reported, not gated)"}${diff.length ? "  differ: " + diff.map(id => `${id} [${norm(A[id][k])} vs ${norm(B[id][k])}]`).join("; ") : ""}`);
}
console.log(`\n${pass ? "PASS" : "FAIL"}: threshold ${(100 * T).toFixed(0)}% on eyes, power, icd11 and dx.`);
process.exit(pass ? 0 : 2);
