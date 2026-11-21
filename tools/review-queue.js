#!/usr/bin/env node
// Lists the next papers waiting for full-text review (status full-text, or hand-picked to-review rows).
// Usage: node tools/review-queue.js "<Disorder>" [count]     e.g. node tools/review-queue.js "Alzheimer's" 10
//        node tools/review-queue.js --counts                  how many are waiting per disorder
// Papers deferred with [retry] are listed last; papers deferred with [parked: ...] are not listed. Disorder names are the ones in the log (see --counts).
const { readLog } = require("./lib");
const { rows } = readLog();
const parked = r => /\[parked:/.test(r.notes);
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
