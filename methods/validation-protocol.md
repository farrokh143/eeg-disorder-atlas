# Validation protocol: checking the AI-assisted screening and extraction

Version 1.0, 25 Nov 2026. Fixed before any reviewer sees the sample. Changes after that are listed under "Amendments"
with a date.

## Why

Every screening and extraction decision in the atlas was made by large language models: Claude Haiku following
`RUNBOOK.md`, with Claude Opus writing the rules and auditing. Current guidance on AI in evidence synthesis expects
humans to verify AI decisions before the results are used. That guidance is the RAISE recommendations and the joint
position statement of Cochrane, the Campbell Collaboration, JBI and the Collaboration for Environmental Evidence.
This protocol sets out how that verification is done and how it is reported.

## What is checked

1. **Screening.** Was each paper correctly included or excluded?
2. **Extraction.** For included entries: condition, band and direction of each change, sites (or connectivity
   pairs), sample size and study design.
3. **Recording details** (enrichment pass, RUNBOOK Part 3): eye state, absolute or relative power, and the ICD-11
   group of the sample.

## Reviewers

- **Reference standard: two human reviewers.** They work independently, with a research background in EEG or
  clinical neuroscience. They do not look at the atlas site, `data/research.js` or `data/research-log.csv` while
  reviewing (the repository is public, so blinding depends on reviewers keeping to this). Disagreements are settled
  by discussion; if that fails, a third reviewer decides. The decisions go in `validation/*-adjudicated.csv`. Each
  reviewer records how many minutes each item took.
- **Model second reviewer: Claude Opus.** It works on the same sheets, with the same instructions, without seeing
  the pipeline's decisions. It is reported as a secondary comparison (pipeline vs Opus, Opus vs humans). It does not
  replace the human reference standard.

## Calibration (larger model before each new automated stage)

Before Haiku runs a new stage at scale (the enrichment pass, or screening for the disorders added by the ICD-11
amendment):

1. Draw a calibration set of 20 entries with a fixed seed, stratified by source.
2. Haiku and Opus code it independently.
3. If agreement is at least 85% on every field, the stage goes ahead. Otherwise the runbook is revised and the
   calibration repeated with a new set.

Each calibration is reported with its agreement figures.

For transparency: the stages already completed (screening, full-text review, connectivity pass) had no prospective
calibration. Their rules were developed during the run (runbook v1 to v9), and Opus audited 264 Haiku entries
afterwards, unblinded and not pre-specified. The validation below is the formal check of those stages.

## Sample

`node tools/validation-sample.js` draws the sample (seed 20261125) and writes the blank sheets to `validation/`.

| Part | Stratum | Size | Pool when drawn |
|---|---|---|---|
| Screening | included | 50 | 374 |
| Screening | excluded at title/abstract | 50 | 897 |
| Screening | excluded at full text | 50 | 592 |
| Extraction | band-power entries from full text | 40 | |
| Extraction | connectivity entries from full text | 10 | |
| Extraction | band-power entries from abstracts only | 10 | |

Within each stratum the sample is spread across disorders roughly in proportion to their size. Items are shuffled,
so a reviewer cannot tell a paper's stratum from where it sits in the sheet. Duplicates and papers still parked at
full text are not sampled. The sheets are frozen at the commit that adds this protocol. If the data change later,
the frozen sheets are still the ones used.

## How reviewers fill the sheets

Each reviewer copies the blank sheet to `validation/screening-<name>.csv` and `validation/extraction-<name>.csv`.
Names are `human1`, `human2` and `opus`.

**Screening** (`decision` = `include` or `exclude`). Apply the inclusion criteria in `data/search-protocol.md`:
- humans with a diagnosed disorder, or a symptom related to severity
- resting-state EEG while awake
- reports band power, asymmetry or connectivity with a direction

For an exclusion, give the reason in a few words. Use the full text when the abstract is not enough.

**Extraction**, one column per field:
- `condition`: the atlas condition id
- `bands_and_directions`: e.g. `theta:up alpha:down`
- `sites_or_pairs`: 10-20 labels (old T3/T4/T5/T6 names) separated by spaces, or region pairs such as
  `frontal-parietal`, or empty for whole-head
- `n`: whole study sample analysed (all groups), as in RUNBOOK Part 1
- `design`: 1 to 5, as in `README.md`
- `eyes`, `power` and `icd11`: as in RUNBOOK Part 3

## Measures

Computed by `node tools/validation-stats.js --out methods/validation-results.md`.

- **Screening.**
  - Sensitivity (share of papers that should be included that were) and specificity, with Wilson 95% CIs.
  - Cohen's κ for human 1 vs human 2, pipeline vs the human reference, Opus vs the human reference, and pipeline vs
    Opus.
  - Estimates weighted back to the full log, because strata were sampled at different rates.
- **Extraction.** Exact agreement for each field after normalising case, order and separators: human vs human,
  pipeline vs the human reference, Opus vs the human reference, and pipeline vs Opus.

## Thresholds and actions (fixed in advance)

- **Screening sensitivity at least 90%, with the lower 95% CI bound at least 80%.**
  - If this is not met, Opus re-screens every exclusion in the affected stratum and disorder. A human checks every
    case where Opus and the pipeline disagree.
  - The synthesis is then re-run, and both versions are reported.
- **Extraction agreement at least 85%** for condition, bands and directions, and sites.
  - If this is not met for a field, Opus re-checks that field for every full-text entry. A human checks the
    disagreements.
  - Sample size, design and the recording details are reported, but no threshold is set for them.
- **Every confirmed error in the sample is corrected** in the data through the normal tools (`apply-review.js`,
  `revert-finding.js`, `apply-enrich.js`). The correction is logged as found by validation.

## Effort

Roughly 1–2 minutes per abstract when screening (3–5 hours for 150 records), and 10–15 minutes per entry when
extracting from full text (10–15 hours for 60 entries) per reviewer. To halve the extraction load, the second human
can check a random half of the extraction sheet; κ is then reported on that half.

## Reporting

The manuscript reports:
- the sample design
- reviewer qualifications and blinding
- every measure above with its CI
- the calibration results
- the errors found and the corrections made

It also states that humans remain responsible for the final decisions.

## Amendments

- 25 Nov 2026: the pipeline's answers for the sampled items were frozen in `validation/key-screening.csv` and
  `validation/key-extraction.csv`, built from the data at the sampling commit (`bd13034`) by `tools/validation-key.js`.
  The statistics use these frozen answers, so data corrections made after sampling (including ones prompted by
  the Opus review) cannot improve the measured accuracy. Eye state, power type and ICD-11 group come from the
  enrichment pass and are compared as they stand. Reviewers must not open the key files.
