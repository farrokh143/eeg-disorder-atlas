#!/usr/bin/env node
// Writes a compact Markdown summary of data/research-log.csv for the Claude Project
// (research-log-summary.md): counts by disorder and status, plus every row that is not an
// unscreened bulk-pull record. The full log stays on GitHub.
// Usage: node tools/log-summary.js > research-log-summary.md
const fs = require("fs"), path = require("path");
const text = fs.readFileSync(path.join(__dirname, "..", "data", "research-log.csv"), "utf8");
const rows = []; { let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) { const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else if (c !== "\r") cell += c; } }
const [h, ...r] = rows.filter(x => x.length > 1); const L = r.map(x => Object.fromEntries(h.map((k, i) => [k, x[i] || ""])));
const today = new Date().toISOString().slice(0, 10);
const st = ["included", "full-text", "to-review", "excluded"];
const ds = [...new Set(L.flatMap(x => x.disorder.split("; ")).filter(Boolean))].sort();
let o = `# Research log summary\n\nGenerated ${today} from data/research-log.csv (${L.length} rows). Full log: https://github.com/farrokh143/eeg-disorder-atlas/blob/main/data/research-log.csv\n\n`;
o += `Totals: ${st.map(s => `${L.filter(x => x.status === s).length} ${s}`).join(", ")}. Unscreened bulk-pull rows (id starting pm-) have only a PubMed ID until screening.\n\n`;
o += "| Disorder | Included | Full text | To review | Excluded |\n|---|---|---|---|---|\n";
for (const d of ds) { const m = L.filter(x => x.disorder.split("; ").includes(d)); o += `| ${d} | ${st.map(s => m.filter(x => x.status === s).length).join(" | ")} |\n`; }
const notBulk = L.filter(x => !(x.id.startsWith("pm-") && (x.status === "to-review" || x.status === "excluded")));
const rc = {}; for (const x of L.filter(x => x.status === "excluded")) rc[x.reason] = (rc[x.reason] || 0) + 1;
o += "\n## Exclusion reasons (all excluded rows)\n\n| Reason | Count |\n|---|---|\n" + Object.entries(rc).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k.replace(/\|/g, "/")} | ${v} |`).join("\n") + "\n";
o += `\n## Included, full-text and hand-picked rows (excluded bulk rows are in the full log) (${notBulk.length})\n\n| id | status | disorder | year | first author | title | notes |\n|---|---|---|---|---|---|---|\n`;
for (const x of notBulk) o += `| ${x.id} | ${x.status}${x.reason ? ": " + x.reason : ""} | ${x.disorder} | ${x.year} | ${x.authors.split(",")[0]} | ${x.title.replace(/\|/g, "/")} | ${x.notes.replace(/\|/g, "/")} |\n`;
process.stdout.write(o);
