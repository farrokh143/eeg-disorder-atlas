#!/usr/bin/env node
// Import a list of PubMed IDs (one per line or space-separated) into data/research-log.csv as "to-review".
// Used when a search returns IDs only (e.g. the PubMed connector); titles and abstracts are fetched at screening.
// A paper found under several disorders gets one row with all disorders listed ("ADHD; Autism").
// Papers already in the log (matched by pmid) are not duplicated; the run is noted on them instead.
//
// Usage: node tools/import-pmids.js <ids.txt> "<Disorder>" "<Run label>"
const fs = require("fs"), path = require("path");
const [file, disorder, run = "PubMed run"] = process.argv.slice(2);
if (!file || !disorder) { console.error('Usage: node tools/import-pmids.js <ids.txt> "<Disorder>" "<Run label>"'); process.exit(1); }
const LOG = path.join(__dirname, "..", "data", "research-log.csv");
const parse = text => { const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) { const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else if (c !== "\r") cell += c; }
  if (cell || row.length) { row.push(cell); rows.push(row); } return rows.filter(r => r.length > 1); };
const q = v => { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const [head, ...raw] = parse(fs.readFileSync(LOG, "utf8"));
const L = raw.map(r => Object.fromEntries(head.map((k, i) => [k, r[i] || ""])));
const byPmid = new Map(L.filter(r => r.pmid).map(r => [r.pmid, r]));
const ids = [...new Set(fs.readFileSync(file, "utf8").split(/\s+/).filter(x => /^\d+$/.test(x)))];
const today = new Date().toISOString().slice(0, 10);
let added = 0, tagged = 0, known = 0;
for (const pmid of ids) {
  const r = byPmid.get(pmid);
  if (r) {
    if (r.id.startsWith("pm-")) {
      const ds = r.disorder.split("; ").filter(Boolean);
      if (!ds.includes(disorder)) { ds.push(disorder); r.disorder = ds.join("; "); tagged++; }
    } else {
      if (!r.notes.includes(run)) r.notes = [r.notes, `Also found by ${run}`].filter(Boolean).join(". ");
      known++;
    }
    continue;
  }
  const row = { id: "pm-" + pmid, status: "to-review", reason: "", type: "", disorder, recording: "", authors: "", year: "", title: "",
    journal: "", design: "", evidence: "", n: "", k: "", pubmed_search: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, added: today,
    notes: `${run}. Title and abstract to fetch at screening.`, pmid };
  L.push(row); byPmid.set(pmid, row); added++;
}
fs.writeFileSync(LOG, [head.join(","), ...L.map(r => head.map(k => q(r[k])).join(","))].join("\n") + "\n");
console.log(`${disorder}: ${ids.length} ids → ${added} new, ${tagged} already logged under another disorder, ${known} already in the atlas or candidate list.`);
