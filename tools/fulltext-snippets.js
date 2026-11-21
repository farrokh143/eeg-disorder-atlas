#!/usr/bin/env node
// Prints the parts of a saved PubMed tool result that matter for extraction, so you do not have to read
// a 100 KB file. Works on get_full_text_article and get_article_metadata results.
// Usage: node tools/fulltext-snippets.js <saved-result-file> [maxCharsPerArticle=7000]
const fs = require("fs");
const file = process.argv[2], max = +(process.argv[3] || 7000);
if (!file) { console.log("Usage: node tools/fulltext-snippets.js <saved-result-file> [maxChars]"); process.exit(1); }
let d = JSON.parse(fs.readFileSync(file, "utf8"));
if (Array.isArray(d)) d = JSON.parse(d[0].text);
const KEY = /rest|eyes[- ](open|closed)|EO\b|EC\b|alpha|theta|delta|beta|gamma|spectr|power|asymmetr|electrode|\b(Fp[12]|F[3478z]|C[34z]|T[3-8]|P[34z78]|O[12])\b|frontal|central|parietal|occipital|temporal|posterior|patients|participants|controls|\bn ?= ?\d|meta-analy|randomi[sz]|sham|blind/i;
for (const a of d.articles || []) {
  const id = a.identifiers || {};
  console.log(`\n=== PMID ${id.pmid || "?"} ${a.full_text ? "| full text" : "| no full text in this result"} | DOI ${a.doi || id.doi || "?"}`);
  console.log(`TITLE: ${a.title}`);
  console.log(`ABSTRACT: ${(a.abstract || "(none)").replace(/\s+/g, " ")}`);
  if (!a.full_text) { console.log("FULL TEXT: not included in this result"); continue; }
  const paras = a.full_text.split(/\n+/).flatMap(p => p.length > 900 ? p.match(/[^.!?]+[.!?]+(\s|$)/g) || [p] : [p]);
  // Score each passage: keyword hits, plus a bonus for numbers and statistics (results and methods, not introduction).
  const G = new RegExp(KEY.source, "gi");
  const scored = paras.map((p, i) => { const t = p.replace(/\s+/g, " ").trim();
    const s = t.length < 40 ? 0 : (t.match(G) || []).length + (/\bp ?[<=>] ?0?\.\d|\d+(\.\d+)? ?Hz|\bn ?= ?\d|\(\d+ (patients|participants|controls)/i.test(t) ? 3 : 0);
    return { i, t, s }; }).filter(x => x.s >= 3);
  const keep = new Set(); let used = 0;
  for (const x of [...scored].sort((a, b) => b.s - a.s)) { if (used + x.t.length > max) continue; keep.add(x.i); used += x.t.length; }
  const out = scored.filter(x => keep.has(x.i)).map(x => "- " + x.t).join("\n") + "\n";
  console.log(`FULL TEXT, relevant passages (${used} of ${a.full_text.length} chars):\n${out}`);
}
