# Evidence synthesis protocol: resting-state EEG power and connectivity across disorders

Version 1.0 (22 November 2026). Status: protocol written before the synthesis was first run on connectivity data.
Every later change is listed under "Amendments" with its date and reason. GitHub history is the audit trail.

## 1. Question and unit of synthesis

**Question.** For a given disorder, is a resting-state EEG feature (band power at a scalp region, or functional
connectivity between two regions, in one frequency band) consistently higher or lower than in comparison groups?

**Unit of synthesis (a "pattern").** One pattern is the combination of:

| element | values |
|---|---|
| condition | one of the atlas conditions (`data/research.js` → `conditions`) |
| feature type | `power` or `connectivity` |
| band | one band id (delta, theta, alpha, smr, beta, hibeta, gamma) |
| location | power: one of 5 scalp regions (frontal, central, temporal, parietal, occipital); connectivity: one unordered region pair (15 pairs including within-region) |
| connectivity measure family | coherence; phase synchrony (PLI, wPLI, PLV); amplitude-envelope correlation; other undirected. Families are synthesised separately (§6) |

Regions are fixed groups of 10-20 electrodes: frontal Fp1 Fp2 F7 F3 Fz F4 F8; central C3 Cz C4; temporal T3 T4 T5 T6;
parietal P3 Pz P4; occipital O1 O2. A study contributes to a region when any reported site falls in it.
Whole-head ("global") results contribute to every region and are flagged so they can be removed in sensitivity
analysis S4.

Neurofeedback treatment studies answer a different question (does training change symptoms) and are **not** part of
this synthesis; they remain listed in the atlas with their own design-based grades.

## 2. Eligible evidence

- Primary studies already included in the atlas through the screening and review process in `data/search-protocol.md`
  and `RUNBOOK.md` (human participants, awake resting EEG, comparison with controls or with symptom severity).
- **Only results checked in the full text enter the synthesis.** Entries hand-curated before the review process (source
  `curated`, 46 entries with verified citations) count as full-text checked. Entries taken from the abstract alone are shown in the
  atlas but excluded from all pooled results (owner decision, 22 Nov 2026); sensitivity analysis S1 reports what changes
  if they are added.
- Meta-analyses and systematic reviews are **not pooled** with primary studies, because that would count the same
  participants twice. They are shown beside the pattern as external corroboration and are used in the GRADE
  inconsistency judgement (§5).
- Connectivity: undirected measures between named sites or regions only. Graph-theory metrics, microstates, directed
  measures (Granger, DTF, PDC) and classifier outputs are out of scope because they cannot be placed on a site pair or
  pooled across thresholds.

## 3. Independence

Statistical tests assume each vote is independent. Before synthesis:

1. **One vote per sample per pattern.** Papers reporting on the same participants (same cohort, same public dataset,
   re-analyses, conference versions) share a `sample` key; within a pattern they contribute one vote. The vote is taken
   from the largest report; if two reports of one sample disagree in direction, the vote is "unclear".
2. **One vote per study per pattern.** A study reporting several electrodes, sub-bands (e.g. alpha1, alpha2) or eyes
   conditions within one pattern contributes one vote: its direction if all reported effects agree, otherwise "unclear".
   Eyes-closed results take priority over eyes-open when both are reported and disagree.
3. **Detecting shared samples.** Reports with the same first author, condition and total n are treated as one sample
   unless the full text shows otherwise. Research groups that run long series on one database (e.g. several papers by
   the same first author on one condition) may overlap without saying so; sensitivity analysis S7 keeps one vote per
   first author per condition to show whether conclusions depend on this.
4. Each study's own comparison groups are used as reported; studies with several patient subgroups contribute one vote
   per pattern, based on the full patient group versus controls.

## 4. Statistical synthesis (per pattern)

The standardised metric is **effect direction**: each study's vote is *higher*, *lower* or *unclear* (no difference, or
mixed directions within the pattern). This follows Cochrane Handbook chapter 12, which rejects vote counting by
statistical significance and recommends vote counting by direction of effect with a sign test; results are reported
following the SWiM guideline (Synthesis Without Meta-analysis).

For each pattern, with *k* independent studies of which *h* show higher, *l* lower and *u* unclear (h + l + u = k):

1. **Proportion in the majority direction** among studies with a clear direction: p̂ = max(h, l) / (h + l), with a
   **Wilson score 95% confidence interval**.
2. **Primary test: exact two-sided sign (binomial) test** of H₀: π = 0.5 on h and l. Unclear votes are excluded from the
   test, as the Handbook specifies, but are always reported and feed the inconsistency judgement (§5) so that studies
   finding no difference are not hidden.
3. **Sample-size-weighted test (secondary).** Larger studies estimate direction more reliably. The weighted statistic is
   S = Σ wᵢ sᵢ with sᵢ = +1 (higher) or −1 (lower) and wᵢ = √nᵢ (total participants of study *i*). Under H₀ every sign is
   equally likely to be + or −, so the exact null distribution is obtained by enumerating all sign flips (k ≤ 20) or by
   100,000 Monte Carlo sign flips (k > 20); the two-sided p is the share of flips with |S*| ≥ |S|. Studies with unknown
   n are given the median n of the pattern and flagged. The weighted share Σ wᵢ[sᵢ=majority] / Σ wᵢ is reported beside p̂.
4. **Minimum evidence.** With fewer than 6 studies with a clear direction a two-sided sign test cannot reach p < 0.05
   (5 of 5 gives p = 0.0625). Such patterns are reported descriptively and labelled "too few studies"; they are not
   tested and so are not part of the multiplicity family.
