# EEG Disorder Atlas — project instructions

Use this file as the instructions for a Claude Project (claude.ai → Projects →
instructions) or for Claude Code working in this repository.

## What this is

A clickable International 10-20 electrode map that links disorders to the EEG
bands and scalp sites where differences have been reported, with graded
research evidence for each finding. Neurofeedback treatment studies are
included as a secondary filter; EEG markers are the main focus.

- `index.html`: the entire app. One static page, vanilla JS, no build step, no backend.
- `data/research.js`: all content, as `window.NF_DATA` (bands, conditions, findings, methodology).
- `README.md`: how to run it and the schema for findings.

## Adding or editing research

Add entries to `findings` in `data/research.js`:

```js
{
  id: "unique-id",
  condition: "alzheimers",       // id from `conditions` (add a condition there first if new)
  type: "biomarker",             // "biomarker" (EEG difference) | "protocol" (neurofeedback study)
  sites: ["Pz", "O1", "O2"],     // 10-20 labels, old naming T3/T4/T5/T6; [] = individualised / whole-head
  bands: ["alpha", "delta"],     // ids from `bands`
  direction: "down",             // "up" | "down" | "ratio" | "asymmetry" (summary only)
  changes: { alpha: "down", delta: "up" }, // REQUIRED, per band: "up" | "down" | "asymmetry" | "regulate" | "mixed"
                                 // biomarker = how the band differs in the condition; protocol = which way training pushes it.
                                 // The "Start from a client's EEG" lookup matches on this, so get each band's direction right.
  symptoms: ["memory", "cogdecline"], // ids from `symptoms`: biomarker = core symptoms of the studied group; protocol = outcomes measured
  metrics: { design: 5, control: null, blinded: null, n: 977, k: 24 },
                                // design 1-5: 5 meta-analysis, 4 RCT, 3 controlled study/cohort, 2 case-control/narrative review, 1 uncontrolled/pilot
                                // control: "sham" | "active" | "usual" (waitlist/usual care) | "none" | null; n/k: only if verified, else null
  evidence: "strong",            // "strong" | "moderate" | "preliminary" | "contested"
  claim: "One-line finding",
  detail: "Two or three plain sentences on what the study found and its limits.",
  design: "Meta-analysis",
  cite: { authors: "Surname A, Surname B, et al.", year: 2020, title: "Exact paper title", journal: "Journal" }
}
```

Evidence grades:
- **strong**: meta-analysis or several RCTs / large studies pointing the same way
- **moderate**: at least one randomised or controlled trial, or a meta-analysis of mixed-quality studies
- **preliminary**: small, open-label, case-control or single-session studies
- **contested**: blinded, sham-controlled or pooled data that fail to support the effect, or a marker that does not hold up diagnostically

## Rules

- Only add studies that can be cited precisely (authors, year, exact title, journal).
  If unsure of a detail (e.g. exact electrode sites), say so to the user rather than guessing.
- Include null and contradicting results (blinded, sham-controlled, meta-analytic),
  not only positive ones.
- Keep the framing that group-level EEG differences are not diagnostic tests for individuals.
  This is a research reference, not medical advice.
- Keep the app a single static page: no frameworks, build tools or backend unless the owner asks.
- After editing `data/research.js`, check every finding's `condition`, `bands`, `changes` keys
  and `symptoms` match existing ids (open `index.html` and confirm there are no console errors).
