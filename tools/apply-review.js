#!/usr/bin/env node
// Applies a file of full-text review decisions (one JSON object per line) to the log and the dataset.
// Usage: node tools/apply-review.js reviews/<file>.jsonl          apply
//        node tools/apply-review.js reviews/<file>.jsonl --check  check only, change nothing
// Record formats are in RUNBOOK.md. Nothing is written if any record has a problem.
const fs = require("fs");
const { readLog, writeLog, loadData, DATA, ELECTRODES } = require("./lib");
const { validate } = require("./validate-data");
const file = process.argv[2], check = process.argv.includes("--check");
if (!file) { console.log("Usage: node tools/apply-review.js <file.jsonl> [--check]"); process.exit(1); }
const today = new Date().toISOString().slice(0, 10);
const REASONS = {
  T: "Not resting-state: task, provocation, photic or stimulus-evoked EEG",
  CN: "Outside atlas schema: connectivity, network, microstate or ML-classifier analysis only, no band-power direction or site",
  NR: "Not a disorder EEG marker or neurofeedback study (drug, stimulation, surgery, psychotherapy, training intervention or treatment-response prediction)",
  OT: "Off topic: not a scalp resting-EEG study of a disorder or symptom group",
  HI: "Healthy personality, trait or development only, no disorder or symptom measure",
  MEG: "MEG, not EEG", IMG: "Imaging (fMRI, PET, fNIRS), not EEG",
  INV: "Intracranial or invasive recording, not scalp resting EEG",
  MOD: "Animal, computational model or methods paper, not a human group study",
  SL: "Sleep EEG, not resting wakefulness", RT: "Retracted publication",
  NODATA: "Full text checked: no resting band-power result with a direction that can be placed on the scalp",
  SOURCE: "Source-space only (e.g. LORETA regions) with no scalp-level result that maps to 10-20 sites",
  NONBAND: "Measure is not band power (aperiodic exponent, burst or event statistics, synchronisation index, entropy); not placed in the atlas",
  REVIEW: "Review used for citation chasing only; not added as a finding"
};
const { header, rows } = readLog(); const byId = Object.fromEntries(rows.map(r => [r.id, r]));
const { src, data: D } = loadData();
const B = new Set(D.bands.map(b => b.id)), C = new Set(D.conditions.map(c => c.id)), S = new Set(D.symptoms.map(s => s.id));
const lines = fs.readFileSync(file, "utf8").split("\n").map(s => s.trim()).filter(s => s && !s.startsWith("//"));
const problems = [], findings = [], seen = new Set(); let nInc = 0, nExc = 0, nDef = 0, nPass = 0;
const addNote = (r, t) => { r.notes = r.notes ? r.notes + "; " + t : t; };
lines.forEach((line, i) => {
  let x; const P = m => problems.push(`line ${i + 1}${x && x.id ? " (" + x.id + ")" : ""}: ${m}`);
  try { x = JSON.parse(line); } catch (e) { return P("not valid JSON: " + e.message); }
  const r = byId[x.id]; if (!r) return P("no log row with this id");
  if (seen.has(x.id)) return P("id appears twice in this file"); seen.add(x.id);
  if (!["full-text", "to-review"].includes(r.status)) return P(`log status is "${r.status}"; only full-text or to-review rows can be reviewed`);
  if (x.decision === "exclude") {
    const reason = x.code === "X" ? x.reason : REASONS[x.code];
    if (!reason) return P(`unknown exclude code "${x.code}" (use one from RUNBOOK.md, or "X" with a "reason")`);
    x._reason = reason; return;
  }
  if (x.decision === "defer") { if (!x.note) P('"defer" needs a "note" saying what is missing'); return; }
  if (x.decision === "pass") { if (r.status !== "to-review") P('"pass" is only for to-review rows'); return; }
  if (x.decision !== "include") return P(`decision must be include, exclude, defer or pass (got "${x.decision}")`);
  // include
  if (!C.has(x.condition)) P(`condition "${x.condition}" is not an atlas condition (use defer with a note if the paper is about another condition)`);
  if (!["biomarker", "protocol"].includes(x.type)) P('type must be "biomarker" or "protocol"');
  if (!["full-text", "abstract"].includes(x.source)) P('source must be "full-text" or "abstract"');
  if (!Array.isArray(x.sites) || x.sites.some(s => !ELECTRODES.includes(s))) P(`sites must be 10-20 labels from: ${ELECTRODES.join(" ")} (or [] for whole-head)`);
  const ch = x.changes || {}, ok = x.type === "protocol" ? ["up", "down", "asymmetry", "regulate", "mixed"] : ["up", "down", "asymmetry", "mixed"];
  if (!Object.keys(ch).length) P("changes is empty");
  for (const [b, v] of Object.entries(ch)) { if (!B.has(b)) P(`unknown band "${b}" (bands: ${[...B].join(" ")})`); if (!ok.includes(v)) P(`change for ${b} must be one of ${ok.join("/")}`); }
  if (!Array.isArray(x.symptoms) || !x.symptoms.length || x.symptoms.some(s => !S.has(s))) P(`symptoms must be ids from: ${[...S].join(" ")}`);
  if (!(Number.isInteger(x.design_level) && x.design_level >= 1 && x.design_level <= 5)) P("design_level must be 1-5");
  if (![null, "sham", "active", "usual", "none"].includes(x.control ?? null)) P("control must be sham, active, usual, none or null");
  if (![null, true, false].includes(x.blinded ?? null)) P("blinded must be true, false or null");
  for (const k of ["n", "k"]) if (x[k] != null && !(Number.isInteger(x[k]) && x[k] > 0)) P(`${k} must be a whole number or null`);
  if (!["strong", "moderate", "preliminary", "contested"].includes(x.evidence)) P("evidence must be strong, moderate, preliminary or contested");
  if (x.evidence === "strong" && x.design_level < 5) P('"strong" needs design_level 5 (meta-analysis); a single study is at most "moderate"');
  if (x.evidence === "moderate" && x.design_level < 3) P('"moderate" needs design_level 3 or more; case-control and pilot studies are "preliminary" or "contested"');
  if (!x.claim || x.claim.length > 120) P("claim is required, max 120 characters");
  if (!x.detail || x.detail.length < 60) P("detail is required: two or three plain sentences");
  if (x.source === "abstract" && !/abstract/i.test(x.detail || "")) P('source is "abstract", so detail must say the result is taken from the abstract');
  if (!x.design) P('design (short text, e.g. "Case-control") is required');
  if (x.cite) for (const k of ["authors", "year", "title", "journal"]) if (!r[k] && x.cite[k]) r[k] = String(x.cite[k]);
  if (!r.title || !r.authors || !r.year || !r.journal) P('log row is missing title/authors/year/journal; add "cite": {"authors": "Surname AB, et al.", "year": 2020, "title": "...", "journal": "..."} from PubMed metadata');
  const vals = Object.values(ch);
  const direction = x.direction || (vals.includes("asymmetry") ? "asymmetry" : vals.every(v => v === vals[0]) && ["up", "down"].includes(vals[0]) ? vals[0] : "ratio");
  if (!["up", "down", "ratio", "asymmetry"].includes(direction)) P("direction must be up, down, ratio or asymmetry");
  findings.push({ x, r, f: { id: r.id, condition: x.condition, type: x.type,
    metrics: { design: x.design_level, control: x.control ?? null, blinded: x.blinded ?? null, n: x.n ?? null, k: x.k ?? null },
    sites: x.sites, bands: Object.keys(ch), direction, evidence: x.evidence, changes: ch, symptoms: x.symptoms,
    claim: x.claim, detail: x.detail, design: x.design,
    cite: { authors: r.authors, year: +r.year, title: r.title.replace(/\.$/, ""), journal: r.journal } } });
});
if (problems.length) { console.log("Nothing applied. Fix these and run again:\n" + problems.join("\n")); process.exit(1); }
if (check) { console.log(`Check passed: ${lines.length} record(s) are valid. Run again without --check to apply.`); process.exit(0); }
const J = JSON.stringify;
const fmt = f => `    {
      id: ${J(f.id)}, condition: ${J(f.condition)}, type: ${J(f.type)},
      metrics: { design: ${f.metrics.design}, control: ${J(f.metrics.control)}, blinded: ${J(f.metrics.blinded)}, n: ${J(f.metrics.n)}, k: ${J(f.metrics.k)} },
      sites: ${J(f.sites)}, bands: ${J(f.bands)}, direction: ${J(f.direction)}, evidence: ${J(f.evidence)},
      changes: { ${Object.entries(f.changes).map(([k, v]) => `${k}: ${J(v)}`).join(", ")} }, symptoms: ${J(f.symptoms)},
      claim: ${J(f.claim)},
      detail: ${J(f.detail)},
      design: ${J(f.design)},
      cite: { authors: ${J(f.cite.authors)}, year: ${f.cite.year}, title: ${J(f.cite.title)}, journal: ${J(f.cite.journal)} }
    }`;
