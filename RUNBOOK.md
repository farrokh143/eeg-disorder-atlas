# Full-text review runbook (for any model, written for Claude Haiku)

This is the step-by-step job for turning the papers marked `full-text` in `data/research-log.csv`
into atlas findings (or exclusions). Follow it exactly. The scripts check your work, so when a script
reports a problem, fix the record it names and run it again.

## The one rule about stopping

**Keep going until the queue is empty.** Do not stop to ask the user questions, to report progress,
or to offer options. After each batch, start the next one straight away.
- If you are unsure about a paper, use `defer` with a note and move on. Never wait for an answer.
- Send at most one short progress line per batch (e.g. "Alzheimer's batch 3 merged: 4 included,
  5 excluded, 1 deferred"), then continue in the same turn.
- Your progress is saved in the log after every batch, so nothing is lost if the conversation is
  compacted or restarted. To resume, just run `node tools/review-queue.js --counts` and carry on.
- Stop only when (a) `review-queue.js --counts` shows nothing waiting (parked papers are not listed), or (b) the same tool fails 3 times in a row. In case (b), post the error on the chat board
  and in your reply, then stop.

## Start of the session (once)

1. Read the Claude Project docs `claude/chat-board.md` and `claude/project-overview.md`.
2. If another chat has claimed `data/research-log.csv` or `data/research.js`, do not start. Tell the user.
3. Add your claim to "Active work" on the board: `| <date> | review chat (Haiku) | Full-text review | data/research-log.csv, data/research.js, reviews/; at the end: project docs |`.
   Re-read the board right before saving it, and save the whole file.
4. In the repo: `git checkout main && git pull`.
5. Run `node tools/review-queue.js --counts`. Work through disorders in this order:
   Alzheimer's, Depression, ADHD, Schizophrenia, Anxiety, Autism, Epilepsy, Parkinson's,
   Alcohol & substance use, PTSD, Brain injury (TBI), Migraine, Insomnia, Unassigned.

## One batch (10 papers): repeat until the queue is empty

1. **Branch:** `git checkout main && git pull && git checkout -b review-<disorder-slug>-<n>`.
2. **Queue:** `node tools/review-queue.js "<Disorder>" 10`. It prints the ids, PMIDs, titles and screening notes.
3. **Metadata:** call `get_article_metadata` with the 10 PMIDs. If the result is saved to a file, run
   `node tools/fulltext-snippets.js <file>`. Note each paper's PMC id (`identifiers.pmc`), if it has one.
4. **Full text:** for papers with a PMC id, call `get_full_text_article` with **2 PMC ids at a time**.
   The result is saved to a file. Run `node tools/fulltext-snippets.js <file>` and read that output.
   Do not try to read the saved file directly; it is too long.
   If the passages don't answer a question (e.g. which electrodes), run it again with a larger limit:
   `node tools/fulltext-snippets.js <file> 15000`.
5. **Decide** each paper with the rules below and write one JSON line per paper to
   `reviews/<disorder-slug>-<n>.jsonl` (use the Write tool).
6. **Check:** `node tools/apply-review.js reviews/<file>.jsonl --check`. Fix every problem it lists and repeat.
7. **Apply:** `node tools/apply-review.js reviews/<file>.jsonl`. It must end with "Validation OK".
8. **Merge:** commit the log, `data/research.js` and the review file. Push, open a PR and merge it:
   ```
   git add -A && git commit -m "Full-text review: <Disorder> batch <n> (<x> included, <y> excluded, <z> deferred)"
   git push -u origin HEAD
   gh api repos/farrokh143/eeg-disorder-atlas/pulls -f title="..." -f head=<branch> -f base=main -f body="..." --jq .number
   gh api -X PUT repos/farrokh143/eeg-disorder-atlas/pulls/<number>/merge -f merge_method=merge
   ```
   End commit messages and PR bodies with the attribution lines your environment gives you.
9. **Every 4 batches**, sync the project (see "Sync" below). Then start the next batch immediately.

## Decisions

Pick exactly one per paper.

### include: the paper gives a resting-state band-power result you can place on the scalp

You need all of these from the paper: **(1)** resting recording (eyes open or closed, awake); **(2)** at least
one band with a direction (higher or lower in the patient group than in controls, or linked to symptom severity);
**(3)** where on the scalp (electrodes or regions), or that it was whole-head/global.

- `source`: `"full-text"` if you read the PMC full text. `"abstract"` is allowed only when the abstract itself states
  the band, the direction and the scalp region. Then `detail` must include the sentence
  "Taken from the abstract; not checked in the full text."
- If the paper mixes resting and task EEG, use the resting results only, and say so in `detail`.
- **Never guess numbers.** `n` = total participants stated in the paper or abstract (add the group sizes up, e.g.
  117 AD + 117 MCI + 138 controls → 372). `k` = studies pooled (meta-analyses only). If not stated, `null`.
- **Source-localised results** (LORETA, eLORETA, sLORETA, beamformer): include them when the result is given by lobe
  or scalp region (frontal, central, temporal, parietal, occipital). Map the lobe with the region table under
  "Field rules", and add to `detail`: "Source-localised (<method>); mapped to the overlying scalp region."
  If the result is only for deep structures (cingulate, hippocampus, insula, precuneus, thalamus) with no lobe,
  exclude with `SOURCE`.
- **Mixed groups** (e.g. AD plus another dementia, or ADHD plus autism): include only a result reported separately for
  the atlas condition against controls. If there is none, exclude with `X` and `"reason":"No separate result for <condition>"`.
- The region table under "Field rules" applies to abstracts as well as full texts.
- **Comparisons inside a patient group** (e.g. patients with vs without a symptom, or resting EEG correlated with a
  symptom score) count, with no healthy control needed, when the symptom maps to one of the symptom ids below. Use that
  symptom id and say "within <condition>" in the claim. If the symptom has no matching id (e.g. suicidality), exclude
  with `X` and `"reason":"Within-group comparison on a symptom the atlas does not track"`.
- **Sleep:** `SL` is only for results taken from sleep recordings. Waking resting EEG in people with sleep problems
  (or recorded before or after sleep) qualifies like any other resting result.
- Null results count: if a well-designed study found **no** difference, still include it, with `evidence: "contested"`
  and the bands it tested marked `"mixed"`; say "no difference" in the claim.

```json
{"id":"pm-12345","decision":"include","source":"full-text","condition":"alzheimers","type":"biomarker","sites":["P3","Pz","P4","O1","O2"],"changes":{"alpha":"down","theta":"up"},"symptoms":["memory","cogdecline"],"design_level":2,"control":null,"blinded":null,"n":80,"k":null,"evidence":"preliminary","claim":"Mild AD: less posterior alpha, more theta than controls","detail":"40 people with mild Alzheimer's vs 40 controls, eyes-closed resting EEG. Alpha power was lower and theta higher over parietal and occipital sites. Single case-control study.","design":"Case-control"}
```
If the log row has no title, authors, year or journal, add
`"cite":{"authors":"Surname AB, et al.","year":2020,"title":"Exact title","journal":"Journal abbreviation"}` from the metadata.

### exclude: the full text shows it does not qualify

`{"id":"pm-12345","decision":"exclude","code":"NODATA","note":"only reports classifier accuracy"}`

| code | use when |
|---|---|
| T | task, photic, evoked or event-related recording only |
| CN | only connectivity, coherence, network, microstate, complexity or classifier results |
| NR | drug, stimulation, surgery, psychotherapy or training effect; treatment-response prediction (neurofeedback studies are NOT NR: include them as `protocol`) |
| OT | off topic |
| HI | healthy people only, no disorder or symptom measure |
| MEG / IMG / INV | MEG / imaging / intracranial recording |
| MOD | animal, model or methods paper |
| SL | sleep EEG only |
| RT | retracted |
| NODATA | full text read, but no resting band-power result with a direction |
| SOURCE | only source-space regions (LORETA etc.) that cannot be mapped to 10-20 sites |
| NONBAND | the only result is a measure that isn't band power: aperiodic exponent, beta bursts or events, synchronisation index, entropy |
| REVIEW | a review or narrative paper, not a meta-analysis (meta-analyses with pooled results are included) |
| X | anything else; add `"reason":"..."` |

### defer: you cannot decide from what is available

The note must start with one of these tags:

| note starts with | use when | what happens |
|---|---|---|
| `[parked: no full text]` | no PMC full text, and the abstract does not give band + direction + region | stays `full-text`, hidden from the queue until someone with library access reviews it |
| `[parked: non-atlas condition <name>]` | the paper is about a condition that is not one of the 14 (OCD, bipolar, Lewy body dementia, Down syndrome, visual snow, REM sleep behaviour disorder, fragile X, etc.) | stays `full-text`, hidden until the owner decides about new conditions |
| `[retry]` | anything else you are unsure about | stays in the queue, listed last; on the next pass you must include or exclude it (no second `[retry]`) |

`{"id":"pm-12345","decision":"defer","note":"[parked: no full text] abstract gives no sites"}`

### pass: only for the 9 hand-picked `cand-*` rows that are still `to-review`

`{"id":"cand-xyz","decision":"pass","note":"resting EEG, worth full-text review"}`, then review it in a later batch.
These rows have no PMID. Find it with `lookup_article_by_citation` or `search_articles` using the title (and first
author/year from the log), then fetch metadata and full text as usual. If you can't find the paper, defer with
`[parked: no full text] PMID not found`.

## Field rules

**condition** (from the log `disorder`): Alzheimer's → `alzheimers` (also MCI); ADHD → `adhd`; Schizophrenia → `schizophrenia`;
Depression → `depression` (bipolar: defer); Parkinson's → `parkinsons`; Brain injury (TBI) → `tbi`; Insomnia → `insomnia`;
Autism → `autism`; Alcohol & substance use → `sud`; Epilepsy → `epilepsy`; PTSD → `ptsd`; Anxiety → `anxiety` (OCD: defer);
Migraine → `migraine`; healthy-people neurofeedback → `cognition`. A paper listed under two disorders: use the one its
main result is about.

**type**: `biomarker` for a group difference or symptom correlation; `protocol` for a neurofeedback treatment study.

**changes** (one entry per band): biomarker values `up`, `down`, `asymmetry` (left vs right difference), `mixed`
(different directions at different sites, or no difference); protocol also allows `regulate`.
Band ids: `delta` 1–4 Hz, `theta` 4–8, `alpha` 8–12 (alpha1/alpha2/mu → alpha), `smr` 12–15,
`beta` 15–20 (beta1 → beta), `hibeta` 20–30 (beta2/beta3 → hibeta), `gamma` 30+, `scp` slow cortical potentials.
A theta/beta ratio that is higher → `{"theta":"up","beta":"down"}` and say "ratio" in the claim.

**sites**: only these labels: `Fp1 Fp2 F7 F3 Fz F4 F8 T3 C3 Cz C4 T4 T5 P3 Pz P4 T6 O1 O2`.
Midline labels not in the list: Fpz → `Fp1 Fp2`, Oz → `O1 O2`, FCz → `Fz Cz`, CPz → `Cz Pz`. Convert new names: T7→T3, T8→T4, P7→T5, P8→T6. Regions:
frontal = `Fp1 Fp2 F7 F3 Fz F4 F8`; central = `C3 Cz C4`; temporal = `T3 T4 T5 T6`; parietal = `P3 Pz P4`;
occipital = `O1 O2`; posterior = `P3 Pz P4 T5 T6 O1 O2`; left/right = keep that side only (odd = left, even = right);
whole-head, global or "widespread" = `[]`. Electrodes not in the list (e.g. FC3, AF4): use the nearest listed one.

**symptoms** (ids): inattention impulsivity hyperactivity executive memory cogdecline lowmood anxiety hyperarousal
intrusions sleep psychosis social craving seizures headache postconcussion motor.
Use the symptoms the study measured; if none, use the condition's core ones: alzheimers `memory cogdecline`; adhd
`inattention impulsivity hyperactivity`; schizophrenia `psychosis`; depression `lowmood`; parkinsons `motor`; tbi
`postconcussion`; insomnia `sleep`; autism `social`; sud `craving`; epilepsy `seizures`; ptsd `intrusions hyperarousal`;
anxiety `anxiety`; migraine `headache`; cognition `executive memory`.

**design_level**: 5 meta-analysis; 4 randomised controlled trial; 3 controlled study or cohort/longitudinal;
2 case-control (patients vs controls, one time point) or cross-sectional correlation; 1 uncontrolled, pilot, case series.
**control** (treatment studies): `sham`, `active`, `usual` (waitlist/usual care), `none` (only when the paper says there was no control group); if the control arm isn't described, `null`. Biomarker studies: always `null`.
**blinded**: `true`/`false` only if the paper says; else `null`.

**evidence**: `strong` = meta-analysis with a consistent result; `moderate` = RCT, controlled or cohort study, or a
meta-analysis with mixed results; `preliminary` = case-control, small, pilot or single-session studies;
`contested` = null result or failed replication. The apply script blocks grades that don't fit the design.

**claim**: one line, max 120 characters, plain words, starts with the group ("Mild AD: ...").
**detail**: two or three plain sentences: who was studied, what was found, the main limit.
**design**: short text, e.g. "Case-control", "Meta-analysis", "RCT (sham-controlled)".

## Sync (every 4 batches, and at the very end)

If you have no Projects tool (for example when you run as a sub-agent), skip this section and say so in your final
reply; the chat that started you does the sync.

1. `node tools/findings-snapshot.js > atlas-findings.md` and `node tools/log-summary.js > research-log-summary.md`
   (in the repo folder; don't commit these two files, delete them after uploading).
2. Upload to the Claude Project with `project_write` + `local_path`: `claude/atlas-findings.md`, `claude/research-log-summary.md`.
   If a write is refused, `project_read` that doc first, then write again.
3. Re-read `claude/project-overview.md`, update "Current status" counts, and add one Changelog line
   ("Full-text review: <disorders>, <x> included, <y> excluded, <z> deferred (PRs #a–#b)"). Save the whole file.
4. At the very end only: remove your claim from `claude/chat-board.md` and post one "Done" line with the totals and
   what's left (deferred papers). Then tell the user what changed and list any part you could not update.

## Things to never do

- Never invent a number, electrode or citation detail. If it's not in the paper, use `null`, `[]` or `defer`.
- Never edit `data/research.js` or `data/research-log.csv` by hand: always go through `tools/apply-review.js`.
- Never include task, evoked or sleep EEG results.
- Never change `index.html` or `methods.html` during review.