5. **Multiplicity.** The family of tests is all testable patterns (≥ 6 clear-direction studies) in one run. Patterns share studies, so tests are not independent. q-values are computed with the
   **Benjamini–Yekutieli** procedure, which controls the false discovery rate under any dependence; Benjamini–Hochberg
   q-values are reported as a sensitivity analysis. A pattern is called a **consistent difference** when q_BY < 0.05.

What the test does and does not say: rejecting H₀ shows that study directions are not balanced. It does not estimate
the size of the difference, and it assumes the direction probability is the same in every study under H₀ only (the
known limitation of using the sign test for estimation). Effect sizes are added in a second tier when enough full texts
report them (§8).

## 5. Certainty of evidence (GRADE)

Each pattern gets a certainty rating of High, Moderate, Low or Very low, following GRADE guidance for evidence without a
single pooled estimate (Murad et al. 2017). Bodies of observational evidence about prognostic or group factors start at
**High** (GRADE guideline 28, Foroutan et al. 2020) and are rated down one level per serious concern (two for very
serious):

| domain | rated down one level when | two levels when |
|---|---|---|
| Risk of bias | more than half of the weight (Σ√n) comes from design level ≤ 2 (single case-control or cross-sectional comparisons) | more than half of the weight comes from design level 1 (uncontrolled or pilot) |
| Inconsistency | majority-direction share p̂ < 0.75, or unclear votes u ≥ k/3, or a meta-analysis on the same pattern points the other way | p̂ < 0.6 |
| Imprecision | total participants < 400 (rule-of-thumb optimal information size for continuous outcomes) or fewer than 6 clear-direction studies | both |
| Indirectness | a symptom link is inferred through a diagnosis rather than measured, or more than half of the votes come from whole-head results mapped to the region | — |
| Publication bias | suspected when all studies are small (n < 50 each) and all point one way, or when the share of unclear votes in abstracts is far lower than in full texts | — |

A pattern can be rated up one level when q_BY < 0.001 with p̂ ≥ 0.9 and at least 10 studies (consistent, large body).
The rating rules are applied by `tools/synthesize.js` so that every rating can be reproduced; any manual override is
recorded with its reason in `data/synthesis-overrides.json`.

## 6. Connectivity specifics

- Direction: *higher* = more connectivity (hyper-connectivity) in the patient group; *lower* = less.
- Measure families are synthesised separately because coherence is inflated by volume conduction while phase-lag
  measures are not; a pooled "any undirected measure" analysis is sensitivity analysis S5.
- Site pairs map to region pairs with the table in §1. Within-region pairs (e.g. frontal–frontal) are their own
  patterns.

## 7. Sensitivity analyses (reported for every pattern)

- **S1** add abstract-only entries.
- **S2** remove design level 1.
- **S3** leave-one-out: does any single study change the conclusion (q_BY crossing 0.05)?
- **S4** remove whole-head results.
- **S5** connectivity: pool all undirected measure families.
- **S6** Benjamini–Hochberg instead of Benjamini–Yekutieli.
- **S7** one vote per first author per condition (conservative handling of undeclared sample overlap).

A conclusion is labelled **robust** when it holds in S2, S3, S4 and S7.

## 8. Planned second tier (effect sizes)

When at least 5 independent full-text studies in a pattern report group means and SDs (or convertible statistics),
standardised mean differences (Hedges' g) will be pooled with a random-effects model (REML, Hartung–Knapp adjustment),
with heterogeneity (τ², I², prediction interval) reported. Until then the direction-based synthesis is the primary
result.

## 9. Presentation

Each pattern shows: k (independent studies), h / l / u, p̂ with 95% CI, weighted share, q_BY, certainty rating, and the
list of studies (an effect direction plot, Boon & Thomson 2021). Group-level differences are not diagnostic tests for
individuals; the atlas says so beside every result.

## 10. Reproducibility

- Data: `data/research.js` (findings), `data/research-log.csv` (every decision).
- Code: `tools/synthesize.js` (all statistics, deterministic with a fixed random seed for Monte Carlo), tests in
  `tools/test-synthesize.js` (checked against known binomial and Wilson values).
- Output: `data/synthesis.js` and `methods/synthesis-results.md`, regenerated on every data change.
- Screening and extraction were done by AI reviewers with automated validation; a human check of a random sample is
  planned before publication and its agreement rate will be reported.

## References

- McKenzie JE, Brennan SE. Chapter 12: Synthesizing and presenting findings using other methods. Cochrane Handbook for
  Systematic Reviews of Interventions, version 6.5. Cochrane, 2024.
- Campbell M, McKenzie JE, Sowden A, et al. Synthesis without meta-analysis (SWiM) in systematic reviews: reporting
  guideline. BMJ 2020;368:l6890.
- Boon MH, Thomson H. The effect direction plot revisited: application of the 2019 Cochrane Handbook guidance on
  alternative synthesis methods. Res Synth Methods 2021;12(1):29–33.
- Nikolakopoulos S. Misuse of the sign test in narrative synthesis of evidence. arXiv:2105.00672.
- Murad MH, Mustafa RA, Schünemann HJ, Sultan S, Santesso N. Rating the certainty in evidence in the absence of a single
  estimate of effect. Evid Based Med 2017;22(3):85–87.
- Foroutan F, Guyatt G, Zuk V, et al. GRADE Guidelines 28: Use of GRADE for the assessment of evidence about prognostic
  factors. J Clin Epidemiol 2020;121:62–70.
- Benjamini Y, Hochberg Y. Controlling the false discovery rate: a practical and powerful approach to multiple testing.
  J R Stat Soc B 1995;57(1):289–300.
- Benjamini Y, Yekutieli D. The control of the false discovery rate in multiple testing under dependency. Ann Stat
  2001;29(4):1165–1188.

## Amendments

- (none yet)
