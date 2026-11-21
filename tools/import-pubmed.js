#!/usr/bin/env node
// Import a PubMed CSV export (PubMed → Save → Format: CSV → All results) into data/research-log.csv
// as "to-review" rows. Skips papers already in the log (by PMID or title) and flags likely exclusions.
//
// Usage: node tools/import-pubmed.js <export.csv> "<Disorder name>" ["Run label"]
//   Disorder name must match a disorder in the log, e.g. "ADHD", "Depression", "PTSD".
const fs = require("fs"), path = require("path");
const [file, disorder, run = "Bulk pull"] = process.argv.slice(2);
if (!file || !disorder) { console.error('Usage: node tools/import-pubmed.js <export.csv> "<Disorder>" ["Run label"]'); process.exit(1); }
const LOG = path.join(__dirname, "..", "data", "research-log.csv");

function parse(text) {
  const rows = []; let row = [], cell = "", q = false;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.length > 1);
}
const q = v => { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const norm = t => String(t || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const [logHead, ...logRows] = parse(fs.readFileSync(LOG, "utf8"));
if (!logHead.includes("pmid")) throw new Error("research-log.csv has no pmid column");
const L = logRows.map(r => Object.fromEntries(logHead.map((k, i) => [k, r[i] || ""])));
const havePmid = new Set(L.map(r => r.pmid).filter(Boolean));
const haveTitle = new Set(L.map(r => norm(r.title)));

const [h, ...rows] = parse(fs.readFileSync(file, "utf8"));
const col = name => h.findIndex(x => x.trim().toLowerCase() === name.toLowerCase());
const iP = col("PMID"), iT = col("Title"), iA = col("Authors"), iJ = col("Journal/Book"), iY = col("Publication Year"), iD = col("DOI");
if (iP < 0 || iT < 0) throw new Error("Not a PubMed CSV export (needs PMID and Title columns)");

// Title words that usually mean the paper is out of scope. Flag only; a person decides.
const FLAGS = [
  [/\bsleep\b|polysomnograph|\bnrem\b|\brem sleep/i, "sleep EEG?"],
  [/event[- ]related|\berp\b|evoked|steady[- ]state|mismatch negativity|p300|oddball/i, "task/evoked?"],
  [/\btask\b|during (a|the) /i, "task-based?"],
  [/\bmeg\b|magnetoenceph/i, "MEG only?"],
  [/\brats?\b|\bmice\b|\bmouse\b|rodent|animal model/i, "animal study?"],
  [/case report/i, "case report?"],
  [/neurofeedback|biofeedback/i, "treatment study (log as treatment)"],
  [/transcranial|\brtms\b|\btdcs\b/i, "stimulation study?"]
];
const today = new Date().toISOString().slice(0, 10);
let added = 0, dupe = 0, flagged = 0; const out = [];
for (const r of rows) {
  const pmid = (r[iP] || "").trim(), title = (r[iT] || "").trim();
  if (!pmid || !title) continue;
  if (havePmid.has(pmid) || haveTitle.has(norm(title))) { dupe++; continue; }
  havePmid.add(pmid); haveTitle.add(norm(title));
  const flags = FLAGS.filter(([re]) => re.test(title)).map(([, m]) => m);
  if (flags.length) flagged++;
  const type = /neurofeedback|biofeedback/i.test(title) ? "treatment" : "eeg-marker";
  const row = { id: "pm-" + pmid, status: "to-review", reason: "", type, disorder, recording: "", authors: r[iA] || "", year: r[iY] || "",
    title, journal: iJ >= 0 ? r[iJ] : "", design: "", evidence: "", n: "", k: "", pubmed_search: "https://pubmed.ncbi.nlm.nih.gov/" + pmid + "/",
    added: today, notes: [run, flags.length ? "check: " + flags.join(", ") : "", iD >= 0 && r[iD] ? "doi:" + r[iD] : ""].filter(Boolean).join(". "), pmid };
  out.push(logHead.map(k => q(row[k])).join(",")); added++;
}
if (out.length) fs.appendFileSync(LOG, out.join("\n") + "\n");
console.log(`${disorder}: ${rows.length} in export, ${added} added as to-review (${flagged} flagged), ${dupe} already in the log.`);
