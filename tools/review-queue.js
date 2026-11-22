#!/usr/bin/env node
// Lists the next papers waiting for full-text review (status full-text, or hand-picked to-review rows).
// Usage: node tools/review-queue.js "<Disorder>" [count]     e.g. node tools/review-queue.js "Alzheimer's" 10
//        node tools/review-queue.js --counts                  how many are waiting per disorder
//        node tools/review-queue.js --connectivity ["<Disorder>" count]   connectivity pass (see RUNBOOK.md, Part 2)
// Papers deferred with [retry] are listed last; papers deferred with [parked: ...] are not listed. Disorder names are the ones in the log (see --counts).
const { readLog } = require("./lib");
const { rows } = readLog();
const parked = r => /\[parked:/.test(r.notes);
// Connectivity pass: rows excluded as connectivity-only that have not been re-reviewed, plus included papers whose title
// suggests connectivity results and that have not been checked yet.
if (process.argv[2] === "--connectivity") {
  const FC = /coheren|connectiv|synchron|phase[- ]lag|\bPLI\b|\bPLV\b|phase locking|network|coupling/i;
  const conn = rows.filter(r => (r.status === "excluded" && /^Outside atlas schema/.test(r.reason) && !/Connectivity re-review/.test(r.notes)) ||
    (r.status === "included" && FC.test(r.title) && !/Connectivity (checked|added|deferred)/.test(r.notes)));
  const d = process.argv[3], n = +(process.argv[4] || 10);
  if (!d) { const c = {}; for (const r of conn) for (const x of r.disorder.split("; ")) c[x] = (c[x] || 0) + 1;
    console.log("Waiting for connectivity review, by disorder:"); for (const [k, v] of Object.entries(c).sort((a, b) => b[1] - a[1])) console.log(`  ${v}\t${k}`);
    console.log(`Total unique: ${conn.length}`); process.exit(0); }
  const list = conn.filter(r => r.disorder.split("; ").includes(d));
  for (const r of list.slice(0, n)) console.log(JSON.stringify({ id: r.id, pmid: r.pmid || null, status: r.status, disorder: r.disorder, year: r.year, title: r.title }));
  console.log(`\n${Math.min(n, list.length)} of ${list.length} waiting for ${d}. PMIDs: ${JSON.stringify(list.slice(0, n).map(r => r.pmid).filter(Boolean))}`);
  process.exit(0);
}
const waiting = rows.filter(r => (r.status === "full-text" || r.status === "to-review") && !parked(r));
const nParked = rows.filter(r => r.status === "full-text" && parked(r)).length;
if (process.argv[2] === "--counts" || !process.argv[2]) {
  const c = {}; for (const r of waiting) for (const d of r.disorder.split("; ")) c[d] = (c[d] || 0) + 1;
  console.log("Waiting for review, by disorder (a paper can count under two):");
  for (const [d, n] of Object.entries(c).sort((a, b) => b[1] - a[1])) console.log(`  ${n}\t${d}`);
  console.log(`Total unique: ${waiting.length}. Parked (not listed): ${nParked}.`); process.exit(0);
}
const d = process.argv[2], n = +(process.argv[3] || 10);
const list = waiting.filter(r => r.disorder.split("; ").includes(d))
  .sort((a, b) => /deferred|\[retry\]/i.test(a.notes) - /deferred|\[retry\]/i.test(b.notes));
if (!list.length) { console.log(`Nothing waiting for "${d}". Run with --counts to see disorder names.`); process.exit(0); }
for (const r of list.slice(0, n)) console.log(JSON.stringify({ id: r.id, pmid: r.pmid || null, status: r.status, disorder: r.disorder, year: r.year, title: r.title, notes: r.notes.replace(/^.*?Passed title\/abstract screening [0-9-]+:?\s*/, "") }));
console.log(`\n${Math.min(n, list.length)} of ${list.length} waiting for ${d}. PMIDs: ${JSON.stringify(list.slice(0, n).map(r => r.pmid).filter(Boolean))}`);
