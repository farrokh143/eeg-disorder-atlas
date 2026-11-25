// Shared helpers for the review tools: read/write the research log and load the dataset.
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const LOG = path.join(ROOT, "data", "research-log.csv");
const DATA = path.join(ROOT, "data", "research.js");

function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) { const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else if (c !== "\r") cell += c; }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.length > 1);
}
function readLog() {
  const [h, ...r] = parseCSV(fs.readFileSync(LOG, "utf8"));
  return { header: h, rows: r.map(x => Object.fromEntries(h.map((k, i) => [k, x[i] || ""]))) };
}
const q = v => { v = v == null ? "" : String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
function writeLog({ header, rows }) {
  fs.writeFileSync(LOG, [header.join(","), ...rows.map(r => header.map(k => q(r[k])).join(","))].join("\n") + "\n");
}
function loadData() {
  const src = fs.readFileSync(DATA, "utf8"); const w = {};
  new Function("window", src)(w); return { src, data: w.NF_DATA };
}
const ELECTRODES = ["Fp1","Fp2","F7","F3","Fz","F4","F8","T3","C3","Cz","C4","T4","T5","P3","Pz","P4","T6","O1","O2"];
const DISORDER_TO_CONDITION = { "Alzheimer's": "alzheimers", "ADHD": "adhd", "Schizophrenia": "schizophrenia", "Depression": "depression",
  "Parkinson's": "parkinsons", "Brain injury (TBI)": "tbi", "Insomnia": "insomnia", "Autism": "autism", "Alcohol & substance use": "sud",
  "Epilepsy": "epilepsy", "PTSD": "ptsd", "Anxiety": "anxiety", "Migraine": "migraine", "Healthy cognition": "cognition",
  "Bipolar": "bipolar", "OCD": "ocd", "Lewy body dementia": "lewy", "Frontotemporal dementia": "ftd", "Intellectual disability": "intellectual",
  "Learning disorders": "learning", "Multiple sclerosis": "ms", "Stroke": "stroke" };
module.exports = { ROOT, LOG, DATA, readLog, writeLog, loadData, ELECTRODES, DISORDER_TO_CONDITION };
