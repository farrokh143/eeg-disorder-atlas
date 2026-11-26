# Manuscript

Working draft of the methods and resource paper describing the Neurofeedback Atlas.

**Status (26 November 2026): not yet ready to submit.** Counts match `main` as of 25–26 November 2026
(2,409 records; 418 included; 512 patterns, 13 testable, none passing the Benjamini–Yekutieli correction).
The checklist at the end of `manuscript.md` lists what is left. The main gaps are:

1. Human validation (`methods/validation-protocol.md`): two reviewers fill the sheets in `validation/`.
   Until then, Table 5 compares two models only and is not validation.
2. OSF registration of the synthesis protocol and the ICD-11 amendment.
3. Statistician review of the protocol.
4. Full texts for the abstract-only entries and the 312 parked papers.

Target journal: *Research Synthesis Methods* (Cambridge; fully open access; APC waiver available for authors
without funding).

## Files

| File | What it is |
| --- | --- |
| `manuscript.md` | Full text, exported from the working Claude doc |
| `manuscript.docx` | The same text as a Word file (figures not embedded; use the PNGs) |
| `figure-1-workflow.png` | Figure 1: workflow, 9 stages and their status |
| `figure-2-study-flow.png` | Figure 2: study flow (PRISMA-style; redraw in the PRISMA 2020 template for submission) |

## How it is kept up to date

The editable source is a Claude doc in the "EEG Disorder Atlas" project
(https://claude.ai/artifact/1XuhgbyEfQ4shgNzfJRCvm). After the data or synthesis change, update the doc
from `methods/synthesis-results.md`, `methods/validation-results.md` and `node tools/log-summary.js`, then
re-export it here through a pull request. Never type a number into the manuscript that is not in one of
those outputs.