for (const line of lines) { const x = JSON.parse(line), r = byId[x.id];
  if (x.decision === "exclude") { r.status = "excluded"; r.reason = x._reason || (x.code === "X" ? x.reason : REASONS[x.code]); addNote(r, `Full-text review ${today}: excluded${x.note ? " (" + x.note + ")" : ""}`); nExc++; }
  else if (x.decision === "defer") { addNote(r, `Full-text review deferred ${today}: ${x.note}`); nDef++; }
  else if (x.decision === "pass") { r.status = "full-text"; addNote(r, `Passed screening ${today}${x.note ? ": " + x.note : ""}`); nPass++; } }
for (const { x, r, f } of findings) {
  r.status = "included"; r.reason = ""; r.type = f.type === "protocol" ? "treatment" : "eeg-marker"; r.recording = "resting";
  r.design = f.design; r.evidence = f.evidence; r.n = f.metrics.n ?? ""; r.k = f.metrics.k ?? "";
  addNote(r, `Included after ${x.source === "abstract" ? "abstract-only" : "full-text"} review ${today}`); nInc++;
}
writeLog({ header, rows });
if (findings.length) {
  const marker = "\n  ],\n\n  methodology:"; const at = src.indexOf(marker);
  if (at < 0) { console.log("Could not find the end of findings in research.js; log was updated but findings were not added."); process.exit(1); }
  fs.writeFileSync(DATA, src.slice(0, at) + ",\n" + findings.map(z => fmt(z.f)).join(",\n") + src.slice(at));
}
const errs = validate();
console.log(`Applied: ${nInc} included, ${nExc} excluded, ${nDef} deferred, ${nPass} passed to full text.`);
if (errs.length) { console.log("WARNING, validation problems:\n" + errs.join("\n")); process.exit(1); }
console.log("Validation OK.");
