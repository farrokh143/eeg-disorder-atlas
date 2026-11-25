#!/usr/bin/env node
// Freezes the pipeline's answers for the validation sample, as they were when the sample was drawn, so later
// corrections to the data cannot change what is being validated. Reads data from a snapshot folder (e.g. the files at
// the sampling commit, extracted with git show) and writes validation/key-screening.csv and validation/key-extraction.csv.
// Reviewers must not open the key files. Usage: node tools/validation-key.js <snapshot root with data/ and tools/lib.js>
const fs = require("fs"), path = require("path");
const snap = path.resolve(process.argv[2] || "."), { readLog, loadData } = require(path.join(snap, "tools/lib.js"));
const OUT = path.join(__dirname, "..", "validation");
const parse = t => t.trim().split("\n").slice(1).map(l => l.split(",").slice(0, 2));
const { rows } = readLog(), { data: D } = loadData(), by = Object.fromEntries(rows.map(r => [r.id, r]));
const isFT = r => /Outside atlas schema/.test(r.reason) || /full[- ]text/i.test(r.notes);
const q = v => { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const scr = parse(fs.readFileSync(path.join(OUT, "screening-sheet.csv"), "utf8")).map(([item, id]) => { const r = by[id];
  return [item, id, r.status === "included" ? "include" : "exclude", r.status === "included" ? "included" : isFT(r) ? "exFT" : "exTA", r.reason]; });
fs.writeFileSync(path.join(OUT, "key-screening.csv"), ["item,log_id,ai_decision,stratum,ai_reason", ...scr.map(x => x.map(q).join(","))].join("\n") + "\n");
const ent = Object.fromEntries(D.findings.concat(D.connectivity || []).map(f => [f.id, f]));
const ext = fs.readFileSync(path.join(OUT, "extraction-sheet.csv"), "utf8").trim().split("\n").slice(1).map(l => l.split(",").slice(0, 2)).map(([item, id]) => { const f = ent[id];
  return [item, id, f.condition, Object.entries(f.changes).map(([b, d]) => `${b}:${d}`).sort().join(" "),
    (f.pairs ? f.pairs.map(p => p.slice().sort().join("-")) : f.sites).join(" "), f.metrics.n == null ? "" : f.metrics.n, f.metrics.design]; });
fs.writeFileSync(path.join(OUT, "key-extraction.csv"), ["item,entry_id,condition,bands_and_directions,sites_or_pairs,n,design", ...ext.map(x => x.map(q).join(","))].join("\n") + "\n");
console.log(`Froze ${scr.length} screening and ${ext.length} extraction answers from ${snap}.`);
