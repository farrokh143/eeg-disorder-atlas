# EEG Disorder Atlas — project instructions

Use this file as the instructions for a Claude Project (claude.ai → Projects →
instructions) or for Claude Code working in this repository.

## Goal

Let people link a resting-state EEG pattern (band, direction, scalp site) to the disorders and
symptoms it has been reported in, with a stated confidence for each link. Neurofeedback treatment
studies are a secondary layer. The full method is published in `methods.html`.

## What this is

A clickable International 10-20 electrode map that links disorders to the EEG
bands and scalp sites where differences have been reported, with graded
research evidence for each finding. Neurofeedback treatment studies are
included as a secondary filter; EEG markers are the main focus.

- `index.html`: the entire app. One static page, vanilla JS, no build step, no backend.
- `data/research.js`: all content, as `window.NF_DATA` (bands, conditions, symptoms, findings, methodology, excluded).
- `README.md`: how to run it and the schema for findings.
- `data/research-log.csv`: master log of every paper considered (included / excluded / to-review, with reasons).
- `data/search-protocol.md`: inclusion criteria, exact searches and the record of each search run.
- `tools/findings-snapshot.js`: writes the readable findings table used in the Claude Project.
- `tools/queries.js`: the PubMed searches for each disorder (single source for bulk pulls).
- `tools/import-pubmed.js`: imports a PubMed CSV export into the research log as `to-review`, skipping duplicates.

GitHub is the database: all research data and decisions live in these files and their commit history.

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
                                 // The direction filter and map lookup match on this, so get each band's direction right.
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

- **Keep GitHub and the Claude Project in sync (every development chat).** Before ending any chat or
  session that changes the atlas (data, site, rules or decisions):
  1. Commit the change on a branch, open a pull request and merge it to `main` (GitHub Pages publishes `main`).
  2. Update the Claude Project "EEG Disorder Atlas" documents so they match `main`:
     - `project-overview.md`: "Last updated" date, Current status counts, Key decisions, Open tasks, and one new Changelog line
     - `atlas-findings.md`: regenerate with `node tools/findings-snapshot.js`
     - `research-log.csv` and `search-protocol.md`: copy from `data/`
     - `project-instructions.md`: copy of this file, if it changed
  3. Tell the user what changed. If GitHub or the project cannot be updated from that chat, say which
     part was not updated so it can be done next time.

- **Log every paper.** Any paper added, excluded or queued must have a row in `data/research-log.csv`
  (same `id` as in `research.js`). Follow `data/search-protocol.md` for searches and screening, and
  record each search run in its table.

- **Resting-state only for EEG markers.** Biomarker entries must come from resting recordings
  (eyes open or eyes closed, awake). Do not add task-based, event-related/evoked (e.g. ASSR, ERP)
  or sleep EEG findings. If a paper mixes conditions, include only its resting results and say so
  in `detail`. Log anything left out in `excluded` with the reason.

- Only add studies that can be cited precisely (authors, year, exact title, journal).
  If unsure of a detail (e.g. exact electrode sites), say so to the user rather than guessing.
- Include null and contradicting results (blinded, sham-controlled, meta-analytic),
  not only positive ones.
- Keep the framing that group-level EEG differences are not diagnostic tests for individuals.
  This is a research reference, not medical advice.
- Keep the app a single static page: no frameworks, build tools or backend unless the owner asks.
- After editing `data/research.js`, check every finding's `condition`, `bands`, `changes` keys
  and `symptoms` match existing ids (open `index.html` and confirm there are no console errors).
