# Neurofeedback Evidence Map

A clickable International 10-20 electrode map linking clinical conditions to the
EEG bands and training sites studied in the neurofeedback literature, with the
evidence behind each finding.

- Pick a **condition** (ADHD, depression, PTSD, insomnia, epilepsy, ...).
- Electrodes with research light up; ring colours show the **EEG bands** studied there.
- Click an **electrode** to list only the studies at that site; filter by band,
  evidence grade, or free-text search.
- Each finding shows evidence grade, study design, direction (↑ ↓ ratio, asymmetry),
  full citation and a PubMed search link.

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
  direction: "ratio",           // "up" | "down" | "ratio" | "asymmetry"
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

## Disclaimer

The seed dataset was compiled from the published literature with AI assistance.
Verify every citation and summary against the original paper before relying on it.
This is a research reference, not medical advice.
