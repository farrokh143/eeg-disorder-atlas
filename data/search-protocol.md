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
- `full-text`: passed title/abstract screening; waiting for full-text review (sites, directions, n, k)
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
| 2026-11-21 | Run 2: PubMed (connector), core query v1 + v2 supplement, 13 disorders | 2,271 records / 2,110 unique (2,104 new) | 0 | 0 | Claude; all to-review, not yet screened |

### Run 2 notes

- **Benchmark check:** query v1 found 4 of 6 benchmark papers and missed 2 (Pediatr Neurol 2005 ADHD theta, PMID 15797181; eNeuro 2020 PTSD alpha, PMID 32690671), because their abstracts say "theta activity" / "α oscillations" rather than "power". Query v2 adds `electroencephalogram`, the band names and `oscillations`; with v2 all 6 were found (also 12559224, 38097538, 39261817, 25936227).
- **How v2 was run:** the PubMed connector allows at most 20 boolean operators and 200 results per call, so v2 was run as v1 plus two supplements: (a) papers matching band names / "oscillations" but none of power/spectral/spectrum/asymmetry, and (b) papers saying "electroencephalogram" but not "EEG", with spectral terms. PTSD was pulled with the full v2 query directly.
- **Per disorder (records):** Alzheimer's/MCI 466, Depression 351, Schizophrenia 270, ADHD 237, Epilepsy 224, Autism 170, Parkinson's 161, Alcohol & substance use 129, Anxiety 120, PTSD 48, Brain injury 36, Insomnia 31, Migraine 28, unassigned catch-up 3.
- **Next:** title/abstract screening in batches (fetch metadata for 25–50 PMIDs at a time), then full text.


### Screening round 1 (21 Nov 2026): anxiety, PTSD, epilepsy

384 unique papers screened on title and abstract (PubMed connector; titles, years and journals now filled in the log).
Result: 122 `full-text` (including OCD resting-EEG studies, a condition not yet in the atlas, and systematic reviews kept for citation chasing), 262 `excluded` with a reason.
Rules applied: resting awake scalp EEG only; connectivity, network or microstate-only papers were excluded as "outside atlas schema" (the atlas records band power direction and site) and can be reconsidered if the schema grows; drug, stimulation, surgery and psychotherapy effect studies were excluded unless neurofeedback; MEG, imaging and intracranial recordings were excluded.
Epilepsy gave the fewest survivors (most hits were intracranial, imaging, connectivity or drug studies). Decisions were made from titles and abstracts by one reviewer (Claude); a second human check of the exclusions is still to do.


### Screening round 2 (21 Nov 2026): depression and ADHD

545 papers screened on title and abstract (depression 317, ADHD 229; some overlap). Same rules as round 1, plus: studies whose only question is whether baseline EEG predicts response to a drug or stimulation treatment were excluded as treatment-response prediction (not a disorder marker). Duplicates of hand-picked or included studies (found by title) were excluded as "Duplicate of <id>" and the hand-picked row moved on. Reviews and commentaries are kept at `full-text` for citation chasing. Decided from titles and abstracts by one reviewer (Claude); human second check still to do.

### Screening round 3 (21 Nov 2026): schizophrenia and Alzheimer's disease

690 papers screened on title and abstract (schizophrenia 248, Alzheimer's/dementia/MCI 449; some overlap): 305 passed to `full-text`, 385 excluded. Same rules as rounds 1 and 2. Of the exclusions, 194 were connectivity, network, microstate or ML-classifier studies outside the atlas schema, 78 were treatment or intervention studies, 39 were task or evoked EEG, and 28 were MEG. Papers that mix resting and task or photic conditions were kept with a note to use the resting results only. Survivors include studies of Lewy body dementia, Parkinson disease with cognitive impairment, Down syndrome and Creutzfeldt-Jakob disease, which are outside the 14 atlas conditions. Decided from titles and abstracts by one reviewer (Claude); human second check still to do.

## Bulk pull (PubMed)

The searches below use the core query (EEG terms AND resting-state terms AND spectral terms AND humans)
plus each disorder's MeSH term. They are generated from `tools/queries.js`, so edit the query there.

**Option A (automatic):** use the PubMed connector in a Claude chat (import its ID lists with `node tools/import-pmids.js ids.txt "<Disorder>" "<Run>"`), or run `node tools/pull-pubmed.js "Run 2 (PubMed)"` where the network allows eutils.ncbi.nlm.nih.gov (`--counts` shows hit numbers only).

**Option B (manual export):** open a link, tap **Save**, choose **Selection: All results** and **Format: CSV**,
then give the file to Claude or run:

```
node tools/import-pubmed.js export.csv "ADHD" "Run 2 (PubMed)"
```

The importer adds new papers to `research-log.csv` as `to-review`, skips anything already logged
(by PubMed ID or title), and flags titles that look out of scope (sleep, task/evoked, MEG only,
animal, case report, stimulation) for a person to confirm. Nothing is excluded automatically.

| Disorder | PubMed search |
| --- | --- |
| ADHD | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Attention%20Deficit%20Disorder%20with%20Hyperactivity%22%5Bmh%5D&size=200) |
| Alzheimer's | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20(%22Alzheimer%20Disease%22%5Bmh%5D%20OR%20%22Cognitive%20Dysfunction%22%5Bmh%5D)&size=200) |
| Schizophrenia | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20schizophrenia%5Bmh%5D&size=200) |
| Depression | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Depressive%20Disorder%22%5Bmh%5D&size=200) |
| Parkinson's | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Parkinson%20Disease%22%5Bmh%5D&size=200) |
| Brain injury (TBI) | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20(%22Brain%20Injuries%2C%20Traumatic%22%5Bmh%5D%20OR%20%22Post-Concussion%20Syndrome%22%5Bmh%5D)&size=200) |
| Insomnia | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Sleep%20Initiation%20and%20Maintenance%20Disorders%22%5Bmh%5D&size=200) |
| Autism | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Autism%20Spectrum%20Disorder%22%5Bmh%5D&size=200) |
| Alcohol & substance use | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Substance-Related%20Disorders%22%5Bmh%5D&size=200) |
| Epilepsy | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20epilepsy%5Bmh%5D&size=200) |
| PTSD | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Stress%20Disorders%2C%20Post-Traumatic%22%5Bmh%5D&size=200) |
| Anxiety | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Anxiety%20Disorders%22%5Bmh%5D&size=200) |
| Migraine | [Open search](https://pubmed.ncbi.nlm.nih.gov/?term=(electroencephalography%5Bmh%5D%20OR%20EEG%5Btiab%5D%20OR%20qEEG%5Btiab%5D%20OR%20electroencephalogram%5Btiab%5D)%20AND%20(resting%5Btiab%5D%20OR%20%22eyes%20closed%22%5Btiab%5D%20OR%20%22eyes%20open%22%5Btiab%5D)%20AND%20(power%5Btiab%5D%20OR%20spectral%5Btiab%5D%20OR%20spectrum%5Btiab%5D%20OR%20asymmetry%5Btiab%5D%20OR%20theta%5Btiab%5D%20OR%20alpha%5Btiab%5D%20OR%20delta%5Btiab%5D%20OR%20beta%5Btiab%5D%20OR%20gamma%5Btiab%5D%20OR%20oscillations%5Btiab%5D)%20AND%20humans%5Bmh%5D%20AND%20%22Migraine%20Disorders%22%5Bmh%5D&size=200) |