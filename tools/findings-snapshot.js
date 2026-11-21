#!/usr/bin/env node
// Writes a readable Markdown table of every included study, for the Claude Project copy
// (atlas-findings.md). Usage: node tools/findings-snapshot.js > atlas-findings.md
const path = require("path"), { execSync } = require("child_process");
global.window = {}; require(path.join(__dirname, "..", "data", "research.js")); const D = window.NF_DATA;
const C = Object.fromEntries(D.conditions.map(c => [c.id, c.name])), B = Object.fromEntries(D.bands.map(b => [b.id, b.name])), S = Object.fromEntries(D.symptoms.map(s => [s.id, s.name]));
const A = { up: "↑", down: "↓", asymmetry: "⇄", regulate: "⇅", mixed: "~" };
const DES = { 5: "meta-analysis", 4: "RCT", 3: "controlled/cohort", 2: "case-control/review", 1: "uncontrolled/pilot" };
let sha = ""; try { sha = execSync("git rev-parse --short HEAD", { cwd: __dirname }).toString().trim(); } catch (_) {}
const today = new Date().toISOString().slice(0, 10);
let o = `# Atlas findings (snapshot)\n\nGenerated from data/research.js on ${today}${sha ? ` (main @ ${sha})` : ""}. GitHub is the source of truth; this is a copy for reference in Claude chats.\n\n`;
o += `${D.findings.length} studies: ${D.findings.filter(f => f.type === "biomarker").length} resting-state EEG markers, ${D.findings.filter(f => f.type === "protocol").length} neurofeedback treatment studies.\n\n`;
for (const t of ["biomarker", "protocol"]) {
  o += `## ${t === "biomarker" ? "Resting-state EEG markers" : "Neurofeedback treatment studies"}\n\n| Disorder | Bands | Sites | Symptoms | Evidence | Design (1-5) | n / k | Study |\n|---|---|---|---|---|---|---|---|\n`;
  D.findings.filter(f => f.type === t).sort((a, b) => C[a.condition].localeCompare(C[b.condition]) || a.cite.year - b.cite.year).forEach(f => {
    const m = f.metrics;
    o += `| ${C[f.condition]} | ${Object.entries(f.changes).map(([b, d]) => B[b] + " " + A[d]).join(", ")} | ${f.sites.join(" ") || "whole-head"} | ${f.symptoms.map(s => S[s]).join("; ")} | ${f.evidence} | ${m.design} ${DES[m.design]}${m.control ? ", " + m.control + " control" : ""}${m.blinded ? ", blinded" : ""} | ${[m.n ? "n=" + m.n : "", m.k ? "k=" + m.k : ""].filter(Boolean).join(", ")} | ${f.cite.authors.split(",")[0]} et al. ${f.cite.year}, ${f.cite.journal}: ${f.claim} |\n`;
  });
  o += "\n";
}
o += "## Excluded (not resting-state)\n\n" + (D.excluded || []).map(x => `- ${x.cite.authors.split(",")[0]} ${x.cite.year}: ${x.reason}`).join("\n") + "\n";
process.stdout.write(o);
