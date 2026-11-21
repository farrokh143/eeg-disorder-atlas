# Research collection protocol

How studies are found, screened and recorded for the EEG Disorder Atlas. The goal: link resting-state EEG patterns to disorders and symptoms, with a confidence rating for each link. The public version of this method is `methods.html`. The aim is a
living systematic review: the same searches, run on a schedule, with every decision logged.

## Where the data lives (all in this repository)

| File | What it holds |
| --- | --- |
| `data/research-log.csv` | Every paper considered, one row each, with its status and reason. The master record. |
| `data/research.js` | The approved studies the website shows, with full detail (sites, band directions, symptoms, metrics). |
| `data/search-protocol.md` | This file: the rules and the exact searches. |
| GitHub Issues | Feedback on the site and suggested studies, via the issue forms. |

Every change is a commit, so the history of each decision is kept.

## Status values in `research-log.csv`

- `to-review`: found by a search, not yet screened
- `included`: meets the criteria and is in `research.js`
- `excluded`: screened out; `reason` says why

## Inclusion criteria

**EEG markers**
- Human participants with a disorder or symptom, compared with controls or related to symptom severity
- **Resting-state EEG only** (eyes open or eyes closed, awake). Simple EEG (one or a few channels) is fine.
- Reports the band, the direction of change and the scalp sites (or says the result is whole-head)
- Excluded: task-based, event-related / evoked (e.g. ASSR, ERP) and sleep EEG; case reports; animal studies

**Treatment studies**
- Neurofeedback or other EEG feedback training in humans, with a stated protocol (band, direction, sites)
- Any design, but the design, control type and blinding are recorded so the confidence rating can account for them

**Priority**: studies that relate resting EEG directly to symptom severity (correlations with rating scales).
These give direct symptom links, which the atlas currently lacks.

## Searches (PubMed; repeat in Scopus or PsycINFO when available)

Run for each disorder, replacing `[DISORDER]` with its MeSH term (e.g. `"Attention Deficit Disorder with Hyperactivity"[MeSH]`).

EEG markers:
```
("Electroencephalography"[MeSH] OR qEEG OR "quantitative EEG") AND ("resting state" OR "eyes closed" OR "eyes open" OR resting)
AND (power OR spectral OR "theta/beta" OR asymmetry) AND [DISORDER]
NOT (sleep[ti] OR polysomnograph* OR "event-related" OR ERP OR "steady-state")
```

Direct symptom links:
```
("Electroencephalography"[MeSH] OR qEEG) AND resting AND (power OR spectral)
AND (correlat* OR severity OR "symptom dimension*") AND [DISORDER OR SYMPTOM]
```

Treatment:
```
("Neurofeedback"[MeSH] OR neurofeedback OR "EEG biofeedback") AND [DISORDER]
```

Also screen the reference lists of every meta-analysis already in the atlas.

## Screening steps

1. Add new search hits to `research-log.csv` as `to-review` (title, authors, year, journal, link).
2. Screen title and abstract; mark clear misses `excluded` with a reason.
3. Read the full text of the rest. Extract band, direction, sites, symptoms, design, control, blinding, n, k.
4. Mark `included` and add the entry to `research.js` (schema in README.md), or `excluded` with a reason.
5. Never record a sample size, effect size or electrode site that has not been checked in the paper.

## Schedule

Re-run the searches monthly. Record each run below.

| Date | Searches run | New hits | Included | Excluded | By |
| --- | --- | --- | --- | --- | --- |
| 2026-11-21 | Seed set (manual, verified citations) | 47 | 44 | 3 | Claude, reviewed by owner |
| 2026-11-21 | Run 1: web search for gap disorders (schizophrenia, PTSD, anxiety, depression, ADHD symptom links, autism, migraine, epilepsy, Parkinson's) | 15 | 2 | 0 | Claude; 13 left as to-review |
