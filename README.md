# EEG Disorder Atlas

A clickable International 10-20 electrode map showing how EEG rhythms differ across
disorders (EEG markers), plus neurofeedback treatment studies, with the
evidence behind each finding.

- Tap **electrodes** (or a region: frontal, central, ...) on the 10-20 map to pick an area.
- Narrow with dropdowns: **disorder**, **band**, **direction** (elevated / reduced / asymmetry)
  and **symptom**, or free-text search.
- Electrodes with research light up; ring colours show the EEG bands studied there.
- **Neighbouring electrodes** (dashed) are included by default, because scalp electrodes pick up
  activity from adjacent cortex (volume conduction). Each card says whether the finding is at a
  selected site, a neighbouring site, or whole-head.
- **Direction profile**: for the selected area, chips summarise what the marker studies report
  (e.g. Theta ↑ 10, Delta ↓ 1). Tap one to look it up.
- **Confidence ratings**: each group of studies gets High / Moderate / Low / Very low, using a
  simplified GRADE approach (best supporting design, rated down for conflicting results or a single
  primary study; treatments with no supportive blinded/sham-controlled study are capped at Low).
  Each card shows design strength (1–5), type of control and sample size where recorded.
- Built phone-first: large tap targets, swipeable chip rows, and a floating results button.
- Each finding shows evidence grade, study design, per-band direction (e.g. theta ↑, beta ↓),
  the symptoms studied or measured, full citation and a PubMed search link.
- Findings are split into **EEG markers** (how the EEG differs in a condition) and
  **treatment evidence** (neurofeedback studies and how they held up).
- With a direction chosen (e.g. elevated theta), markers show disorders where that change was
  reported, and treatment evidence shows studies that train the band the other way.

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
  metrics: { design: 5, control: null, blinded: null, n: 977, k: 24 },
                                // design 1-5: 5 meta-analysis, 4 RCT, 3 controlled study/cohort, 2 case-control/narrative review, 1 uncontrolled/pilot
                                // control: "sham" | "active" | "usual" (waitlist/usual care) | "none" | null; n/k: only if verified, else null
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
