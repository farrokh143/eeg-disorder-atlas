#!/usr/bin/env node
// Bulk pull from PubMed (NCBI E-utilities) for every disorder in tools/queries.js, then import the
// results into data/research-log.csv as "to-review" via tools/import-pubmed.js.
//
// Needs network access to eutils.ncbi.nlm.nih.gov. Respects NCBI's limit of 3 requests per second.
// Usage:
//   node tools/pull-pubmed.js --counts            # only show how many hits each disorder has
//   node tools/pull-pubmed.js "Run 2 (PubMed)"    # pull everything and import
//   node tools/pull-pubmed.js "Run 2" ADHD PTSD   # pull only the named disorders
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const { DISORDERS, query } = require("./queries.js");
const BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
const TOOL = "&tool=eeg-disorder-atlas";
const args = process.argv.slice(2), countsOnly = args.includes("--counts");
const rest = args.filter(a => a !== "--counts");
const run = countsOnly ? "" : (rest.shift() || "Bulk pull (PubMed)");
const only = rest.length ? rest : Object.keys(DISORDERS);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(url) {
  for (let i = 0; i < 3; i++) {
    await sleep(400);
    const r = await fetch(url);
    if (r.ok) return r.json();
    if (r.status !== 429 && r.status < 500) throw new Error(`HTTP ${r.status} for ${url}`);
    await sleep(2000);
  }
  throw new Error("PubMed did not respond after 3 tries: " + url);
}
const q = v => { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pubmed-"));
  let total = 0;
  for (const d of only) {
    if (!DISORDERS[d]) { console.error("Unknown disorder: " + d); continue; }
    const s = await get(`${BASE}esearch.fcgi?db=pubmed&retmode=json&usehistory=y&retmax=0${TOOL}&term=${encodeURIComponent(query(d))}`);
    const n = +s.esearchresult.count; total += n;
    if (countsOnly) { console.log(`${d}: ${n}`); continue; }
    const { webenv, querykey } = s.esearchresult, rows = [];
    for (let start = 0; start < n; start += 200) {
      const r = await get(`${BASE}esummary.fcgi?db=pubmed&retmode=json&retstart=${start}&retmax=200&query_key=${querykey}&WebEnv=${webenv}${TOOL}`);
      for (const id of r.result.uids) {
        const x = r.result[id];
        const authors = (x.authors || []).map(a => a.name);
        const doi = (x.articleids || []).find(a => a.idtype === "doi");
        rows.push([id, x.title, authors.slice(0, 6).join(", ") + (authors.length > 6 ? ", et al." : ""), x.fulljournalname || x.source, (x.pubdate || "").slice(0, 4), doi ? doi.value : ""]);
      }
    }
    const file = path.join(tmp, d.replace(/\W+/g, "_") + ".csv");
    fs.writeFileSync(file, ["PMID,Title,Authors,Journal/Book,Publication Year,DOI", ...rows.map(r => r.map(q).join(","))].join("\n") + "\n");
    process.stdout.write(execFileSync("node", [path.join(__dirname, "import-pubmed.js"), file, d, run]));
  }
  console.log(`Total hits across searches: ${total}${countsOnly ? "" : " (overlaps between disorders are de-duplicated in the log)"}`);
})().catch(e => { console.error(e.message); process.exit(1); });
