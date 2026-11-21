# EEG Disorder Atlas

A clickable International 10-20 electrode map showing how EEG rhythms differ across
disorders (EEG markers), plus neurofeedback treatment studies, with the
evidence behind each finding.

- Pick a **condition** (Alzheimer's, schizophrenia, ADHD, depression, TBI, ...).
- Electrodes with research light up; ring colours show the **EEG bands** studied there.
- Click an **electrode** to list only the studies at that site; filter by band,
  evidence grade, or free-text search.
- Each finding shows evidence grade, study design, per-band direction (e.g. theta ↑, beta ↓),
  the symptoms studied or measured, full citation and a PubMed search link.
- Findings are split into **EEG markers** (how the EEG differs in a condition) and
  **treatment evidence** (neurofeedback studies and how they held up).
- **Start from a client's EEG**: pick sites (or a region), a band and elevated/reduced,
  plus the client's symptoms. The atlas lists conditions where that pattern has been
  reported (ranked by symptom overlap) and treatment studies that train against it.
  The view is saved in the URL (e.g. `#p/theta/up/F3.Fz.F4/inattention`) so it can be shared.

## Run

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Adding research

All content lives in [`data/research.js`](data/research.js). Add an entry to `findings`:

```js
{
  id: "unique-id",
  condition: "adhd",            // id from `conditions`
  type: "protocol",             // "protocol" (NF training) | "biomarker" (EEG difference)
  sites: ["Cz"],                // 10-20 labels (T3/T4/T5/T6 naming); [] = individualised
  bands: ["theta", "beta"],     // ids from `bands`
  direction: "ratio",           // "up" | "down" | "ratio" | "asymmetry" (summary only)
  changes: { theta: "down", beta: "up" }, // per band: "up" | "down" | "asymmetry" | "regulate" | "mixed"
                                // marker = how it differs in the condition; protocol = which way training pushes it
  symptoms: ["inattention"],    // ids from `symptoms`: marker = core symptoms of the group; protocol = outcomes measured
  evidence: "moderate",         // "strong" | "moderate" | "preliminary" | "contested"
  claim: "One-line finding",
  detail: "Two or three sentences on what the study found.",
  design: "RCT",
  cite: { authors: "Surname A, ...", year: 2020, title: "...", journal: "..." }
}
```

### Evidence grades

| Grade | Meaning |
| --- | --- |
| Strong | Meta-analysis or several RCTs pointing the same way |
| Moderate | At least one randomised/controlled trial, or a meta-analysis of mixed-quality studies |
| Preliminary | Small, open-label, case-control or single-session studies |
| Contested | Blinded, sham-controlled or pooled data that fail to support the effect |

## Using with a Claude Project

Create a project on claude.ai, paste [`CLAUDE.md`](CLAUDE.md) into its
instructions, and add this repository (or upload `index.html`,
`data/research.js` and `README.md`) as project files.

## Disclaimer

The seed dataset was compiled from the published literature with AI assistance.
Verify every citation and summary against the original paper before relying on it.
This is a research reference, not medical advice.
